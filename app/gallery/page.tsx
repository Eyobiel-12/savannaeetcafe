"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import GalleryLightbox from "@/components/gallery-lightbox"
import BackToTop from "@/components/back-to-top"

type GalleryImage = {
  id: number
  src: string
  alt: string
  category: string
}

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState("all")

  // In a real implementation, this would come from a database or CMS
  const galleryImages: GalleryImage[] = [
    { id: 1, src: "/images/interior/restaurant-1.jpg", alt: "Restaurant Interior", category: "Interior" },
    { id: 2, src: "/images/interior/restaurant-2.jpg", alt: "Dining Area", category: "Interior" },
    { id: 3, src: "/images/interior/restaurant-3.jpg", alt: "Restaurant Seating", category: "Interior" },
    { id: 4, src: "/images/food/food-1.jpg", alt: "Ethiopian Dish", category: "Food" },
    { id: 5, src: "/images/food/food-2.jpg", alt: "Traditional Platter", category: "Food" },
    { id: 6, src: "/images/food/food-3.jpg", alt: "Injera with Various Dishes", category: "Food" },
    { id: 7, src: "/images/food/food-4.jpg", alt: "Vegetarian Platter", category: "Food" },
    { id: 8, src: "/images/food/food-5.jpg", alt: "Habesha Special", category: "Food" },
    { id: 9, src: "/images/food/food-6.jpg", alt: "Traditional Ethiopian Cuisine", category: "Food" },
  ]

  const categories = ["all", ...Array.from(new Set(galleryImages.map((img) => img.category.toLowerCase())))]

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category.toLowerCase() === activeCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    // Re-enable scrolling
    document.body.style.overflow = "auto"
  }

  return (
    <main className="pt-20 pb-16">
      <section className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src="/images/interior/restaurant-1.jpg" alt="Gallery" fill className="object-cover" sizes="100vw" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Gallery</h1>
          <p className="text-xl text-white max-w-2xl">
            Experience the ambiance, cuisine, and culture of Habesha Savanna Eetcafé
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-8">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-amber-50 p-1 rounded-md border border-amber-200/30">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-amber-700 data-[state=active]:text-white px-4 py-2 capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-lg cursor-pointer luxury-hover-lift"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center p-4">
                        <span className="inline-block px-3 py-1 bg-amber-700 text-white text-sm rounded-sm mb-2">
                          {image.category}
                        </span>
                        <h3 className="text-white font-medium">{image.alt}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No images found in this category.</p>
          </div>
        )}
      </section>

      <GalleryLightbox
        images={filteredImages}
        initialIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />

      <BackToTop />
    </main>
  )
}

