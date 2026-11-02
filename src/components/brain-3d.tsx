import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { RegionId } from "@/lib/intention-map";

// Palette values (three.js needs literal colors, not CSS variables).
const C = { plum: "#4A3F4B", mauve: "#806C79", rose: "#C1A0AC", blush: "#F0D9E4" };

const pos: Record<RegionId, [number, number, number]> = {
  prefrontal: [1.35, 0.45, 0.45],
  hipotalamo: [0.25, -0.35, 0],
  amigdala: [0.45, -0.55, 0.6],
  hipocampo: [-0.25, -0.45, 0.65],
  sara: [-0.35, -1.15, 0],
};

export default function Brain3D({ active, highlighted, names, onSelect }: { active: RegionId; highlighted: RegionId[]; names: Record<RegionId, string>; onSelect: (id: RegionId) => void }) {
  return (
    <Canvas camera={{ position: [0.6, 0.6, 4.6], fov: 40 }} data-scene-ready>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-3, -2, -3]} intensity={0.8} color={C.rose} />
      <group rotation={[0, -0.5, 0]}>
        {[-1, 1].map((s) => (
          <group key={s} position={[0, 0.2, s * 0.62]}>
            <mesh scale={[1.75, 1.15, 0.62]}><sphereGeometry args={[1, 48, 32]} /><meshStandardMaterial color={C.mauve} transparent opacity={0.28} roughness={0.6} depthWrite={false} /></mesh>
            <mesh scale={[1.76, 1.16, 0.63]}><sphereGeometry args={[1, 22, 14]} /><meshBasicMaterial color={C.rose} wireframe transparent opacity={0.18} /></mesh>
          </group>
        ))}
        <mesh position={[-1.25, -0.75, 0]} scale={[0.6, 0.38, 0.9]}><sphereGeometry args={[1, 32, 20]} /><meshStandardMaterial color={C.plum} transparent opacity={0.55} /></mesh>
        <mesh position={[-0.35, -1.3, 0]} rotation={[0, 0, -0.25]}><cylinderGeometry args={[0.2, 0.15, 1.1, 20]} /><meshStandardMaterial color={C.plum} transparent opacity={0.65} /></mesh>
        {(Object.keys(pos) as RegionId[]).map((id) => {
          const on = id === active, lit = highlighted.includes(id);
          return (
            <group key={id} position={pos[id]}>
              <mesh onClick={(e) => { e.stopPropagation(); onSelect(id); }} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "")} scale={on ? 1.6 : 1}>
                <sphereGeometry args={[0.14, 24, 16]} />
                <meshStandardMaterial color={on ? C.blush : C.rose} emissive={on || lit ? C.rose : C.plum} emissiveIntensity={on ? 1.4 : lit ? 0.9 : 0.3} />
              </mesh>
              <Label text={names[id] ?? id} on={on} />
            </group>
          );
        })}
      </group>
      <OrbitControls enablePan={false} minDistance={3} maxDistance={7} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}

// Canvas-texture sprite labels: no extra React roots (drei <Html> caused unmount races).
function Label({ text, on }: { text: string; on: boolean }) {
  const tex = useMemo(() => {
    const c = document.createElement("canvas"); c.width = 512; c.height = 96;
    const g = c.getContext("2d");
    if (g) {
      g.font = "500 44px Georgia, serif"; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillStyle = on ? "rgba(240,217,228,0.92)" : "rgba(22,19,31,0.75)";
      const w = Math.min(500, g.measureText(text).width + 48);
      g.beginPath(); g.roundRect((512 - w) / 2, 8, w, 80, 40); g.fill();
      g.fillStyle = on ? C.plum : C.blush; g.fillText(text, 256, 50);
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }, [text, on]);
  useEffect(() => () => tex.dispose(), [tex]);
  return <sprite position={[0, 0.34, 0]} scale={[1.1, 0.21, 1]} raycast={() => null}><spriteMaterial map={tex} transparent depthTest={false} /></sprite>;
}
