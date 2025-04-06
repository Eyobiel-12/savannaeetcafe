import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Image optimization helper
export function getOptimizedImageUrl(src: string, width?: number, quality?: number) {
  return `${src}?w=${width || 1200}&q=${quality || 75}`
}

// Lazy loading helper
export const lazyLoadImage = (target: HTMLImageElement) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute("data-src")

        if (src) {
          img.src = src
          img.classList.add("loaded")
        }

        observer.disconnect()
      }
    })
  })

  io.observe(target)
}

// Format date helper
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Price formatter
export function formatPrice(price: string): string {
  if (price.includes("/")) {
    const [single, group] = price.split("/")
    return `${single.trim()} / ${group.trim()}`
  }
  return price
}

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(later, wait)
  }
}

