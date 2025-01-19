"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const Header = () => (
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
        "absolute left-[calc(50%+120px)]",
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