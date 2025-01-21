"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { colors } from "@/lib/colors"
import { Header } from "@/components/header"
import { MoonSelector } from "@/components/moon-selector"
import { LocationTile } from "@/components/location-tile"
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
      const downloadUrl = process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || "#"
      window.location.href = downloadUrl
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
      glow: "shadow-[0_0_40px_-5px] shadow-blue-400/20",
      hover: "hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_50px_-5px] hover:shadow-blue-400/30"
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col overflow-hidden bg-zinc-950">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom right, rgba(245, 158, 11, 0.3), rgba(249, 115, 22, 0.2), rgba(244, 63, 94, 0.3))'
          }}
        />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      {/* Header Banner */}
      <div className="relative z-10 w-full pt-12 pb-8">
        <Header />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">
                  Your shortcut to daylight
                </h1>
                <p className="text-2xl text-white/80">
                  Track the sun's journey through your day with Helios.
                  Beautiful, minimal, and always at your fingertips.
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  disabled={loading}
                  className={cn(
                    "px-8 py-4 rounded-full text-lg font-medium",
                    "transition-all duration-200",
                    "border",
                    buttonColors[mode].bg,
                    buttonColors[mode].border,
                    buttonColors[mode].text,
                    buttonColors[mode].glow,
                    buttonColors[mode].hover,
                    "disabled:opacity-50"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {loading ? (
                      <>
                        <motion.div 
                          style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            borderTopColor: 'white',
                            borderRadius: '9999px'
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download for macOS
                      </>
                    )}
                  </span>
                </button>
                <div className="text-sm text-white/60 flex items-center">
                  v1.0.0 • macOS 12+
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <MoonSelector mode={mode} onChange={setMode} />
              <LocationTile />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}