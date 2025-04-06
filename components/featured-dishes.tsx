"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Pause, Play } from "lucide-react"
import ImageWithFallback from "@/components/image-with-fallback"

const featuredDishes = [
  {
    id: 1,
    name: "Kitfo",
    description:
      "Injera met rundvlees tartaar in pikante paprika met Eritrese boter / Injera with beef tartare in spicy peppers with Eritrean butter",
    price: "€20",
    image: "/images/food/food-1.jpg",
    lowQualityImage: "/images/food/food-1.jpg",
    category: "Meat",
  },
  {
    id: 2,
    name: "Bebiaynetu",
    description:
      "Injera met linzen, spinazie, aardappel, wortel, rode biet, kikkererwtpoeder, knoflook en uien / Injera with lentils, spinach, potato, carrot, beetroot, chickpea powder, garlic and onions",
    price: "€20",
    image: "/images/food/food-2.jpg",
    lowQualityImage: "/images/food/food-2.jpg",
    category: "Vegetarian",
  },
  {
    id: 3,
    name: "Savanna Speciaal",
    description: "Derho, Kulua, Zigni (vlees) en Ades (vega) / Kulua, Zigni (meat) and Ades (vega)",
    price: "€40 / €70",
    image: "/images/food/food-3.jpg",
    lowQualityImage: "/images/food/food-3.jpg",
    category: "Special",
  },
]

export default function FeaturedDishes() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [autoplay, setAutoplay] = useState(true)

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === featuredDishes.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? featuredDishes.length - 1 : prev - 1))
  }, [])

  useEffect(() => {
    if (!autoplay) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [autoplay, nextSlide])

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-amber-50/60 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full -mr-32 -mb-32 blur-3xl"></div>
      <div className="container-luxe relative z-10">
        <div className="text-center mb-16">
          <span className="text-amber-800 text-sm uppercase tracking-widest block mb-2">Culinary Excellence</span>
          <h2 className="heading-lg mb-4">
            <span className="text-amber-900">Signature</span> Dishes
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-800 to-amber-600 mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto text-muted-foreground">
            Experience our chef's specialties, featuring authentic Ethiopian and Eritrean flavors prepared with traditional
            techniques
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-amber-700 z-0"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-amber-700 z-0"></div>
            <motion.div
              className="relative z-10 overflow-hidden rounded-lg h-[450px] shadow-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={featuredDishes[activeIndex].image || "/placeholder.svg"}
                    fallbackSrc="/placeholder.svg?height=450&width=600"
                    alt={featuredDishes[activeIndex].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onLoad={() => setImageLoaded(true)}
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <span className="inline-block px-3 py-1 bg-amber-700 text-white text-sm rounded-sm mb-2">
                  {featuredDishes[activeIndex].category}
                </span>
                <h3 className="text-white text-2xl font-cormorant">{featuredDishes[activeIndex].name}</h3>
              </div>
              
              {/* Navigation Controls */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4">
                <button 
                  onClick={prevSlide}
                  className="h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors backdrop-blur-sm"
                  aria-label="Previous dish"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <button 
                  onClick={nextSlide}
                  className="h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors backdrop-blur-sm"
                  aria-label="Next dish"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>
              
              {/* Autoplay Control */}
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setAutoplay(!autoplay)}
                  className="h-8 w-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center transition-colors backdrop-blur-sm"
                  aria-label={autoplay ? "Pause slideshow" : "Play slideshow"}
                >
                  {autoplay ? 
                    <Pause className="h-4 w-4 text-white" /> : 
                    <Play className="h-4 w-4 text-white" />
                  }
                </button>
              </div>
              
              {/* Dots */}
              <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
                {featuredDishes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeIndex === index ? "w-6 bg-amber-400" : "w-2 bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex flex-wrap gap-3 mb-8">
              {featuredDishes.map((dish, index) => (
                <button
                  key={dish.id}
                  onClick={() => {
                    setActiveIndex(index)
                    setAutoplay(false)
                  }}
                  className={`px-5 py-3 text-sm uppercase tracking-wider transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-gradient-to-r from-amber-800 to-amber-700 text-white shadow-md"
                      : "bg-amber-100/70 text-amber-800 hover:bg-amber-200/70"
                  } border border-amber-200/30 rounded-sm`}
                >
                  {dish.category}
                </button>
              ))}
            </div>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 border border-amber-200/30 rounded-lg shadow-sm"
            >
              <div className="mb-3">
                <span className="text-sm uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-sm">
                  Chef's Selection
                </span>
              </div>
              <h3 className="heading-md mb-3 text-amber-900">{featuredDishes[activeIndex].name}</h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-amber-800 to-amber-600 mb-6"></div>
              <p className="text-body mb-6 text-gray-700">{featuredDishes[activeIndex].description}</p>
              <div className="flex items-baseline justify-between mb-8">
                <p className="text-3xl font-cormorant text-amber-800">{featuredDishes[activeIndex].price}</p>
                <div className="h-px bg-amber-200 flex-grow mx-4"></div>
                <div className="bg-amber-100/50 px-3 py-1 rounded-sm">
                  <span className="text-sm text-amber-800 uppercase tracking-wider">Signature</span>
                </div>
              </div>
              <Button asChild className="luxury-button group">
                <Link href="/menu" className="flex items-center">
                  View Full Menu
                  <ChevronRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

