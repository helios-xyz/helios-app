"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ColorMode = "light" | "dim" | "dark"

type MoonConfig = {
  [K in ColorMode]: {
    emoji: string
    label: string
    gradient: string
    baseRotate: number
  }
}

const moonConfig: MoonConfig = {
  light: {
    emoji: "🌕",
    label: "Set light mode",
    gradient: "from-amber-500/30 to-orange-500/30",
    baseRotate: 0
  },
  dim: {
    emoji: "🌓",
    label: "Set dim mode",
    gradient: "from-orange-500/30 to-yellow-500/30",
    baseRotate: 180
  },
  dark: {
    emoji: "🌑",
    label: "Set dark mode",
    gradient: "from-blue-500/30 to-indigo-500/30",
    baseRotate: 0
  }
}

const Moon = ({ mode, currentMode, onSelect, index }: {
  mode: ColorMode
  currentMode: ColorMode
  onSelect: (mode: ColorMode) => void
  index: number
}) => {
  const config = moonConfig[mode]
  const isSelected = mode === currentMode

  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        y: isSelected ? -4 : 0, 
        scale: 1
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.2 + (index * 0.1),
        duration: 0.5
      }}
    >
      {/* Background glow */}
      <div 
        className={cn(
          "absolute inset-[-50%] rounded-full blur-3xl transition-all duration-700",
          `bg-gradient-to-br ${config.gradient}`,
          "opacity-0 scale-95 group-hover:opacity-40 group-hover:scale-100",
          isSelected && "!opacity-100 !scale-100"
        )} 
      />
      
      {/* Moon emoji */}
      <motion.button
        initial={false}
        animate={{ 
          scale: 1,
          y: isSelected ? -4 : 0,
          rotate: config.baseRotate,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 25
          }
        }}
        whileHover={{ 
          scale: 1.05,
          rotate: config.baseRotate + 1,
          y: -2,
          transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 1
          }
        }}
        onClick={() => onSelect(mode)}
        className={cn(
          "relative text-9xl cursor-pointer select-none",
          "outline-none focus-visible:ring-2 focus-visible:ring-white/20 rounded-full",
          "transition-opacity duration-200",
          !isSelected && "opacity-60 hover:opacity-100"
        )}
        aria-label={config.label}
      >
        {config.emoji}
      </motion.button>
    </motion.div>
  )
}

export const MoonSelector = ({ mode, setMode }: { 
  mode: ColorMode
  setMode: (mode: ColorMode) => void 
}) => {
  return (
    <div className="flex items-center justify-center gap-12">
      <Moon mode="light" currentMode={mode} onSelect={setMode} index={0} />
      <Moon mode="dim" currentMode={mode} onSelect={setMode} index={1} />
      <Moon mode="dark" currentMode={mode} onSelect={setMode} index={2} />
    </div>
  )
}

export type { ColorMode } 