/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const AntigravityInner = ({
  count = 300, magnetRadius = 10, ringRadius = 10, waveSpeed = 0.4,
  waveAmplitude = 1, particleSize = 2, lerpSpeed = 0.1, color = "#FF9FFC",
  autoAnimate = false, particleVariance = 1, rotationSpeed = 0,
  depthFactor = 1, pulseSpeed = 3, particleShape = "capsule", fieldStrength = 10,
}: any) => {
  const meshRef = useRef<any>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const temp: any[] = [];
    const w = viewport.width || 100;
    const h = viewport.height || 100;
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100, factor: 20 + Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        xFactor: -50 + Math.random() * 100, yFactor: -50 + Math.random() * 100,
        zFactor: -50 + Math.random() * 100,
        mx: (Math.random() - 0.5) * w, my: (Math.random() - 0.5) * h,
        mz: (Math.random() - 0.5) * 20,
        cx: (Math.random() - 0.5) * w, cy: (Math.random() - 0.5) * h,
        cz: (Math.random() - 0.5) * 20,
        vx: 0, vy: 0, vz: 0, randomRadiusOffset: (Math.random() - 0.5) * 2,
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const { viewport: v, pointer: m } = state;
    const mouseDist = Math.sqrt((m.x - lastMousePos.current.x) ** 2 + (m.y - lastMousePos.current.y) ** 2);
    if (mouseDist > 0.001) { lastMouseMoveTime.current = Date.now(); lastMousePos.current = { x: m.x, y: m.y }; }
    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;
    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.5) * (v.width / 4);
      destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
    }
    virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.05;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.05;
    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;
    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    particles.forEach((p: any, i: number) => {
      p.t += p.speed / 2;
      const projFactor = 1 - p.cz / 50;
      const px = targetX * projFactor;
      const py = targetY * projFactor;
      const dx = p.mx - px, dy = p.my - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let tgt = { x: p.mx, y: p.my, z: p.mz * depthFactor };
      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(p.t * waveSpeed + angle) * 0.5 * waveAmplitude;
        const dev = p.randomRadiusOffset * (5 / (fieldStrength + 0.1));
        const r = ringRadius + wave + dev;
        tgt.x = px + r * Math.cos(angle);
        tgt.y = py + r * Math.sin(angle);
        tgt.z = p.mz * depthFactor + Math.sin(p.t) * waveAmplitude * depthFactor;
      }
      p.cx += (tgt.x - p.cx) * lerpSpeed;
      p.cy += (tgt.y - p.cy) * lerpSpeed;
      p.cz += (tgt.z - p.cz) * lerpSpeed;
      dummy.position.set(p.cx, p.cy, p.cz);
      dummy.lookAt(px, py, p.cz);
      dummy.rotateX(Math.PI / 2);
      const dFromRing = Math.abs(Math.sqrt((p.cx - px) ** 2 + (p.cy - py) ** 2) - ringRadius);
      let sf = Math.max(0, Math.min(1, 1 - dFromRing / 10));
      sf *= (0.8 + Math.sin(p.t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
      dummy.scale.set(sf, sf, sf);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {particleShape === "capsule" && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
      {particleShape === "sphere" && <sphereGeometry args={[0.2, 16, 16]} />}
      {particleShape === "box" && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === "tetrahedron" && <tetrahedronGeometry args={[0.3]} />}
      <meshBasicMaterial color={color} />
    </instancedMesh>
  );
};

export default function Antigravity(props: any) {
  return (
    <Canvas camera={{ position: [0, 0, 50], fov: 35 }} style={{ position: "absolute", inset: 0 }}>
      <AntigravityInner {...props} />
    </Canvas>
  );
}
