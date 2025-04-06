"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type MenuFilterProps = {
  onFilterChange: (filters: MenuFilters) => void
  onSearchChange: (search: string) => void
}

export type MenuFilters = {
  dietary: string[]
  spiceLevel: string[]
  price: string[]
}

export default function MenuFilter({ onFilterChange, onSearchChange }: MenuFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<MenuFilters>({
    dietary: [],
    spiceLevel: [],
    price: [],
  })
  const [activeFilterCount, setActiveFilterCount] = useState(0)

  const dietaryOptions = [
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "gluten-free", label: "Gluten Free" },
  ]

  const spiceLevelOptions = [
    { value: "mild", label: "Mild" },
    { value: "medium", label: "Medium" },
    { value: "spicy", label: "Spicy" },
  ]

  const priceOptions = [
    { value: "under-15", label: "Under €15" },
    { value: "15-20", label: "€15 - €20" },
    { value: "over-20", label: "Over €20" },
  ]

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearchChange(value)
  }

  const handleFilterChange = (category: keyof MenuFilters, value: string) => {
    const updatedFilters = { ...filters }

    if (updatedFilters[category].includes(value)) {
      updatedFilters[category] = updatedFilters[category].filter((item) => item !== value)
    } else {
      updatedFilters[category] = [...updatedFilters[category], value]
    }

    setFilters(updatedFilters)

    // Count total active filters
    const newCount = Object.values(updatedFilters).flat().length
    setActiveFilterCount(newCount)

    onFilterChange(updatedFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      dietary: [],
      spiceLevel: [],
      price: [],
    }
    setFilters(emptyFilters)
    setActiveFilterCount(0)
    onFilterChange(emptyFilters)
  }

  const clearSearch = () => {
    setSearchQuery("")
    onSearchChange("")
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-200/30 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute left-3 top-2.5 text-amber-500">
            <Search className="h-5 w-5 opacity-70" />
          </div>
          <Input
            type="text"
            placeholder="Search our menu..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 py-6 border-amber-200 focus:border-amber-500 focus:ring-amber-500 w-full"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-amber-200 text-amber-900 hover:bg-amber-50 flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 bg-amber-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-amber-200/30 shadow-md">
              <DropdownMenuLabel>Dietary Preferences</DropdownMenuLabel>
              {dietaryOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={filters.dietary.includes(option.value)}
                  onCheckedChange={() => handleFilterChange("dietary", option.value)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Spice Level</DropdownMenuLabel>
              {spiceLevelOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={filters.spiceLevel.includes(option.value)}
                  onCheckedChange={() => handleFilterChange("spiceLevel", option.value)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />

              <DropdownMenuLabel>Price Range</DropdownMenuLabel>
              {priceOptions.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={filters.price.includes(option.value)}
                  onCheckedChange={() => handleFilterChange("price", option.value)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}

              {activeFilterCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full text-amber-700 hover:text-amber-800 hover:bg-amber-50"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

