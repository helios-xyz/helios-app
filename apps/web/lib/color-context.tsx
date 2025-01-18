"use client"

import { createContext, useContext, useState } from "react"

type ColorPhase = "sun" | "moon" | "new-moon"

interface ColorContextType {
  phase: ColorPhase
  setPhase: (phase: ColorPhase) => void
  gradientColors: {
    from: string
    via: string
    to: string
  }
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<ColorPhase>("sun")

  const gradientColors = {
    sun: {
      from: "from-amber-500/20",
      via: "via-orange-500/10",
      to: "to-rose-500/20",
    },
    moon: {
      from: "from-yellow-500/20",
      via: "via-amber-500/10",
      to: "to-orange-500/20",
    },
    "new-moon": {
      from: "from-blue-500/20",
      via: "via-indigo-500/10",
      to: "to-purple-500/20",
    },
  }

  return (
    <ColorContext.Provider 
      value={{ 
        phase, 
        setPhase,
        gradientColors: gradientColors[phase],
      }}
    >
      {children}
    </ColorContext.Provider>
  )
}

export function useColor() {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error("useColor must be used within a ColorProvider")
  }
  return context
} 