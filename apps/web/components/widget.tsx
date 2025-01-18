"use client"

import { useColor } from "@/lib/color-context"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export const Widget = () => {
  const { phase, setPhase } = useColor()
  
  const getEmoji = () => {
    switch (phase) {
      case "sun":
        return "☀️"
      case "moon":
        return "🌓"
      case "new-moon":
        return "🌑"
    }
  }
  
  return (
    <motion.div
      className={cn(
        "relative w-[200px] h-[32px] rounded-lg backdrop-blur-xl",
        "bg-black/20 shadow-2xl border border-white/10",
        "flex items-center gap-2 px-2",
        "hover:scale-105 transition-transform duration-200",
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Equal sign */}
      <div className="text-white/60 text-sm font-medium">=</div>

      {/* Temperature */}
      <motion.div 
        key={phase}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="text-sm font-medium text-white"
      >
        {phase === "sun" ? "2,700K" : phase === "moon" ? "3,500K" : "6,500K"}
      </motion.div>

      {/* Emoji button */}
      <button 
        className="text-base hover:scale-110 transition-transform"
        onClick={() => setPhase(p => p === "sun" ? "moon" : p === "moon" ? "new-moon" : "sun")}
      >
        {getEmoji()}
      </button>

      {/* App name and version */}
      <div className="text-[10px] text-white/40 ml-auto">
        helios • v1
      </div>
    </motion.div>
  )
} 