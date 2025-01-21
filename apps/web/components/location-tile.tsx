"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LocationTileProps {
  className?: string
}

export function LocationTile({ className }: LocationTileProps) {
  return (
    <div className={cn(
      "relative w-[200px] h-[32px] rounded-lg backdrop-blur-xl",
      "bg-black/20 shadow-2xl border border-white/10",
      "flex items-center gap-2 px-2",
      "hover:scale-105 transition-transform duration-200",
      className
    )}>
      <div className="flex items-center gap-2 w-full">
        <div className="text-white/60 text-sm font-medium">📍</div>
        <div className="text-sm font-medium text-white">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ display: 'inline-block' }}
          >
            San Francisco, CA
          </motion.span>
        </div>
      </div>
    </div>
  )
}
