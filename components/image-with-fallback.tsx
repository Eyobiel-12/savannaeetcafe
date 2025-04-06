"use client"

import { useState } from "react"
import Image from "next/image"

type ImageWithFallbackProps = {
  src: string
  fallbackSrc: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  onLoad?: () => void
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  alt,
  width,
  height,
  fill = false,
  className = "",
  sizes,
  priority = false,
  onLoad,
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setImgSrc(fallbackSrc)}
      onLoad={() => {
        if (onLoad) onLoad()
      }}
      {...rest}
    />
  )
}

