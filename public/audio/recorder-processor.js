// Captures microphone audio at the AudioContext's native sample rate, downsamples
// to 16 kHz mono Int16 PCM, and posts chunks to the main thread for streaming
// to the Gemini Live API.
class RecorderProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const params = (options && options.processorOptions) || {};
    this.targetSampleRate = params.targetSampleRate || 16000;
    this.inputSampleRate = sampleRate; // global in worklet scope
    this.ratio = this.inputSampleRate / this.targetSampleRate;
    this.buffer = [];
    this.bufferLength = 0;
    // Send roughly 100 ms chunks (1600 samples at 16 kHz)
    this.chunkSamples = Math.floor(this.targetSampleRate / 10);
  }

  // Linear-interpolation downsample to target sample rate
  downsample(input) {
    if (this.ratio === 1) return input.slice();
    const outLen = Math.floor(input.length / this.ratio);
    const out = new Float32Array(outLen);
    let pos = 0;
    for (let i = 0; i < outLen; i++) {
      const idx = pos | 0;
      const frac = pos - idx;
      const a = input[idx] || 0;
      const b = input[idx + 1] !== undefined ? input[idx + 1] : a;
      out[i] = a + (b - a) * frac;
      pos += this.ratio;
    }
    return out;
  }

  toInt16(float32) {
    const out = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
      let s = Math.max(-1, Math.min(1, float32[i]));
      out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return out;
  }

  process(inputs) {
    const input = inputs[0];
    if (!input || !input[0]) return true;
    const channel = input[0];
    const down = this.downsample(channel);
    this.buffer.push(down);
    this.bufferLength += down.length;

    while (this.bufferLength >= this.chunkSamples) {
      const merged = new Float32Array(this.chunkSamples);
      let written = 0;
      while (written < this.chunkSamples && this.buffer.length) {
        const next = this.buffer[0];
        const take = Math.min(next.length, this.chunkSamples - written);
        merged.set(next.subarray(0, take), written);
        written += take;
        if (take === next.length) this.buffer.shift();
        else this.buffer[0] = next.subarray(take);
      }
      this.bufferLength -= this.chunkSamples;
      const pcm16 = this.toInt16(merged);
      // Transfer the underlying buffer for zero-copy
      this.port.postMessage({ pcm: pcm16.buffer }, [pcm16.buffer]);
    }
    return true;
  }
}

registerProcessor("recorder-processor", RecorderProcessor);
