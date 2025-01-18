"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "dark"
}

export const Glass = ({ variant = "default", className, children, ...props }: GlassProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "glass",
        variant === "subtle" && "bg-opacity-10 backdrop-blur-sm",
        variant === "dark" && "bg-black/20 backdrop-blur-lg",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
} 