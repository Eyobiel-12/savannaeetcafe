"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import ImageWithFallback from "@/components/image-with-fallback"
import LanguageSwitcher from "@/components/language-switcher"
import { useTranslation } from "@/lib/i18n"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/menu", label: t("nav.menu") },
    { href: "/about", label: t("nav.about") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/contact", label: t("nav.contact") },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2 border-b border-amber-200/20" : "bg-transparent py-6",
      )}
    >
      <div className="container-luxe">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="relative w-16 h-16 overflow-hidden">
              <ImageWithFallback
                src="/images/logo.png"
                fallbackSrc="/placeholder.svg?height=64&width=64"
                alt="Habesha Savanna Eetcafé Logo"
                fill
                className="object-contain"
                sizes="64px"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-cormorant font-medium text-2xl transition-colors",
                  isScrolled ? "text-amber-900" : "text-white",
                  "luxury-gold-text",
                )}
              >
                Habesha Savanna
              </span>
              <span
                className={cn(
                  "text-xs uppercase tracking-widest transition-colors",
                  isScrolled ? "text-amber-700" : "text-amber-200",
                )}
              >
                Eetcafé
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "font-montserrat text-sm uppercase tracking-wider transition-all duration-300",
                  isScrolled ? "text-gray-800 hover:text-amber-800" : "text-white hover:text-amber-300",
                  "relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] hover:after:w-full",
                  isScrolled ? "after:bg-amber-800" : "after:bg-amber-300",
                  "after:transition-all after:duration-300",
                  pathname === item.href && "font-medium",
                  pathname === item.href && (isScrolled ? "text-amber-800" : "text-amber-300"),
                  pathname === item.href && "after:w-full",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className={isScrolled ? "" : "text-white"}>
              <LanguageSwitcher className={isScrolled ? "text-amber-900" : "text-white"} />
            </div>
            <Button
              asChild
              variant="outline"
              className={cn(
                "border-2 uppercase tracking-wider text-sm font-medium transition-all duration-300",
                isScrolled
                  ? "border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white"
                  : "border-white text-Black  hover:bg-white hover:text-amber-900",
                "luxury-hover-glow",
              )}
            >
              <Link href="/reservation">{t("nav.reserveTable")}</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl p-2 rounded-full"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className={isScrolled ? "text-gray-800" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-gray-800" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#502310] z-40 lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6">
                <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
                  <div className="relative w-16 h-16 overflow-hidden">
                    <ImageWithFallback
                      src="/images/logo.png"
                      fallbackSrc="/placeholder.svg?height=64&width=64"
                      alt="Habesha Savanna Eetcafé Logo"
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-cormorant font-medium text-2xl text-[#D48E48]">
                      Habesha Savanna
                    </span>
                    <span className="text-xs uppercase tracking-widest text-amber-200">
                      EETCAFÉ
                    </span>
                  </div>
                </Link>
                <button
                  className="text-white text-3xl p-2 rounded-full"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <X />
                </button>
              </div>
              <nav className="flex flex-col mt-4 px-6">
                {navItems.map((item, index) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-white text-3xl font-cormorant hover:text-amber-200 transition-colors py-4 block ${
                        pathname === item.href ? "text-amber-200" : ""
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                    {index < navItems.length - 1 && <div className="h-px bg-amber-800/30 w-full" />}
                  </div>
                ))}
              </nav>
              <div className="px-6 mt-6 flex justify-center">
                <div className="text-white">
                  <LanguageSwitcher className="text-white" />
                </div>
              </div>
              <div className="mt-auto p-6">
                <Button
                  asChild
                  className="bg-white text-amber-900 hover:bg-amber-100 uppercase tracking-wider w-full py-6 text-lg font-semibold"
                  onClick={closeMenu}
                >
                  <Link href="/reservation">{t("nav.reserveTable")}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

