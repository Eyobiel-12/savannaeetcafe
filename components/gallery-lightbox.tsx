"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type GalleryImage = {
  id: number
  src: string
  alt: string
  category: string
}

type GalleryLightboxProps = {
  images: GalleryImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export default function GalleryLightbox({ images, initialIndex = 0, isOpen, onClose }: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowLeft":
          navigatePrev()
          break
        case "ArrowRight":
          navigateNext()
          break
        case "Escape":
          onClose()
          break
        case "z":
          setIsZoomed(!isZoomed)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, isZoomed, currentIndex])

  // Reset zoom when changing images
  useEffect(() => {
    setIsZoomed(false)
  }, [currentIndex])

  // Update current index when initialIndex changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex)
    }
  }, [initialIndex, isOpen])

  const navigateNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const navigatePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Image container */}
        <div
          className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`relative ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"} max-w-full max-h-full`}
            style={{
              width: isZoomed ? "150%" : "100%",
              height: isZoomed ? "150%" : "100%",
              overflow: "hidden",
            }}
            onClick={toggleZoom}
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex].src || "/placeholder.svg"}
                alt={images[currentIndex].alt}
                fill
                className={`object-contain transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"}`}
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <button
            className="absolute left-4 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              navigatePrev()
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-4 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              navigateNext()
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Zoom button */}
          <button
            className="absolute bottom-4 right-4 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              toggleZoom()
            }}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="h-6 w-6" /> : <ZoomIn className="h-6 w-6" />}
          </button>

          {/* Image info */}
          <div className="absolute bottom-4 left-0 right-0 mx-auto text-center text-white bg-black/50 py-2 px-4 max-w-md rounded-md">
            <span className="inline-block px-2 py-0.5 bg-amber-700 text-white text-xs rounded-sm mb-1">
              {images[currentIndex].category}
            </span>
            <p>{images[currentIndex].alt}</p>
            <p className="text-sm text-gray-300 mt-1">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

