import { Glass } from "@/components/ui/glass"
import { motion } from "framer-motion"
import { Download, CheckCircle2 } from "lucide-react"
import { Suspense } from "react"

async function getDownloadUrl(sessionId: string) {
  // In a real implementation, verify the payment session and return the download URL
  return {
    url: process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL || "#",
    version: "1.0.0"
  }
}

export default async function DownloadPage({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams.session_id
  const download = sessionId ? await getDownloadUrl(sessionId) : null

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Suspense
        fallback={
          <Glass className="p-12 max-w-xl w-full">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-white/10 rounded-lg w-3/4" />
              <div className="h-4 bg-white/10 rounded-lg w-1/2" />
              <div className="h-12 bg-white/10 rounded-lg" />
            </div>
          </Glass>
        }
      >
        <Glass className="p-12 max-w-xl w-full space-y-8">
          {download ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 text-green-500">
                <CheckCircle2 className="w-8 h-8" />
                <h1 className="text-2xl font-bold">Payment Successful</h1>
              </div>
              
              <p className="text-white/80">
                Thank you for purchasing Helios! Your download will begin automatically.
              </p>

              <div className="p-4 bg-white/5 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Version</span>
                  <span className="text-sm font-medium">{download.version}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/60">Platform</span>
                  <span className="text-sm font-medium">macOS 12+</span>
                </div>
              </div>

              <motion.a
                href={download.url}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Download Again
              </motion.a>

              <p className="text-sm text-white/60 text-center">
                Having trouble? Contact support at{" "}
                <a href="mailto:support@helios.app" className="text-amber-500 hover:text-amber-400">
                  support@helios.app
                </a>
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 text-center"
            >
              <h1 className="text-2xl font-bold">Invalid Download Link</h1>
              <p className="text-white/80">
                This download link appears to be invalid or has expired.
                Please try purchasing again or contact support if you believe this is an error.
              </p>
              <div className="flex justify-center">
                <motion.a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Return Home
                </motion.a>
              </div>
            </motion.div>
          )}
        </Glass>
      </Suspense>
    </div>
  )
} 