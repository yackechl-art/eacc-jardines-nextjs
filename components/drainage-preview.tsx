"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
function Water({ drop, playing }: { drop: number; playing: boolean }) {
  const group = useRef<Group>(null);
  const progress = useRef(0);
  useFrame((_, delta) => {
    if (!playing || drop === 0 || !group.current) return;
    progress.current = (progress.current + Math.min(delta, 0.1) * 0.16) % 1;
    group.current.children.forEach((mesh, i) => {
      const t = ((i / 16 + Math.sign(drop) * progress.current) % 1 + 1) % 1;
      mesh.position.set(-3 + t * 6, drop * (0.5 - t), 0);
    });
  });
  return <group ref={group}>{Array.from({ length: 16 }, (_, i) => {
    const t = i / 16;
    return <mesh key={i} position={[-3 + 6 * t, drop * (0.5 - t), 0]}><sphereGeometry args={[0.065, 10, 8]}/><meshBasicMaterial color="#149fda"/></mesh>;
  })}</group>;
}
function Scene({ slope, yaw, tilt, playing }: { slope: number; yaw: number; tilt: number; playing: boolean }) {
  // Both axes share a scale: a six-unit horizontal run represents the entered length.
  const drop = 6 * slope / 100;
  return <group rotation={[tilt, yaw, 0]} scale={0.85}>
    <mesh rotation={[0, 0, Math.PI / 2 + Math.atan2(drop, 6)]}>
      <cylinderGeometry args={[0.23, 0.23, Math.hypot(6, drop), 32, 1, true]}/>
      <meshStandardMaterial color="#456b58" transparent opacity={0.28} depthWrite={false} side={2}/>
    </mesh>
    {[-1, 1].map(side => <group key={side} position={[side * 3, -side * drop / 2, 0]}>
      <mesh position={[0, -0.28, 0]}><boxGeometry args={[0.85, 0.15, 0.85]}/><meshStandardMaterial color="#8b897e"/></mesh>
      {[-1, 1].map(wall => <mesh key={wall} position={[0, 0.22, wall * 0.39]}><boxGeometry args={[0.85, 1, 0.08]}/><meshStandardMaterial color="#b6b2a3" transparent opacity={0.65}/></mesh>)}
      <mesh position={[0, 0.73, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.4, 0.055, 8, 24]}/><meshStandardMaterial color="#4c554e"/></mesh>
    </group>)}
    <Water drop={drop} playing={playing}/>
  </group>;
}
export default function DrainagePreview(props: { slope: number; yaw: number; tilt: number; playing: boolean; fallback: string; label: string }) {
  return <div className="drainage-preview" role="img" aria-label={props.label}>
    <Canvas camera={{ position: [0, 0, 12], fov: 48 }} dpr={[1, 1.5]} fallback={<p>{props.fallback}</p>} frameloop={props.playing && props.slope !== 0 ? "always" : "demand"}>
      <color attach="background" args={["#f0f2e9"]}/><ambientLight intensity={1.5}/><directionalLight position={[3, 6, 5]} intensity={2}/>
      <Scene {...props}/>
    </Canvas>
  </div>;
}
