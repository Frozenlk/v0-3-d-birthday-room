"use client"
import { Cake } from "./objects/cake"
import { Balloons } from "./objects/balloons"
import { GiftBox } from "./objects/gift-box"
import type { InteractionType } from "./birthday-scene"

interface RoomProps {
  onInteraction: (type: InteractionType) => void
}

export function Room({ onInteraction }: RoomProps) {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f5e6d3" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 5, -5]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#ffeef8" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-10, 5, 5]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fff5f0" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[10, 5, 5]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#f0f8ff" />
      </mesh>

      {/* Table */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.1, 2]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      <mesh position={[-1.2, 0.35, -0.8]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
      <mesh position={[1.2, 0.35, -0.8]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
      <mesh position={[-1.2, 0.35, 0.8]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
      <mesh position={[1.2, 0.35, 0.8]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.7]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>

      {/* Interactive Objects */}
      <Cake position={[0, 1, 0]} onClick={() => onInteraction("cake")} />
      <Balloons position={[-1, 0, -3]} onClick={() => onInteraction("balloon")} />
      <GiftBox position={[1, 0.4, 3]} onClick={() => onInteraction("gift")} />
    </group>
  )
}
