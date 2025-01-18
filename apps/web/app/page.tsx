"use client"

import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { Download } from "lucide-react"
import { useState, useEffect } from "react"
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

const Header = () => (
  <div className="flex items-center justify-center relative w-full">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "relative px-6 py-3 rounded-2xl cursor-pointer",
        "border border-white/10 bg-white/5",
        "backdrop-blur-xl",
        "flex items-center gap-4 group",
        "hover:bg-white/[0.07] transition-all duration-300"
      )}
    >
      {/* Logo */}
      <motion.div 
        className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/25"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />

      {/* Text */}
      <span className="relative text-lg font-mono tracking-tight text-white/90">
        helios
      </span>
    </motion.div>

    {/* Keyboard Shortcut */}
    <motion.div
      initial={{ opacity: 0, y: -20, rotateX: 15, rotateZ: 2 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX: 15,
        rotateZ: 2
      }}
      whileHover={{ 
        scale: 1.02,
        rotateX: 20,
        rotateZ: 3,
        y: -1,
        transition: { 
          duration: 0.2,
          ease: [0.23, 1, 0.32, 1]
        }
      }}
      className={cn(
        "absolute left-[calc(50%+80px)]",
        "flex items-center gap-1 px-3 py-1.5 rounded-xl",
        "bg-white/5 border border-white/10",
        "text-[13px] font-medium tracking-wide text-white/40",
        "shadow-[0_0_15px_-3px] shadow-white/10",
        "backdrop-blur-xl hover:bg-white/[0.07] hover:border-white/20",
        "transition-colors duration-300"
      )}
    >
      <span className="flex items-center">⌘</span>
      <span className="flex items-center translate-y-[-1.5px]">⇧</span>
      <span className="flex items-center">H</span>
    </motion.div>
  </div>
)

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<ColorMode>("light")
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const handleDownload = async () => {
    setLoading(true)
    try {
      window.location.href = "/download?demo=true"
    } catch (error) {
      console.error('Failed to start download:', error)
    } finally {
      setLoading(false)
    }
  }

  const colors = {
    light: {
      from: "rgb(239 68 68)",    // red-500
      via: "rgb(249 115 22)",    // orange-500
      to: "rgb(59 130 246)"      // blue-500
    },
    dim: {
      from: "rgb(248 113 113)",  // red-400
      via: "rgb(251 146 60)",    // orange-400
      to: "rgb(96 165 250)"      // blue-400
    },
    dark: {
      from: "rgb(252 165 165)",  // red-300
      via: "rgb(253 186 116)",   // orange-300
      to: "rgb(147 197 253)"     // blue-300
    }
  }

  const buttonColors = {
    light: {
      bg: "bg-white/5",
      border: "border-white/10",
      text: "text-white",
      glow: "shadow-[0_0_40px_-5px] shadow-red-500/20",
      hover: "hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_50px_-5px] hover:shadow-red-500/30"
    },
    dim: {
      bg: "bg-white/5",
      border: "border-white/10",
      text: "text-white",
      glow: "shadow-[0_0_40px_-5px] shadow-orange-400/20",
      hover: "hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_50px_-5px] hover:shadow-orange-400/30"
    },
    dark: {
      bg: "bg-white/5",
      border: "border-white/10",
      text: "text-white",
      glow: "shadow-[0_0_40px_-5px] shadow-blue-500/20",
      hover: "hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_50px_-5px] hover:shadow-blue-500/30"
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-zinc-950">
      {/* Background */}
      <motion.div 
        initial={false}
        animate={{ 
          background: `linear-gradient(to bottom right, ${colors[mode].from}, ${colors[mode].via}, ${colors[mode].to})`,
          opacity: 0.1
        }}
        transition={{ 
          duration: isFirstRender ? 0 : 1.2,
          ease: [0.32, 0.72, 0, 1]
        }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 backdrop-blur-3xl" />
      
      {/* Header Banner */}
      <div className="relative z-10 w-full pt-12 pb-8">
        <Header />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-3xl w-full space-y-16 text-center">
          {/* Moon Controls */}
          <div className="flex items-center justify-center gap-12">
            <Moon mode="light" currentMode={mode} onSelect={setMode} index={0} />
            <Moon mode="dim" currentMode={mode} onSelect={setMode} index={1} />
            <Moon mode="dark" currentMode={mode} onSelect={setMode} index={2} />
          </div>

          {/* Text */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl font-bold text-white whitespace-nowrap"
            >
              a shortcut to perfect lighting
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg font-mono text-white/60 tracking-tight"
            >
              control your display color temperature with a beautiful,
              <br />
              minimal widget. always at your fingertips.
            </motion.p>
          </div>

          {/* Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6,
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="flex items-center justify-center"
          >
            <motion.button
              onClick={handleDownload}
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "group relative px-8 py-3 rounded-lg",
                "border transition-all duration-500",
                "backdrop-blur-2xl",
                buttonColors[mode].bg,
                buttonColors[mode].border,
                buttonColors[mode].text,
                buttonColors[mode].glow,
                buttonColors[mode].hover,
                "disabled:opacity-50"
              )}
            >
              <span className="flex items-center gap-3 text-base font-medium">
                {loading ? (
                  <>
                    <motion.div
                      className={cn(
                        "w-4 h-4 border-2 rounded-full",
                        "border-white/20 border-t-white"
                      )}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    processing...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    download for macOS
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full pb-8 pt-4">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-mono",
              "border backdrop-blur-2xl",
              buttonColors[mode].bg,
              buttonColors[mode].border,
              "text-white/40 hover:text-white/60 hover:backdrop-blur-3xl",
              "flex items-center gap-4"
            )}
          >
            <span>v1.0.0</span>
            <span className="text-white/20">•</span>
            <span>macOS 12+</span>
          </motion.div>
        </div>
      </div>
    </main>
  )
}