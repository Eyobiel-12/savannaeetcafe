"use client"

import ReservationForm from "@/components/reservation-form"
import { Clock, Calendar, Users, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ImageWithFallback from "@/components/image-with-fallback"
import { useTranslation } from "@/lib/i18n"

export default function ReservationPage() {
  const { t } = useTranslation()
  
  return (
    <main className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <ImageWithFallback
          src="/images/interior/restaurant-3.jpg"
          fallbackSrc="/placeholder.svg?height=600&width=1200"
          alt="Make a Reservation"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="relative z-20 container-luxe h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('reservation.pageTitle')}</h1>
          <p className="text-xl text-white max-w-2xl">
            {t('reservation.pageDescription')}
          </p>
        </div>
      </section>

      {/* Reservation Content */}
      <section className="container-luxe py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="heading-lg mb-4">
                <span className="text-amber-900">{t('reservation.bookExperience')}</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-800 to-amber-600 mb-6"></div>
              <p className="text-muted-foreground">
                {t('reservation.formDescription')}
              </p>
            </div>

            <ReservationForm />
          </div>

          {/* Reservation Information */}
          <div className="space-y-8">
            {/* Hours & Availability */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-amber-200/30">
              <h3 className="heading-sm mb-4 text-amber-900">{t('reservation.hoursAvailability')}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium">{t('reservation.lunchService')}</p>
                    <p className="text-muted-foreground">{t('reservation.lunchHours')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium">{t('reservation.dinnerService')}</p>
                    <p className="text-muted-foreground">{t('reservation.dinnerHours1')}</p>
                    <p className="text-muted-foreground">{t('reservation.dinnerHours2')}</p>
                    <p className="text-muted-foreground">{t('reservation.dinnerHours3')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium">{t('reservation.advanceBooking')}</p>
                    <p className="text-muted-foreground">
                      {t('reservation.advanceBookingDesc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium">{t('reservation.groupReservations')}</p>
                    <p className="text-muted-foreground">
                      {t('reservation.groupReservationsDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reservation Policies */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-amber-200/30">
              <h3 className="heading-sm mb-4 text-amber-900">Reservation Policies</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium">Cancellation Policy</p>
                    <p className="text-muted-foreground">
                      We kindly request 24 hours notice for cancellations. Late cancellations or no-shows may incur a
                      fee.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium">Late Arrivals</p>
                    <p className="text-muted-foreground">
                      We hold reservations for 15 minutes past the reserved time. Please call if you're running late.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-700 mt-1" />
                  <div>
                    <p className="font-medium">Special Occasions</p>
                    <p className="text-muted-foreground">
                      Please let us know if you're celebrating a special occasion, and we'll do our best to make it
                      memorable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-amber-200/30">
              <h3 className="heading-sm mb-4 text-amber-900">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">Do you accommodate dietary restrictions?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer a variety of vegetarian and vegan options. Please note any dietary restrictions or
                    allergies in the special requests section of your reservation, and our chef will be happy to
                    accommodate your needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">Is there a dress code?</AccordionTrigger>
                  <AccordionContent>
                    We suggest smart casual attire. While we don't enforce a strict dress code, we appreciate guests who
                    dress to enhance the elegant dining atmosphere.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">Do you have parking available?</AccordionTrigger>
                  <AccordionContent>
                    We offer limited parking behind the restaurant. There is also public parking available within a
                    2-minute walk from our location.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    Can I make special arrangements for a celebration?
                  </AccordionTrigger>
                  <AccordionContent>
                    We offer special arrangements for birthdays, anniversaries, and other celebrations. Please mention
                    your requirements in the special requests section or contact us directly to discuss details.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">Is there a time limit for dining?</AccordionTrigger>
                  <AccordionContent>
                    We typically allocate 2 hours for parties of 2-4 and 2.5 hours for larger groups. If you anticipate
                    needing more time, please let us know when making your reservation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Private Dining */}
      <section className="bg-amber-50/50 py-16">
        <div className="container-luxe">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">
              <span className="text-amber-900">Private</span> Dining
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-800 to-amber-600 mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              For special events and larger gatherings, we offer exclusive private dining experiences with customized
              menus and dedicated service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Savanna Room",
                capacity: "8-12 guests",
                description:
                  "An intimate space with views of our garden, perfect for family gatherings or small business dinners.",
                image: "/images/interior/restaurant-1.jpg",
              },
              {
                title: "The Addis Chamber",
                capacity: "14-20 guests",
                description:
                  "Our elegant mid-sized room featuring traditional Ethiopian décor and a semi-private bar area.",
                image: "/images/interior/restaurant-2.jpg",
              },
              {
                title: "The Ethiopian Terrace",
                capacity: "Up to 30 guests",
                description:
                  "Our stunning outdoor space with retractable roof, perfect for celebrations in all seasons.",
                image: "/images/interior/restaurant-3.jpg",
              },
            ].map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-amber-200/30 luxury-hover-lift"
              >
                <div className="relative h-64">
                  <ImageWithFallback
                    src={room.image || "/placeholder.svg"}
                    fallbackSrc="/placeholder.svg?height=300&width=500"
                    alt={room.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-cormorant font-medium text-amber-900 mb-1">{room.title}</h3>
                  <p className="text-amber-700 font-medium mb-3">{room.capacity}</p>
                  <p className="text-muted-foreground">{room.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="mb-6 text-muted-foreground">
              For private dining inquiries, please contact our events team directly:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              <a
                href="tel:+31684293837"
                className="text-amber-800 hover:text-amber-900 transition-colors flex items-center"
              >
                <Clock className="h-5 w-5 mr-2" /> +31 6 84293837
              </a>
              <span className="hidden sm:inline text-amber-300">•</span>
              <a
                href="mailto:savanna2512@outlook.com"
                className="text-amber-800 hover:text-amber-900 transition-colors"
              >
                savanna2512@outlook.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

