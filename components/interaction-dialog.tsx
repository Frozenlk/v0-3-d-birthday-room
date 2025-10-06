"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { InteractionType } from "./birthday-scene"
import { Sparkles, Gift, PartyPopper } from "lucide-react"
import { FilmReelSlideshow } from "./film-reel-slideshow"

interface InteractionDialogProps {
  type: InteractionType
  onClose: () => void
}

export function InteractionDialog({ type, onClose }: InteractionDialogProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(type !== null)
  }, [type])

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      onClose()
    }
    setOpen(newOpen)
  }

  const getContent = () => {
    switch (type) {
      case "cake":
        return {
          icon: <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />,
          title: "Happy Birthday ❤️",
          description:
            "✨ “Having you as my sister is one of the best gifts life gave me. Wishing you all the love and happiness you bring into my life. Happy Birthday ❤️",
        }
      case "balloon":
        return {
          icon: <PartyPopper className="w-12 h-12 text-secondary mx-auto mb-4" />,
          title: "🎈 Pop! Surprise!",
          description:
            "You're amazing! Here's to another year of adventures, growth, and happiness. Keep shining bright! ✨",
        }
      case "gift":
        return {
          icon: <Gift className="w-12 h-12 text-accent mx-auto mb-4" />,
          title: "🎁 Special Gift Inside!",
          description:
            "Your gift is all the wonderful memories we share! Thank you for being such an incredible person. Cheers to many more celebrations together! 🥳",
          media: true,
          fullscreen: true,
        }
      default:
        return null
    }
  }

  const content = getContent()

  if (!content) return null

  if (type === "gift" && open) {
    return (
      <div className="relative">
        <FilmReelSlideshow />
        <button
          onClick={() => handleOpenChange(false)}
          className="fixed top-4 left-4 z-[60] bg-black/50 hover:bg-black/70 text-white rounded-full p-3 backdrop-blur-sm transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-2">
        <DialogHeader>
          {content.icon}
          <DialogTitle className="text-2xl text-center text-balance">{content.title}</DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed pt-4">
            {content.description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
