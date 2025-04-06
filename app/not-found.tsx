import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-amber-200/30 max-w-md">
        <h1 className="text-6xl font-cormorant text-amber-900 mb-4">404</h1>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-800 to-amber-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-cormorant text-amber-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild className="luxury-button">
          <Link href="/" className="flex items-center justify-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  )
}

