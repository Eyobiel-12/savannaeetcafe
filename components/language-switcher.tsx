"use client"

import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTranslation, Language } from "@/lib/i18n"

type LanguageOption = {
  code: Language
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
]

export default function LanguageSwitcher({ className }: { className?: string }) {
  const pathname = usePathname()
  const { currentLanguage, setLanguage } = useTranslation()
  
  const handleLanguageChange = (language: LanguageOption) => {
    if (language.code !== currentLanguage) {
      console.log(`Changing language from ${currentLanguage} to ${language.code}`)
      setLanguage(language.code)
      // Force reload to apply translations everywhere
      window.location.reload()
    }
  }

  const currentLangOption = languages.find(lang => lang.code === currentLanguage) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(
        "flex items-center gap-1 px-2 py-1 rounded-md hover:bg-amber-100/20 transition-colors",
        className
      )}>
        <Globe className="h-4 w-4" />
        <span className="text-sm">{currentLangOption.flag}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border border-amber-200/30 shadow-md z-50">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              currentLanguage === language.code ? "bg-amber-50 font-medium" : ""
            )}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

