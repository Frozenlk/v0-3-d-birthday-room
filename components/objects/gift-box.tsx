"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"
import { Text } from "@react-three/drei"

interface GiftBoxProps {
  position: [number, number, number]
  onClick: () => void
}

export function GiftBox({ position, onClick }: GiftBoxProps) {
  const boxRef = useRef<Mesh>(null)
  const lidRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (boxRef.current && hovered) {
      boxRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
    if (lidRef.current && hovered) {
      lidRef.current.position.y = 0.45 + Math.sin(state.clock.elapsedTime * 3) * 0.05
    }
  })

  return (
    <group position={position}>
      {/* Gift Box Base */}
      <mesh
        ref={boxRef}
        castShadow
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        style={{ cursor: hovered ? "pointer" : "auto" }}
      >
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#ff6b9d" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Gift Box Lid */}
      <mesh ref={lidRef} position={[0, 0.45, 0]} castShadow>
        <boxGeometry args={[0.85, 0.1, 0.85]} />
        <meshStandardMaterial color="#c41e3a" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Ribbon Vertical */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.9, 0.85]} />
        <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Ribbon Horizontal */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.85, 0.9, 0.15]} />
        <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Bow */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffd700" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Hover Text */}
      {hovered && (
        <Text position={[0, 1.2, 0]} fontSize={0.15} color="#ff6b9d" anchorX="center" anchorY="middle">
          Open the gift!
        </Text>
      )}
    </group>
  )
}
