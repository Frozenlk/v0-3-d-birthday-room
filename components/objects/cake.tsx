"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import { Text } from "@react-three/drei"

interface CakeProps {
  position: [number, number, number]
  onClick: () => void
}

export function Cake({ position, onClick }: CakeProps) {
  const cakeRef = useRef<Mesh>(null)
  const flameRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (flameRef.current) {
      flameRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.1
    }
    if (cakeRef.current && hovered) {
      cakeRef.current.rotation.y += 0.02
    }
  })

  return (
    <group position={position}>
      {/* Cake Base */}
      <mesh
        ref={cakeRef}
        castShadow
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        style={{ cursor: hovered ? "pointer" : "auto" }}
      >
        <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
        <meshStandardMaterial color="#ff69b4" />
      </mesh>

      {/* Frosting */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.62, 0.62, 0.05, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Candle */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>

      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ff6b00" emissive="#ff6b00" emissiveIntensity={2} />
      </mesh>

      {/* Glow */}
      <pointLight position={[0, 0.7, 0]} intensity={1} color="#ff6b00" distance={2} />

      {/* Hover Text */}
      {hovered && (
        <Text position={[0, 1.2, 0]} fontSize={0.15} color="#ff69b4" anchorX="center" anchorY="middle">
          Click for a wish!
        </Text>
      )}
    </group>
  )
}
