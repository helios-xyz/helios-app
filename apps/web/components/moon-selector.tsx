"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

export type ColorMode = "light" | "dark"

interface MoonSelectorProps {
  mode: ColorMode
  onChange: (mode: ColorMode) => void
  className?: string
}

export function MoonSelector({ mode, onChange, className }: MoonSelectorProps) {
  return (
    <button
      onClick={() => onChange(mode === "light" ? "dark" : "light")}
      className={cn(
        "relative w-[64px] h-[32px] rounded-full",
        "bg-black/20 backdrop-blur-xl shadow-2xl border border-white/10",
        "hover:scale-105 transition-transform duration-200",
        className
      )}
    >
      <motion.div
        style={{
          position: "absolute",
          top: "4px",
          left: "4px",
          width: "24px",
          height: "24px",
          borderRadius: "9999px",
          backgroundColor: "white"
        }}
        animate={{
          x: mode === "light" ? 0 : 28,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />
    </button>
  )
}
