"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import { Suspense, useState, useRef, useEffect } from "react"
import { Room } from "./room"
import { InteractionDialog } from "./interaction-dialog"
import { LoadingScreen } from "./loading-screen"

export type InteractionType = "cake" | "balloon" | "gift" | null

export function BirthdayScene() {
  const [interaction, setInteraction] = useState<InteractionType>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.play().catch((error) => {
        console.log("[v0] Background music autoplay prevented:", error)
      })
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (interaction) {
      audio.pause()
    } else {
      audio.play().catch((error) => {
        console.log("[v0] Background music resume prevented:", error)
      })
    }
  }, [interaction])

  return (
    <>
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HAPPY%20BIRTHDAY%20INSTRUMENTAL-ZEV8l50OLZiyVI6KDWFmIgQC1WZQxo.mp3" loop />

      <Canvas shadows className="touch-none">
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2}
          touches={{
            ONE: 2, // TOUCH.ROTATE
            TWO: 1, // TOUCH.DOLLY_PAN
          }}
        />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#ffd700" />

        <Environment preset="apartment" />

        <Suspense fallback={<LoadingScreen />}>
          <Room onInteraction={setInteraction} />
        </Suspense>
      </Canvas>

      <InteractionDialog type={interaction} onClose={() => setInteraction(null)} />
    </>
  )
}
