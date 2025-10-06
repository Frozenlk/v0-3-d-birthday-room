"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { Text } from "@react-three/drei"

interface BalloonsProps {
  position: [number, number, number]
  onClick: () => void
}

export function Balloons({ position, onClick }: BalloonsProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  const balloonColors = ["#ff1493", "#9370db", "#00bfff", "#ffd700"]

  return (
    <group ref={groupRef} position={position}>
      {balloonColors.map((color, i) => (
        <group key={i} position={[i * 0.4 - 0.6, 2 + i * 0.3, 0]}>
          {/* Balloon */}
          <mesh
            castShadow
            //onClick={onClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            style={{ cursor: hovered ? "pointer" : "auto" }}
          >
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
          </mesh>

          {/* Balloon Knot */}
          <mesh position={[0, -0.35, 0]} castShadow>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>

          {/* String */}
          <mesh position={[0, -1.2, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 1.7]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* Hover Text */}
      {hovered && (
        <Text position={[0, 4, 0]} fontSize={0.15} color="#9370db" anchorX="center" anchorY="middle">
          Pop a balloon!
        </Text>
      )}
    </group>
  )
}
