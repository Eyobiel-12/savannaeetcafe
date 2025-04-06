"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import enTranslations from "@/i18n/en.json"
import nlTranslations from "@/i18n/nl.json"

export type Language = "en" | "nl"

type TranslationType = typeof enTranslations
type TranslationContextType = {
  t: (key: string) => string
  currentLanguage: Language
  setLanguage: (lang: Language) => void
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")
  const [translations, setTranslations] = useState<TranslationType>(enTranslations)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load language preference on initial render only - client side only
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("preferredLanguage") as Language | null
      if (savedLang && (savedLang === "en" || savedLang === "nl")) {
        setCurrentLanguage(savedLang)
        setTranslations(savedLang === "en" ? enTranslations : nlTranslations)
      }
    } catch (error) {
      console.error("Error loading language preference:", error)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Update document language and translations when language changes
  useEffect(() => {
    if (!isInitialized) return
    
    if (currentLanguage === "en") {
      setTranslations(enTranslations)
      document.documentElement.lang = "en"
    } else {
      setTranslations(nlTranslations)
      document.documentElement.lang = "nl"
    }
    
    // Store language preference
    try {
      localStorage.setItem("preferredLanguage", currentLanguage)
    } catch (error) {
      console.error("Error saving language preference:", error)
    }
  }, [currentLanguage, isInitialized])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
  }

  // Function to get a nested translation by key path ("home.hero.title")
  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations
    
    for (const k of keys) {
      if (!value || !value[k]) {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
      value = value[k]
    }
    
    return typeof value === "string" ? value : key
  }

  return (
    <TranslationContext.Provider value={{ t, currentLanguage, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  )
} 