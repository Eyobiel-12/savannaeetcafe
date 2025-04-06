"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RefreshCcw, Phone } from 'lucide-react'

export default function ReservationError({
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
    <div className="container mx-auto py-20 px-4 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-4 text-amber-900">Reservation System Error</h1>
      <p className="text-lg mb-8 max-w-2xl">We're sorry, but we've encountered an issue with our reservation system. Please try again or contact us directly.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} className="bg-amber-800 hover:bg-amber-900">
          <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Button asChild variant="outline" className="border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white">
          <Link href="/contact">
            <Phone className="mr-2 h-4 w-4" /> Contact Us
          </Link>
        </Button>
      </div>
    </div>
  )
}

