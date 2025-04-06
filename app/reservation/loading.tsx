import LoadingSpinner from "@/components/loading-spinner"

export default function ReservationLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size={40} className="mb-4" />
        <h2 className="text-2xl font-cormorant text-amber-900">Loading Reservation System</h2>
        <p className="text-amber-700 mt-2">Preparing your dining experience...</p>
      </div>
    </div>
  )
}

