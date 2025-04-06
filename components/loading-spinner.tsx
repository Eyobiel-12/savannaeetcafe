import { Loader2 } from "lucide-react"

type LoadingSpinnerProps = {
  size?: number
  className?: string
}

export default function LoadingSpinner({ size = 24, className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className="animate-spin text-amber-600" style={{ width: size, height: size }} />
    </div>
  )
}

