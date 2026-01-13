"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Users, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import LoadingSpinner from "@/components/loading-spinner"
import { useTranslation } from "@/lib/i18n"

// Define global EmailJS type for TypeScript
declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, templateParams: any) => Promise<any>;
    }
  }
}

type FormErrors = {
  [key: string]: string
}

type FormData = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  occasion: string
  message: string
}

export default function ReservationForm() {
  const { toast } = useToast()
  const { t } = useTranslation()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    message: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [availableTimes, setAvailableTimes] = useState<string[]>([])

  // Generate available times based on date selection (lunch or dinner service)
  useEffect(() => {
    if (!formData.date) return

    const date = new Date(formData.date)
    const day = date.getDay() // 0 = Sunday, 6 = Saturday

    // Generate lunch times (same for all days)
    const lunchTimes = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"]

    // Generate dinner times (different for weekends)
    let dinnerTimes = []
    if (day === 5 || day === 6) {
      // Friday or Saturday
      dinnerTimes = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00"]
    } else {
      dinnerTimes = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"]
    }

    setAvailableTimes([...lunchTimes, ...dinnerTimes])

    // Clear time selection if already selected
    if (formData.time) {
      setFormData((prev) => ({ ...prev, time: "" }))
    }
  }, [formData.date])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Required fields
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.date) newErrors.date = "Date is required"
    if (!formData.time) newErrors.time = "Time is required"
    if (!formData.guests) newErrors.guests = "Number of guests is required"

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Date validation
    if (formData.date) {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.date = "Please select a future date"
      }

      // Prevent reservations more than 3 months in advance
      const threeMonthsFromNow = new Date()
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3)

      if (selectedDate > threeMonthsFromNow) {
        newErrors.date = "Reservations can only be made up to 3 months in advance"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Please check your information",
        description: "There are some errors in your reservation details.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Send email using EmailJS
      // Note: Make sure your EmailJS template (template_38d2vsb) has these variables:
      // {{name}}, {{email}}, {{phone}}, {{date}}, {{time}}, {{guests}}, {{occasion}}, {{message}}
      // Format guests value for better display
      const guestsDisplay = formData.guests === 'more' 
        ? 'More than 8 (Call for availability)' 
        : `${formData.guests} ${formData.guests === '1' ? 'Guest' : 'Guests'}`
      
      const emailParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        guests: guestsDisplay,
        aantal: formData.guests, // Also send as 'aantal' for Dutch template compatibility
        occasion: formData.occasion || 'Not specified',
        message: formData.message || 'No additional message',
      }
      
      console.log('Sending reservation with guests:', formData.guests, 'Display:', guestsDisplay)

      // Initialize EmailJS with your public key
      window.emailjs.init("8F_ErQkIrFhGbcxv-")
      
      // Send the email
      const response = await window.emailjs.send(
        "service_jevfu7s",  // Service ID
        "template_38d2vsb", // Template ID
        emailParams
      )

      console.log('Email sent successfully:', response)

      // Success handling
      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        occasion: "",
        message: "",
      })

      toast({
        title: t('reservation.formSuccess'),
        description: t('reservation.formSuccessDescription'),
        variant: "default",
      })

      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error('Error sending email:', error)
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly by phone.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate minimum date (today)
  const today = new Date().toISOString().split("T")[0]

  // Calculate maximum date (3 months from now)
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateString = maxDate.toISOString().split("T")[0]

  return (
    <div className="relative">
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-green-50 to-amber-50 border border-green-200 text-green-800 px-6 py-4 rounded-md mb-6 flex items-start"
          >
            <div className="bg-green-100 p-2 rounded-full mr-3 mt-0.5">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium">{t('reservation.formSuccess')}</p>
              <p className="text-sm text-green-700 mt-1">
                {t('reservation.formSuccessDescription')}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                onClick={() => setIsSuccess(false)}
              >
                {t('reservation.makeAnother')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isSuccess && (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md border border-amber-200/30"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium text-amber-900">
                {t('reservation.form.name')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 text-amber-500">
                  <User className="h-5 w-5 opacity-70" />
                </div>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`pl-10 py-3 border-amber-200 focus:border-amber-500 focus:ring-amber-500 ${
                    errors.name ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium text-amber-900">
                {t('reservation.form.email')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 text-amber-500">
                  <Mail className="h-5 w-5 opacity-70" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="savanna2512@outlook.com"
                  className={`pl-10 py-3 border-amber-200 focus:border-amber-500 focus:ring-amber-500 ${
                    errors.email ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium text-amber-900">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 text-amber-500">
                  <Phone className="h-5 w-5 opacity-70" />
                </div>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+31 6 12345678"
                  className={`pl-10 py-3 border-amber-200 focus:border-amber-500 focus:ring-amber-500 ${
                    errors.phone ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="font-medium text-amber-900">
                {t('reservation.form.guests')} <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 text-amber-500 z-10">
                  <Users className="h-5 w-5 opacity-70" />
                </div>
                <Select value={formData.guests} onValueChange={(value) => handleSelectChange("guests", value)}>
                  <SelectTrigger
                    id="guests"
                    className={`w-full pl-10 py-6 border-amber-200 ${
                      errors.guests ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder={t('reservation.form.guests')} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-amber-200">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? t('reservation.form.guestSingular') : t('reservation.form.guestPlural')}
                      </SelectItem>
                    ))}
                    <SelectItem value="more">{t('reservation.form.moreThan8')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.guests && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.guests}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="font-medium text-amber-900">
                Date <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 text-amber-500">
                  <Calendar className="h-5 w-5 opacity-70" />
                </div>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  min={today}
                  max={maxDateString}
                  value={formData.date}
                  onChange={handleChange}
                  className={`pl-10 py-3 border-amber-200 focus:border-amber-500 focus:ring-amber-500 ${
                    errors.date ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {errors.date && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.date}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="font-medium text-amber-900">
                Time <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 text-amber-500 z-10">
                  <Clock className="h-5 w-5 opacity-70" />
                </div>
                <Select
                  value={formData.time}
                  onValueChange={(value) => handleSelectChange("time", value)}
                  disabled={!formData.date}
                >
                  <SelectTrigger
                    id="time"
                    className={`w-full pl-10 py-6 border-amber-200 ${
                      errors.time ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder={formData.date ? "Select time" : "Please select a date first"} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-amber-200 max-h-[300px]">
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.time}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="occasion" className="font-medium text-amber-900">
                Occasion (Optional)
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-2.5 text-amber-500 z-10">
                  <Calendar className="h-5 w-5 opacity-70" />
                </div>
                <Select value={formData.occasion} onValueChange={(value) => handleSelectChange("occasion", value)}>
                  <SelectTrigger id="occasion" className="w-full pl-10 py-6 border-amber-200">
                    <SelectValue placeholder="Select occasion (if applicable)" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-amber-200">
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="business">Business Meal</SelectItem>
                    <SelectItem value="date">Date Night</SelectItem>
                    <SelectItem value="other">Other Special Occasion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="font-medium text-amber-900">
                Special Requests (Optional)
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-amber-500">
                  <MessageSquare className="h-5 w-5 opacity-70" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any special requests, dietary requirements, or seating preferences?"
                  className="w-full min-h-[120px] px-10 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 border-amber-200 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="luxury-divider">
            <span className="px-4 text-amber-600 text-sm uppercase tracking-wider">Complete Reservation</span>
          </div>

          <div className="bg-amber-50/50 p-4 rounded-md mb-6">
            <p className="text-sm text-amber-800">
              <span className="font-medium">Note:</span> By submitting this reservation request, you acknowledge our
              cancellation policy. We'll send a confirmation email once your reservation is confirmed.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-900 hover:to-amber-800 text-white py-6 font-medium text-base uppercase tracking-wider"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner size={24} className="mr-2" />
                Processing...
              </div>
            ) : (
              t('reservation.form.submit')
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

