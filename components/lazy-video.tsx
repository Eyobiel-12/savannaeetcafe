"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

type LazyVideoProps = {
  src: string
  poster?: string
  className?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  playsInline?: boolean
  controls?: boolean
  fallbackImage?: string
}

export default function LazyVideo({
  src,
  poster,
  className = "",
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  controls = false,
  fallbackImage,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            const video = videoRef.current
            if (video) {
              // Create a source element
              const source = document.createElement("source")
              source.src = src
              source.type = "video/mp4"

              // Add error handling
              source.onerror = () => {
                setHasError(true)
                console.warn(`Failed to load video: ${src}`)
              }

              // Clear any existing sources
              while (video.firstChild) {
                video.removeChild(video.firstChild)
              }

              // Add the source to the video
              video.appendChild(source)

              // Load and play if autoplay is true
              video.load()
              if (autoPlay) {
                const playPromise = video.play()
                if (playPromise !== undefined) {
                  playPromise.catch((error) => {
                    console.warn("Auto-play was prevented:", error)
                    // We don't set hasError here as this is often due to browser autoplay policies
                  })
                }
              }

              setIsLoaded(true)
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(videoRef.current)

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [src, autoPlay, isLoaded])

  // If we have an error and a fallback image, show the image instead
  if (hasError && fallbackImage) {
    return (
      <div className={className} style={{ position: "relative" }}>
        <Image src={fallbackImage || "/placeholder.svg"} alt="Video fallback" fill className="object-cover" priority />
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      onError={() => setHasError(true)}
    >
      {/* Source will be added via JavaScript */}
      <p>Your browser does not support HTML video.</p>
    </video>
  )
}

