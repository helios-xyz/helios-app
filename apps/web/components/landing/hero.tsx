"use client"

import { Glass } from "@/components/ui/glass"
import { motion } from "framer-motion"
import { Download, Sun, Sunrise, Sunset } from "lucide-react"
import { useState } from "react"
import { SunPath } from "./sun-path"

export const Hero = () => {
  const [loading, setLoading] = useState(false)
  const { view: SunPathView, data: sunData } = SunPath()

  const handleDownload = async () => {
    setLoading(true)
    try {
      window.location.href = "/download?demo=true" // For demo purposes
    } catch (error) {
      console.error('Failed to start download:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0] 
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-rose-500/30"
        />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-8">
          {/* Left column - Text and CTA */}
          <Glass className="p-12 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-500">
                Your shortcut to daylight
              </h1>
              <p className="text-2xl text-white/80">
                Track the sun's journey through your day with Helios.
                Beautiful, minimal, and always at your fingertips.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4"
            >
              <motion.button
                onClick={handleDownload}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-lg font-medium bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-orange-500/30 transition-all duration-200 disabled:opacity-50"
              >
                <span className="flex items-center gap-2">
                  {loading ? (
                    <>
                      <motion.div 
                        className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
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
              </motion.button>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-white/60 flex items-center"
              >
                v1.0.0 • macOS 12+
              </motion.div>
            </motion.div>
          </Glass>

          {/* Right column - Live demo */}
          <Glass variant="dark" className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white/80">Live Sun Position</h3>
                {sunData.location.loading ? (
                  <span className="text-sm text-white/40">Locating...</span>
                ) : sunData.location.error ? (
                  <span className="text-sm text-white/40">Using {sunData.location.name}</span>
                ) : (
                  <span className="text-sm text-white/40">{sunData.location.name}</span>
                )}
              </div>
              {SunPathView}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              <Glass 
                variant="subtle" 
                className="p-4 transition-all duration-200 hover:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">Current</span>
                </div>
                <div className="mt-1 text-2xl font-bold">{Math.round(sunData.position.elevation)}°</div>
                <div className="text-xs text-white/60">Elevation</div>
              </Glass>
              <Glass 
                variant="subtle" 
                className="p-4 transition-all duration-200 hover:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <Sunrise className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Sunrise</span>
                </div>
                <div className="mt-1 text-2xl font-bold">{sunData.dayTimes.sunrise}</div>
                <div className="text-xs text-white/60">AM</div>
              </Glass>
              <Glass 
                variant="subtle" 
                className="p-4 transition-all duration-200 hover:bg-white/10"
              >
                <div className="flex items-center gap-2">
                  <Sunset className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Sunset</span>
                </div>
                <div className="mt-1 text-2xl font-bold">{sunData.dayTimes.sunset}</div>
                <div className="text-xs text-white/60">PM</div>
              </Glass>
            </div>

            {/* Timeline */}
            <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-orange-500"
                style={{ 
                  width: `${((new Date().getHours() + new Date().getMinutes()/60) / 24) * 100}%` 
                }}
              />
            </div>
          </Glass>
        </div>
      </div>
    </div>
  )
} 