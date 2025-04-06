"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuFilter, { type MenuFilters } from "@/components/menu-filter"
import BackToTop from "@/components/back-to-top"
import { motion, AnimatePresence } from "framer-motion"

type MenuItem = {
  id: string
  name: string
  description: string
  price: string
  category: string
  dietary?: string[]
  spiceLevel?: string
  featured?: boolean
}

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<MenuFilters>({
    dietary: [],
    spiceLevel: [],
    price: [],
  })
  const [filteredMeatItems, setFilteredMeatItems] = useState<MenuItem[]>([])
  const [filteredVegetarianItems, setFilteredVegetarianItems] = useState<MenuItem[]>([])

  // Menu data - in a real app, this would come from an API or CMS
  const meatItems: MenuItem[] = [
    {
      id: "kulua-rund",
      name: "Kulua Rund",
      description:
        "Injera met rundvlees gestoofd in uien (pittige saus optioneel) / Injera with beef stewed in unions (Spicy sauce optional)",
      price: "€20",
      category: "meat",
      spiceLevel: "medium",
      dietary: [],
    },
    {
      id: "kulua-lam",
      name: "Kulua Lam",
      description:
        "Injera met lamsvlees gestoofd in uien (pittige saus optioneel) / Injera with lamb stewed in onions (Spicy sauce optional)",
      price: "€20",
      category: "meat",
      spiceLevel: "medium",
      dietary: [],
    },
    {
      id: "zigni-rund",
      name: "Zigni Rund",
      description:
        "Injera met blokjes rundvlees geserveerd met een pittige saus / Injera with cubes beef served with a spicy sauce",
      price: "€19",
      category: "meat",
      spiceLevel: "spicy",
      dietary: [],
    },
    {
      id: "tsebhi-kip",
      name: "Tsebhi Kip",
      description:
        "Injera met kipdrumstick en hardgekookt ei geserveerd in een pikante saus / Injera with chicken drumstick and hard boiled egg served in a spicy sauce",
      price: "€19",
      category: "meat",
      spiceLevel: "spicy",
      dietary: [],
    },
    {
      id: "tsebhi-hamli",
      name: "Tsebhi Hamli",
      description:
        "Injera met spinazie, gesneden rundvlees in een pikante saus / Injera with spinach, sliced beef in a spicy sauce",
      price: "€19",
      category: "meat",
      spiceLevel: "spicy",
      dietary: [],
    },
    {
      id: "kitfo",
      name: "Kitfo",
      description:
        "Injera met rundvlees tartaar in pikante paprika met Eritrese boter / Injera with beef tartare in spicy peppers with Eritrean butter",
      price: "€20",
      category: "meat",
      spiceLevel: "spicy",
      featured: true,
      dietary: [],
    },
    {
      id: "goredgored",
      name: "Goredgored",
      description:
        "Injera met halfgebakken en pikante rundvlees geserveerd met Eritrese boter / Injera with half-fried and spicy beef served with Eritrean butter",
      price: "€20",
      category: "meat",
      spiceLevel: "spicy",
      dietary: [],
    },
    {
      id: "shekla",
      name: "Shekla",
      description:
        "Rundvlees gebakken en gesneden geserveerd op injera met Eritrese boter / Beef fried and sliced served on injera with Eritrean butter",
      price: "€20",
      category: "meat",
      spiceLevel: "mild",
      dietary: [],
    },
    {
      id: "savanna-speciaal",
      name: "Savanna Speciaal",
      description: "Derho, Kulua, Zigni (vlees) en Ades (vega). Kulua, Zigni (meat) and Ades (vega)",
      price: "€40 / €70",
      category: "meat",
      spiceLevel: "medium",
      featured: true,
      dietary: [],
    },
    {
      id: "quanta",
      name: "Quanta",
      description:
        "Pikante saus met gedroogde vlees gebakken in Tsahli (ook geserveerd in Tsahli) / Spicy sauce with dried meat baked in Tsahli (also served in Tsahli)",
      price: "€20",
      category: "meat",
      spiceLevel: "spicy",
      dietary: [],
    },
    {
      id: "kilkil",
      name: "Kilkil (mergsoep / marrow soup)",
      description:
        "Lamsbout, wortel, uien, knoflook, tomaten, paprika, chili / Leg of lamb, carrot, onions, garlic, tomatoes, peppers, chili",
      price: "€20",
      category: "meat",
      spiceLevel: "medium",
      dietary: [],
    },
    {
      id: "capreto",
      name: "Capreto",
      description:
        "Injera met vlees en merg gemaakt in een pikante saus / Injera with meat and bone marrow made in a spicy sauce",
      price: "€20",
      category: "meat",
      spiceLevel: "spicy",
      dietary: [],
    },
  ]

  const vegetarianItems: MenuItem[] = [
    {
      id: "alicha",
      name: "Alicha",
      description:
        "Injera met gestoofde aardappel, wortel, witte kool, uien en knoflook / Injera with stewed potato, carrot, white cabbage, onions and garlic",
      price: "€17",
      category: "vegetarian",
      spiceLevel: "mild",
      dietary: ["vegetarian", "vegan"],
    },
    {
      id: "hamli",
      name: "Hamli",
      description:
        "Injera met gestoofde spinazie, witte kool, uien en knoflook / Injera with stewed spinach, white cabbage, onions and garlic",
      price: "€17",
      category: "vegetarian",
      spiceLevel: "mild",
      dietary: ["vegetarian", "vegan"],
    },
    {
      id: "timtimo",
      name: "Timtimo",
      description: "Injera met linzen, uien, knoflook en kruiden / Injera with lentils, onions, garlic and herbs",
      price: "€18",
      category: "vegetarian",
      spiceLevel: "mild",
      dietary: ["vegetarian", "vegan"],
    },
    {
      id: "shiro",
      name: "Shiro",
      description:
        "Injera met kikkererwt poeder, uien, knoflook en salade / Injera with chickpea powder, onions, garlic and salad",
      price: "€19",
      category: "vegetarian",
      spiceLevel: "mild",
      dietary: ["vegetarian", "vegan"],
    },
    {
      id: "bebiaynetu",
      name: "Bebiaynetu",
      description:
        "Injera met linzen, spinazie, aardappel, wortel, rode biet, kikkererwtpoeder, knoflook en uien / Injera with lentils, spinach, potato, carrot, beetroot, chickpea powder, garlic and onions",
      price: "€20",
      category: "vegetarian",
      spiceLevel: "mild",
      featured: true,
      dietary: ["vegetarian", "vegan"],
    },
    {
      id: "fitfit",
      name: "Fitfit",
      description:
        "Injera met een pittige saus, tomaten, uien en knoflook / Injera with spicy sauce, tomato, unions and garlic",
      price: "€17",
      category: "vegetarian",
      spiceLevel: "spicy",
      dietary: ["vegetarian", "vegan"],
    },
  ]

  // Filter menu items based on search and filters
  useEffect(() => {
    const filterItems = (items: MenuItem[]) => {
      return items.filter((item) => {
        // Search filter
        const matchesSearch =
          searchQuery === "" ||
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())

        // Dietary filter
        const matchesDietary =
          activeFilters.dietary.length === 0 ||
          (item.dietary && activeFilters.dietary.some((diet) => item.dietary?.includes(diet)))

        // Spice level filter
        const matchesSpiceLevel =
          activeFilters.spiceLevel.length === 0 ||
          (item.spiceLevel && activeFilters.spiceLevel.includes(item.spiceLevel))

        // Price filter
        const matchesPrice =
          activeFilters.price.length === 0 ||
          activeFilters.price.some((priceRange) => {
            const itemPrice = Number.parseFloat(item.price.replace("€", "").split(" / ")[0])

            if (priceRange === "under-15" && itemPrice < 15) return true
            if (priceRange === "15-20" && itemPrice >= 15 && itemPrice <= 20) return true
            if (priceRange === "over-20" && itemPrice > 20) return true

            return false
          })

        return matchesSearch && matchesDietary && matchesSpiceLevel && matchesPrice
      })
    }

    setFilteredMeatItems(filterItems(meatItems))
    setFilteredVegetarianItems(filterItems(vegetarianItems))
  }, [searchQuery, activeFilters])

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (filters: MenuFilters) => {
    setActiveFilters(filters)
  }

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src="/images/food/food-2.jpg" alt="Our Menu" fill className="object-cover" sizes="100vw" priority />
        <div className="relative z-20 container-luxe h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-white mb-4">
            <span className="block">Our</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
              Menu
            </span>
          </h1>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-6"></div>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            Experience authentic Ethiopian and Eritrean cuisine in a warm and welcoming atmosphere
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section-padding bg-amber-50/30">
        <div className="container-luxe">
          <MenuFilter onSearchChange={handleSearchChange} onFilterChange={handleFilterChange} />

          <Tabs defaultValue="meat" className="w-full max-w-4xl mx-auto">
            <TabsList className="w-full justify-center mb-12 bg-transparent border-b border-amber-200">
              {[
                { value: "meat", label: "Meat Dishes" },
                { value: "vegetarian", label: "Vegetarian" },
                { value: "about-injera", label: "About Injera" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:border-b-2 data-[state=active]:border-amber-600 data-[state=active]:text-amber-900 data-[state=active]:bg-transparent px-6 py-3 text-muted-foreground uppercase tracking-wider text-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="about-injera" className="mt-6">
              <div className="bg-white p-8 rounded-lg mb-8 shadow-sm border border-amber-200/30">
                <h3 className="text-2xl font-cormorant font-medium text-amber-900 mb-4">About Injera</h3>
                <p className="text-muted-foreground mb-4">
                  Injera is a thin flatbread made from teff flour (East African Whole Wheat Flour). It serves as both
                  the plate and utensil in Ethiopian and Eritrean dining, with various dishes served on top. The slightly sour,
                  spongy texture complements the rich flavors of our dishes.
                </p>
                <p className="text-muted-foreground">
                  <span className="font-medium">Extra injera:</span> €1 per piece
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative h-60 rounded-lg overflow-hidden">
                    <Image
                      src="/images/food/food-5.jpg"
                      alt="Close-up of Injera"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="relative h-60 rounded-lg overflow-hidden">
                    <Image
                      src="/images/food/food-6.jpg"
                      alt="Injera with various dishes"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="meat" className="mt-6">
              <AnimatePresence>
                {filteredMeatItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <p className="text-lg text-gray-500">No meat dishes match your search criteria.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery("")
                        setActiveFilters({
                          dietary: [],
                          spiceLevel: [],
                          price: [],
                        })
                      }}
                      className="text-amber-700 mt-2"
                    >
                      Clear all filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredMeatItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className={`menu-item p-6 rounded-lg ${item.featured ? "bg-amber-50/70 border border-amber-200/30" : "bg-white"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="menu-item-title">
                          <h3 className="menu-item-name flex items-center">
                            {item.name}
                            {item.featured && (
                              <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-sm uppercase">
                                Featured
                              </span>
                            )}
                          </h3>
                          <span className="menu-item-price">{item.price}</span>
                        </div>
                        <p className="menu-item-description">{item.description}</p>
                        <div className="flex gap-2 mt-3">
                          {item.spiceLevel && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-sm ${
                                item.spiceLevel === "mild"
                                  ? "bg-green-100 text-green-800"
                                  : item.spiceLevel === "medium"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.spiceLevel.charAt(0).toUpperCase() + item.spiceLevel.slice(1)}
                            </span>
                          )}
                          {item.dietary &&
                            item.dietary.map((diet) => (
                              <span
                                key={diet}
                                className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm capitalize"
                              >
                                {diet}
                              </span>
                            ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="vegetarian" className="mt-6">
              <AnimatePresence>
                {filteredVegetarianItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <p className="text-lg text-gray-500">No vegetarian dishes match your search criteria.</p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery("")
                        setActiveFilters({
                          dietary: [],
                          spiceLevel: [],
                          price: [],
                        })
                      }}
                      className="text-amber-700 mt-2"
                    >
                      Clear all filters
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {filteredVegetarianItems.map((item) => (
                      <motion.div
                        key={item.id}
                        className={`menu-item p-6 rounded-lg ${item.featured ? "bg-amber-50/70 border border-amber-200/30" : "bg-white"}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="menu-item-title">
                          <h3 className="menu-item-name flex items-center">
                            {item.name}
                            {item.featured && (
                              <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-sm uppercase">
                                Featured
                              </span>
                            )}
                          </h3>
                          <span className="menu-item-price">{item.price}</span>
                        </div>
                        <p className="menu-item-description">{item.description}</p>
                        <div className="flex gap-2 mt-3">
                          {item.spiceLevel && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-sm ${
                                item.spiceLevel === "mild"
                                  ? "bg-green-100 text-green-800"
                                  : item.spiceLevel === "medium"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.spiceLevel.charAt(0).toUpperCase() + item.spiceLevel.slice(1)}
                            </span>
                          )}
                          {item.dietary &&
                            item.dietary.map((diet) => (
                              <span
                                key={diet}
                                className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-sm capitalize"
                              >
                                {diet}
                              </span>
                            ))}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our dishes are prepared with authentic Ethiopian and Eritrean spices and traditional cooking methods. Please inform
              your server of any dietary restrictions or allergies.
            </p>
            <Button asChild className="luxury-button">
              <Link href="/reservation">Reserve Your Table</Link>
            </Button>
          </div>
        </div>
      </section>

      <BackToTop />
    </main>
  )
}

