// Receives Int16 PCM chunks (24 kHz mono from Gemini Live), queues them, and
// plays them back continuously at the AudioContext's sample rate.
class PlayerProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const params = (options && options.processorOptions) || {};
    this.inputSampleRate = params.sourceSampleRate || 24000;
    this.outputSampleRate = sampleRate; // global
    this.ratio = this.inputSampleRate / this.outputSampleRate;
    this.queue = [];
    this.queueLength = 0;
    this.readPos = 0;
    this.flushed = false;

    this.port.onmessage = (e) => {
      const data = e.data;
      if (data === "flush") {
        // Drop everything queued
        this.queue = [];
        this.queueLength = 0;
        this.readPos = 0;
        return;
      }
      if (data && data.pcm) {
        const int16 = new Int16Array(data.pcm);
        const f32 = new Float32Array(int16.length);
        for (let i = 0; i < int16.length; i++) f32[i] = int16[i] / 0x8000;
        this.queue.push(f32);
        this.queueLength += f32.length;
      }
    };
  }

  // Linear-interpolation resample on the fly (input rate -> output rate)
  pullSample(virtualIdx) {
    let remaining = virtualIdx;
    let chunkIdx = 0;
    while (chunkIdx < this.queue.length) {
      const chunk = this.queue[chunkIdx];
      if (remaining < chunk.length - 1) {
        const lo = remaining | 0;
        const frac = remaining - lo;
        return chunk[lo] + (chunk[lo + 1] - chunk[lo]) * frac;
      }
      remaining -= chunk.length;
      chunkIdx++;
    }
    return null;
  }

  process(inputs, outputs) {
    const out = outputs[0];
    if (!out || !out[0]) return true;
    const channel0 = out[0];
    const channel1 = out.length > 1 ? out[1] : null;

    const want = channel0.length;
    let produced = 0;

    if (this.queueLength === 0) {
      channel0.fill(0);
      if (channel1) channel1.fill(0);
      // notify main thread that we're idle so UI can stop "speaking"
      this.port.postMessage({ idle: true });
      return true;
    }

    while (produced < want) {
      const virtualIdx = this.readPos;
      const sample = this.pullSample(virtualIdx);
      if (sample === null) {
        // Out of data — fill remaining with silence
        for (let i = produced; i < want; i++) {
          channel0[i] = 0;
          if (channel1) channel1[i] = 0;
        }
        // Drain everything
        this.queue = [];
        this.queueLength = 0;
        this.readPos = 0;
        this.port.postMessage({ idle: true });
        return true;
      }
      channel0[produced] = sample;
      if (channel1) channel1[produced] = sample;
      produced++;
      this.readPos += this.ratio;
    }

    // After producing, advance queue: drop chunks fully consumed
    while (this.queue.length && this.readPos >= this.queue[0].length) {
      this.readPos -= this.queue[0].length;
      this.queueLength -= this.queue[0].length;
      this.queue.shift();
    }

    return true;
  }
}

registerProcessor("player-processor", PlayerProcessor);
