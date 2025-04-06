import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Star } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-amber-950 text-amber-100 border-t border-amber-800/30">
      <div className="container-luxe py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image src="/images/logo.png" alt="Habesha Savanna Eetcafé Logo" width={64} height={64} />
              <div className="flex flex-col">
                <span className="font-cormorant font-medium text-2xl text-white luxury-gold-text">Habesha Savanna</span>
                <span className="text-xs uppercase tracking-widest text-amber-400">Eetcafé</span>
              </div>
            </Link>
            <p className="text-amber-200/80 mb-6">
              Experience authentic Ethiopian and Eritrean cuisine in an elegant setting that celebrates the rich culinary heritage of
              Ethiopia and Eritrea with modern sophistication.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, url: "https://facebook.com", label: "Facebook" },
                { icon: Instagram, url: "https://www.instagram.com/savanna2512cs?igsh=MWNkZXM2aGl5eTI1cA==", label: "Instagram" },
                { 
                  icon: (props) => (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={props.className}
                    >
                      <path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0 -6 0"></path>
                      <path d="M16.5 7.5v.001"></path>
                      <path d="M20.5 5a.5 .5 0 0 0 -.5 -.5h-16a.5 .5 0 0 0 -.5 .5v14c0 .276 .224 .5 .5 .5h16a.5 .5 0 0 0 .5 -.5v-14z"></path>
                    </svg>
                  ), 
                  url: "https://www.tiktok.com/@sofiasium?_t=ZN-8vI2E0YLwPe&_r=1", 
                  label: "TikTok" 
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-white transition-colors bg-amber-900/50 p-2 rounded-full hover:bg-amber-800/50"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-cormorant text-xl text-white mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-amber-500 after:-mb-2">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", url: "/" },
                { label: "Menu", url: "/menu" },
                { label: "About Us", url: "/about" },
                { label: "Gallery", url: "/gallery" },
                { label: "Contact", url: "/contact" },
                { label: "Reservation", url: "/reservation" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.url}
                    className="text-amber-200/80 hover:text-white transition-colors text-sm uppercase tracking-wider flex items-center group"
                  >
                    <span className="w-0 h-px bg-amber-400 mr-0 opacity-0 group-hover:w-3 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-cormorant text-xl text-white mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-amber-500 after:-mb-2">
              Opening Hours
            </h3>
            <ul className="space-y-3">
              <li className="text-amber-200/80 text-sm">
                <span className="text-amber-400 uppercase tracking-wider">Lunch</span>
                <br />
                Monday - Sunday: 12:00 - 15:00
              </li>
              <li className="text-amber-200/80 text-sm">
                <span className="text-amber-400 uppercase tracking-wider">Dinner</span>
                <br />
                Monday - Thursday: 18:00 - 22:30
                <br />
                Friday - Saturday: 18:00 - 23:30
                <br />
                Sunday: 18:00 - 22:00
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-cormorant text-xl text-white mb-6 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-amber-500 after:-mb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-amber-900/50 p-2 rounded-full mt-0.5">
                  <MapPin className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-200/80 text-sm">
                    123 Restaurant Street
                    <br />
                    Amsterdam, Netherlands
                  </p>
                  <a
                    href="https://maps.app.goo.gl/JyD8qQWNWkLVms1p9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-white transition-colors text-sm inline-flex items-center mt-1"
                  >
                    View on Google Maps
                    <span className="ml-1 transform transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-amber-900/50 p-2 rounded-full">
                  <Phone className="h-4 w-4 text-amber-400" />
                </div>
                <a href="tel:+31201234567" className="text-amber-200/80 hover:text-white transition-colors text-sm">
                  +31 20 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-amber-900/50 p-2 rounded-full">
                  <Mail className="h-4 w-4 text-amber-400" />
                </div>
                <a
                  href="mailto:savanna2512@outlook.com" 
                  className="text-amber-200/80 hover:text-white transition-colors text-sm"
                >
                  savanna2512@outlook.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="luxury-divider mt-12 mb-8">
          <Star className="h-4 w-4 text-amber-500 luxury-divider-icon" />
        </div>

        <div className="text-center">
          <p className="text-amber-200/60 text-sm">
            &copy; {new Date().getFullYear()} Habesha Savanna Eetcafé. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

