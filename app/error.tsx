"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-amber-200/30 max-w-md">
        <h1 className="text-4xl font-cormorant text-amber-900 mb-4">Something went wrong</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-800 to-amber-600 mx-auto mb-6"></div>
        <p className="text-gray-600 mb-8">
          We apologize for the inconvenience. Please try again or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} className="luxury-button flex items-center justify-center">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
          >
            <Link href="/" className="flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

