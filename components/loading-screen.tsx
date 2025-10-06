"use client"

import { Html } from "@react-three/drei"

export function LoadingScreen() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-foreground font-sans text-lg">Loading your party...</p>
      </div>
    </Html>
  )
}
