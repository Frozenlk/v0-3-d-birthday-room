"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"

const images = [
  "/images/birthday-1.png",
  "/images/birthday-2.png",
  "/images/birthday-3.png",
  "/images/birthday-4.png",
  "/images/birthday-5.png",
  "/images/birthday-6.png",
  "/images/birthday-7.png",
]

export function FilmReelSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("[v0] Audio autoplay prevented:", error)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
        setIsTransitioning(false)
      }, 1200)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      <audio ref={audioRef} src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kanchana-anuradhi-amma-wage_NUOJrlLw-pwMVrkFIzqxSpttH8ArnJezPfHBXPN.mp3" loop />

      {/* Film reel sprocket holes - left side */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-black flex flex-col justify-around py-4 z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`left-${i}`} className="w-6 h-4 bg-gray-900 mx-auto rounded-sm border border-gray-700" />
        ))}
      </div>

      {/* Film reel sprocket holes - right side */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-black flex flex-col justify-around py-4 z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`right-${i}`} className="w-6 h-4 bg-gray-900 mx-auto rounded-sm border border-gray-700" />
        ))}
      </div>

      {/* Film frame border */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-12 right-12 h-8 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-12 right-12 h-8 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative w-full h-full px-12 flex items-center justify-center overflow-hidden">
        <div
          className={`w-full max-w-2xl h-full flex items-center justify-center transition-all duration-[1200ms] ease-in-out ${
            isTransitioning ? "opacity-0 -translate-y-12" : "opacity-100 translate-y-0"
          }`}
        >
          <div className="relative w-full h-[85vh] bg-gray-900 border-4 border-gray-800 shadow-2xl">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Birthday memory ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay z-20">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white w-8" : "bg-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Frame counter (like old film) */}
      <div className="absolute top-4 right-16 text-amber-500 font-mono text-sm z-30">
        {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  )
}
