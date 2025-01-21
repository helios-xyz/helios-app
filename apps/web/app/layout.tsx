import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import "../styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Helios",
  description: "Track the sun's journey through your day with Helios. Beautiful, minimal, and always at your fingertips.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        {children}
      </body>
    </html>
  )
}
