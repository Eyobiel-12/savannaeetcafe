import type React from "react"
import type { Metadata } from "next"
import { Cormorant, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import BackToTop from "@/components/back-to-top"
import { TranslationProvider } from "@/lib/i18n"

const cormorant = Cormorant({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Habesha Savanna | Authentic Ethiopian and Eritrean Cuisine",
  description:
    "Experience the pinnacle of Ethiopian and Eritrean gastronomy at Habesha Savanna, offering an unforgettable culinary journey through the flavors of Ethiopia and Eritrea.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
      </head>
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <TranslationProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
              <BackToTop />
            </div>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'