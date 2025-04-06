import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <LoadingSpinner size={40} className="mb-4" />
        <h2 className="text-2xl font-cormorant text-amber-900">Loading Habesha Savanna</h2>
        <p className="text-amber-700 mt-2">Preparing your Ethiopian culinary experience...</p>
      </div>
    </div>
  )
}

