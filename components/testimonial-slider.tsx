"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ImageWithFallback from "@/components/image-with-fallback"

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    title: "Food Critic, Gourmet Magazine",
    quote:
      "Habesha Savanna redefines Ethiopian cuisine with its impeccable attention to detail and innovative approach to traditional flavors. A truly transcendent dining experience.",
    image: "/images/food/food-4.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Sophia Chen",
    title: "Michelin Guide Inspector",
    quote:
      "The perfect balance of authenticity and refinement. Chef Makeda's tasting menu is a masterclass in elevating Ethiopian cuisine to the highest echelons of fine dining.",
    image: "/images/food/food-5.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Robert Johnson",
    title: "International Food Blogger",
    quote:
      "From the moment you enter, Habesha Savanna envelops you in luxury. The savanna-inspired ambiance perfectly complements the bold, complex flavors of each meticulously crafted dish.",
    image: "/images/food/food-6.jpg",
    rating: 5,
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      next()
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay])

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      next()
      setAutoplay(false)
    }

    if (isRightSwipe) {
      prev()
      setAutoplay(false)
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sliderRef.current && sliderRef.current.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") {
          prev()
          setAutoplay(false)
        } else if (e.key === "ArrowRight") {
          next()
          setAutoplay(false)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <section className="section-padding bg-gradient-to-b from-white to-amber-50/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100/30 rounded-full -ml-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full -mr-32 -mb-32 blur-3xl"></div>
      <div className="container-luxe relative z-10">
        <div className="text-center mb-16">
          <span className="text-amber-800 text-sm uppercase tracking-widest block mb-2">What People Say</span>
          <h2 className="heading-lg mb-4">
            <span className="text-amber-900">Guest</span> Testimonials
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-800 to-amber-600 mx-auto mb-6"></div>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          ref={sliderRef}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Testimonials carousel"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{backgroundImage: "url('/images/interior/restaurant-3.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "overlay", borderRadius: "0.5rem", boxShadow: "inset 0 0 0 2000px rgba(255, 255, 255, 0.85)"}}
        >
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-20">
            <Quote className="h-24 w-24 text-amber-700" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center bg-white p-10 rounded-lg border border-amber-200/30 shadow-lg relative z-10"
              aria-roledescription="slide"
              aria-label={`${current + 1} of ${testimonials.length}`}
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-amber-50 shadow-md">
                <ImageWithFallback
                  src={testimonials[current].image || "/placeholder.svg"}
                  fallbackSrc="/placeholder.svg?height=96&width=96"
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl font-cormorant italic mb-6 max-w-3xl text-gray-800">
                "{testimonials[current].quote}"
              </blockquote>

              <div className="border-t border-amber-200/30 pt-4 mt-2">
                <p className="font-medium text-lg text-amber-900">{testimonials[current].name}</p>
                <p className="text-muted-foreground">{testimonials[current].title}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => {
              prev()
              setAutoplay(false)
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 w-12 h-12 rounded-full bg-white flex items-center justify-center text-amber-900 hover:bg-amber-50 transition-colors border border-amber-200/30 shadow-md z-20"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={() => {
              next()
              setAutoplay(false)
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 w-12 h-12 rounded-full bg-white flex items-center justify-center text-amber-900 hover:bg-amber-50 transition-colors border border-amber-200/30 shadow-md z-20"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index)
                setAutoplay(false)
              }}
              className={`w-3 h-3 mx-1 transition-all duration-300 rounded-full ${
                current === index ? "bg-amber-700 w-8" : "bg-amber-200 hover:bg-amber-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={current === index ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

