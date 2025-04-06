"use client"

import Image from "next/image"
import { Award, Clock, Users, Utensils } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  const { t } = useTranslation()
  
  return (
    <main className="pt-20 pb-16">
      <section className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image src="/images/interior/restaurant-1.jpg" alt="About Us" fill className="object-cover" sizes="100vw" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('about.pageTitle')}</h1>
          <p className="text-xl text-white max-w-2xl">
            {t('about.pageDescription')}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-amber-900">{t('about.ourStory.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('about.ourStory.paragraph1')}
              </p>
              <p className="text-gray-700 mb-4">
                {t('about.ourStory.paragraph2')}
              </p>
              <p className="text-gray-700">
                {t('about.ourStory.paragraph3')}
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/interior/restaurant-2.jpg"
                  alt="Restaurant Founder"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-amber-900">{t('about.ourFood.title')}</h2>
              <p className="text-gray-700 mb-4">
                {t('about.ourFood.paragraph1')}
              </p>
              <p className="text-gray-700 mb-4">
                {t('about.ourFood.paragraph2')}
              </p>
              <p className="text-gray-700">
                {t('about.ourFood.paragraph3')}
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 w-full rounded-lg overflow-hidden">
                <Image
                  src="/images/food/food-3.jpg"
                  alt="Ethiopian Food Platter"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <Award className="h-10 w-10 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-amber-900 mb-2">{t('about.values.quality.title')}</h3>
              <p className="text-gray-700">
                {t('about.values.quality.description')}
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <Utensils className="h-10 w-10 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-amber-900 mb-2">{t('about.values.authenticity.title')}</h3>
              <p className="text-gray-700">
                {t('about.values.authenticity.description')}
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <Users className="h-10 w-10 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-amber-900 mb-2">{t('about.values.community.title')}</h3>
              <p className="text-gray-700">{t('about.values.community.description')}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg text-center">
              <Clock className="h-10 w-10 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-amber-900 mb-2">{t('about.values.experience.title')}</h3>
              <p className="text-gray-700">
                {t('about.values.experience.description')}
              </p>
            </div>
          </div>

          <div className="bg-amber-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-amber-900 text-center">{t('about.visitUs.title')}</h2>
            <p className="text-gray-700 text-center mb-6">
              {t('about.visitUs.description')}
            </p>
            <div className="aspect-video relative rounded-lg overflow-hidden mb-6">
              <iframe
                key="about-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.5344886243967!2d4.8899863!3d52.3702157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDIyJzEyLjkiTiA0wrA1Myc0OC4wIkU!5e0!3m2!1sen!2snl!4v1617289345678!5m2!1sen!2snl"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
            <div className="text-center">
              <Button asChild className="bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-900 hover:to-amber-800 text-white border-0 py-3 px-6 text-base">
                <Link href="/reservation">{t('nav.reserveTable')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

