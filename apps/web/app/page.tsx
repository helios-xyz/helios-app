"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { colors } from "@/lib/colors"
import { Header } from "@/components/header"
import { MoonSelector } from "@/components/moon-selector"
import type { ColorMode } from "@/components/moon-selector"

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
          <MoonSelector mode={mode} setMode={setMode} />

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