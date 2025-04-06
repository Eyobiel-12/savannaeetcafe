"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Phone, ChevronDown } from "lucide-react"
import FeaturedDishes from "@/components/featured-dishes"
import TestimonialSlider from "@/components/testimonial-slider"
import ImageWithFallback from "@/components/image-with-fallback"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n"

export default function Home() {
  const { t } = useTranslation()
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 z-10" />
        {/* Replace LazyVideo with a static background image for reliability */}
        <div className="absolute inset-0">
          <Image
            src="/images/interior/restaurant-1.jpg"
            alt="Habesha Savanna restaurant interior"
            fill
            className="object-cover scale-105 origin-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[url('/images/overlay-pattern.png')] opacity-20 z-10 mix-blend-overlay" />
        <div className="relative z-20 container-luxe h-full flex flex-col items-center justify-center text-center">
          <div className="animate-fade-in">
            <ImageWithFallback
              src="/images/logo.png"
              fallbackSrc="/placeholder.svg?height=200&width=200"
              alt="Habesha Savanna Eetcafé Logo"
              width={200}
              height={200}
              className="mx-auto mb-10"
              priority
            />
          </div>
          <h1 className="text-white mb-6 animate-slide-up max-w-4xl">
            <span className="block mb-2">{t('home.hero.title')}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
              {t('home.hero.subtitle')}
            </span>
          </h1>
          <p
            className="text-white/90 text-lg md:text-xl max-w-2xl mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t('home.hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-900 hover:to-amber-800 text-white border-0 py-7 px-8 text-base uppercase tracking-wider luxury-hover-glow"
            >
              <Link href="/reservation">{t('home.hero.reserveButton')}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-Black hover:bg-white hover:text-amber-900 py-7 px-8 text-base uppercase tracking-wider"
            >
              <Link href="/menu">{t('home.hero.exploreMenu')}</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center">
          <a
            href="#about"
            aria-label="Scroll down"
            className="flex flex-col items-center text-white hover:text-amber-300 transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-2">{t('home.discover')}</span>
            <ChevronDown className="h-6 w-6 animate-bounce" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gradient-to-b from-amber-50/60 to-white">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-amber-700 z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-amber-700 z-0"></div>
                <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
                  <ImageWithFallback
                    src="/images/interior/restaurant-2.jpg"
                    fallbackSrc="/placeholder.svg?height=400&width=600"
                    alt="Habesha Savanna Interior"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -right-4 -bottom-4 bg-amber-800 text-white py-3 px-6 rounded-sm z-20">
                  <p className="font-cormorant text-xl">Est. 2010</p>
                </div>
              </div>
            </div>
            <div>
              <span className="text-amber-800 text-sm uppercase tracking-widest">{t('home.about.heritage')}</span>
              <h2 className="heading-lg mb-6 mt-2">
                <span className="text-amber-900">{t('home.about.discoverTitle')}</span> {t('home.about.discoverSubtitle')}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-800 to-amber-600 mb-8"></div>
              <p className="text-body mb-6 text-gray-700">
                {t('home.about.paragraph1')}
              </p>
              <p className="text-body mb-8 text-gray-700">
                {t('home.about.paragraph2')}
              </p>
              <Button
                asChild
                className="bg-transparent hover:bg-transparent text-amber-800 hover:text-amber-900 border-b-2 border-amber-800 hover:border-amber-900 rounded-none px-0 py-2 font-medium group"
              >
                <Link href="/about" className="flex items-center">
                  {t('home.about.learnMore')}
                  <span className="ml-2 transform transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <FeaturedDishes />

      {/* Dining Experience */}
      <section className="section-padding bg-amber-950 text-white">
        <div className="container-luxe">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm uppercase tracking-widest block mb-2">{t('home.dining.subtitle')}</span>
            <h2 className="heading-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300">
              {t('home.dining.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto mb-6"></div>
            <p className="text-lg max-w-3xl mx-auto text-amber-100/90">
              {t('home.dining.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: t("features.coffeeCeremony.title"),
                description: t("features.coffeeCeremony.description"),
              },
              {
                icon: Calendar,
                title: t("features.privateDining.title"),
                description: t("features.privateDining.description"),
              },
              {
                icon: MapPin,
                title: t("features.terrace.title"),
                description: t("features.terrace.description"),
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-amber-900/40 to-amber-950/40 p-10 rounded-lg hover:from-amber-900/60 hover:to-amber-950/60 transition-colors duration-300 border border-amber-800/30 relative overflow-hidden group luxury-hover-lift"
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-800/10 rounded-full group-hover:bg-amber-800/20 transition-colors duration-300"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <feature.icon className="h-8 w-8 text-amber-200" />
                </div>
                <h3 className="heading-sm mb-4 text-center">{feature.title}</h3>
                <p className="text-amber-100/80 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialSlider />

      {/* Reservation CTA */}
      <section className="section-padding bg-gradient-to-b from-white to-amber-50/60">
        <div className="container-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-800 text-sm uppercase tracking-widest">{t('home.reservation.subtitle')}</span>
              <h2 className="heading-lg mb-6 mt-2">
                <span className="text-amber-900">{t('home.reservation.title')}</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-800 to-amber-600 mb-8"></div>
              <p className="text-body mb-6 text-gray-700">
                {t('home.reservation.description')}
              </p>
              <ul className="space-y-6 mb-8">
                {[
                  { icon: Phone, title: t('home.reservation.callUs'), content: "+31 20 123 4567" },
                  {
                    icon: Clock,
                    title: t('home.reservation.openingHours'),
                    content: (
                      <>
                        <span className="font-medium">{t('home.reservation.lunch')}:</span> 12:00 - 15:00
                        <br />
                        <span className="font-medium">{t('home.reservation.dinner')}:</span> 18:00 - 22:30
                      </>
                    ),
                  },
                  {
                    icon: Calendar,
                    title: t('home.reservation.reservations'),
                    content: t('home.reservation.recommendedAdvance'),
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 shadow-sm">
                      <item.icon className="h-5 w-5 text-amber-800" />
                    </div>
                    <div>
                      <span className="font-medium text-amber-900 block mb-1">{item.title}:</span>
                      <div className="text-gray-700">{item.content}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Button asChild className="luxury-button px-8 py-3 text-base">
                <Link href="/reservation">{t('home.reservation.buttonText')}</Link>
              </Button>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-32 h-32 border-l-2 border-t-2 border-amber-700 z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r-2 border-b-2 border-amber-700 z-0"></div>
                <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
                  <ImageWithFallback
                    src="/images/food/food-4.jpg"
                    fallbackSrc="/placeholder.svg?height=400&width=600"
                    alt="Dining Experience"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="relative h-[60vh]">
        <iframe
          key="google-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5344886243967!2d4.8899863!3d52.3702157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDIyJzEyLjkiTiA0wrA1Myc0OC4wIkU!5e0!3m2!1sen!2snl!4v1617289345678!5m2!1sen!2snl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
          className="absolute inset-0"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 text-white">
          <div className="container-luxe">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="heading-md mb-2">{t('home.location.title')}</h3>
                <p className="text-white/80">{t('home.location.address')}</p>
              </div>
              <Button
                asChild
                className="bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-900 hover:to-amber-800 text-white luxury-hover-glow"
              >
                <a
                  href="https://maps.app.goo.gl/JyD8qQWNWkLVms1p9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  {t('home.location.getDirections')}
                  <span className="ml-2">→</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

