"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ArrowUp, MessageCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// Types
interface Doctor {
  name: string
  email: string
}

interface PhoneContact {
  label: string
  number: string
  type: 'phone' | 'whatsapp' | 'emergency'
}

interface Location {
  name: string
  address: string
  days: string
  link: string
}

interface QuickLink {
  name: string
  href: string
}

interface SocialMedia {
  icon: typeof Facebook | typeof Instagram
  href: string
  label: string
}

interface FooterConfig {
  doctor: Doctor
  phoneContacts: PhoneContact[]
  locations: Location[]
  services: string[]
  quickLinks: QuickLink[]
  socialMedia: SocialMedia[]
}

// Constants
const FOOTER_CONFIG: FooterConfig = {
  doctor: {
    name: "Dr. Gil Bocardo",
    email: "contacto@ortopediagilbocardo.com"
  },
  phoneContacts: [
    { label: "Hospital San José Satélite", number: "5555728930", type: "phone" },
    { label: "Hospital San Ángel Inn Satélite", number: "5516754809", type: "phone" },
    { label: "WhatsApp", number: "5591883839", type: "whatsapp" },
    { label: "Urgencias", number: "5523431295", type: "emergency" }
  ],
  locations: [
    {
      name: "Consultorio San José Satélite",
      address: "Circuito Circunvalación Pte. 53",
      days: "Martes y jueves",
      link: "/contacto#san-jose"
    },
    {
      name: "Consultorio San Ángel Inn - Samará Satélite",
      address: "Circuito Centro Comercial No. 20",
      days: "Lunes, miércoles y viernes",
      link: "/contacto#san-angel"
    }
  ],
  services: [
    "Cirugía Ortopédica",
    "Medicina Deportiva",
    "Artroscopia",
    "Traumatología",
    "Rehabilitación"
  ],
  quickLinks: [
    { name: "Inicio", href: "/" },
    { name: "Sobre Mí", href: "#sobre-mi" },
    { name: "Blog", href: "/blog" },
    { name: "Contacto", href: "/contacto" },
    { name: "Agendar Cita", href: "/citas" }
  ],
  socialMedia: [
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/people/Ortho-Trauma-DGil/100064437921918/", 
      label: "Facebook" 
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/ortopediagilbocardo/", 
      label: "Instagram" 
    }
  ]
}

const HOURS_INFO = [
  { icon: Clock, text: "Lun-Vie: 17:00-20:00" },
  { icon: Clock, text: "2 consultorios disponibles" },
  { icon: Clock, text: "Urgencias: 24/7" }
]

// Utility functions
const getPhoneHref = (type: string, number: string) => 
  type === 'whatsapp' ? `https://wa.me/52${number}` : `tel:${number}`

// Shared Components
const MotionDiv = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
)

const SectionTitle = ({ icon: Icon, title, className = "" }: {
  icon?: React.ComponentType<any>
  title: string
  className?: string
}) => (
  <div className={`flex items-center space-x-2 mb-4 ${className}`}>
    {Icon && <Icon className="h-5 w-5" style={{ color: "var(--medical-light)" }} />}
    <h3 className="text-lg font-semibold text-white">{title}</h3>
  </div>
)

const VerticalSeparator = () => (
  <div className="hidden lg:block absolute right-0 top-4 bottom-4 w-px">
    <div className="h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
  </div>
)

const ListItem = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li className="flex items-center space-x-2">
    <span className="text-gray-400">•</span>
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 text-sm break-words min-w-0"
    >
      {children}
    </Link>
  </li>
)

// Main Components
const DoctorHeader = ({ doctorName }: { doctorName: string }) => (
  <MotionDiv className="col-span-full mb-2">
    <h2 className="text-3xl font-serif font-bold text-left break-words" style={{ color: "var(--medical-light)" }}>
      {doctorName}
    </h2>
  </MotionDiv>
)

const ContactSection = ({ phoneContacts, email }: { 
  phoneContacts: PhoneContact[]
  email: string
}) => (
  <MotionDiv delay={0.1} className="relative w-full min-w-0">
    <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
    
    {/* Teléfonos - sin subtítulo ni iconos individuales */}
    <div className="mb-4">
      <div className="space-y-2">
        {phoneContacts.map((contact, index) => {
          const getNumberColor = () => {
            switch (contact.type) {
              case 'whatsapp': return 'text-green-400 hover:text-green-300'
              case 'emergency': return 'text-red-400 hover:text-red-300'
              default: return 'text-white hover:text-gray-300'
            }
          }

          return (
            <div key={index}>
              <p className="text-gray-300 text-xs truncate">{contact.label}</p>
              <Link 
                href={getPhoneHref(contact.type, contact.number)}
                className={`${getNumberColor()} text-sm transition-colors block`}
              >
                {contact.number}
              </Link>
            </div>
          )
        })}
      </div>
    </div>

    {/* Email - con label como los teléfonos */}
    <div>
      <p className="text-gray-300 text-xs">Email</p>
      <Link 
        href={`mailto:${email}`} 
        className="text-gray-300 hover:text-white transition-colors text-sm block break-all leading-relaxed"
      >
        {email}
      </Link>
    </div>

    <VerticalSeparator />
  </MotionDiv>
)

const ServicesSection = ({ services }: { services: string[] }) => (
  <MotionDiv delay={0.2} className="relative w-full min-w-0">
    <h3 className="text-lg font-semibold mb-4 text-white">Servicios</h3>
    <ul className="space-y-2">
      {services.map((service, index) => (
        <ListItem key={index} href="#servicios">{service}</ListItem>
      ))}
    </ul>
    <VerticalSeparator />
  </MotionDiv>
)

const QuickLinksSection = ({ links }: { links: QuickLink[] }) => (
  <MotionDiv delay={0.3} className="relative w-full min-w-0">
    <h3 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <ListItem key={index} href={link.href}>{link.name}</ListItem>
      ))}
    </ul>
    <VerticalSeparator />
  </MotionDiv>
)

const HoursAndSocialSection = ({ socialMedia }: { socialMedia: SocialMedia[] }) => (
  <MotionDiv delay={0.4} className="w-full min-w-0">
    {/* Horarios */}
    <div className="mb-6">
      <SectionTitle icon={Clock} title="Horarios" />
      <div className="space-y-3">
        {HOURS_INFO.map((hour, index) => (
          <div key={index} className="flex items-center space-x-3">
            <hour.icon className="h-4 w-4 flex-shrink-0" style={{ color: "var(--medical-light)" }} />
            <span className="text-gray-300 text-sm">{hour.text}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Redes sociales */}
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white">Síguenos</h3>
      <div className="flex space-x-4">
        {socialMedia.map((social, index) => (
          <Link
            key={index}
            href={social.href}
            className="transition-all duration-300 hover:scale-110 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/10"
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            <social.icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
    </div>
  </MotionDiv>
)

const GradientSeparator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="col-span-full my-4"
  >
    <div className="relative h-px">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
    </div>
  </motion.div>
)

const LocationsSection = ({ locations }: { locations: Location[] }) => (
  <MotionDiv delay={0.6} className="col-span-full">
    <h3 className="text-lg font-semibold mb-6 text-white text-center">Ubicaciones</h3>
    <div className="grid md:grid-cols-2 gap-4">
      {locations.map((location, index) => (
        <Link 
          key={index} 
          href={location.link}
          className="text-center block transition-all duration-300 hover:scale-105 hover:bg-white/5 p-4 rounded-lg"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <MapPin className="h-5 w-5 flex-shrink-0" style={{ color: "var(--medical-light)" }} />
            <h4 className="text-white font-medium text-lg break-words">{location.name}</h4>
          </div>
          <p className="text-gray-300 text-sm mb-2 break-words">{location.address}</p>
          <p className="text-gray-400 text-xs">{location.days}</p>
        </Link>
      ))}
    </div>
  </MotionDiv>
)

const FooterBottom = () => (
  <MotionDiv delay={0.7} className="col-span-full border-t border-white/20 mt-4 pt-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <p className="text-gray-300 text-sm mb-3 md:mb-0 max-w-md break-words">
        Protegemos su privacidad y datos personales conforme a la normativa vigente.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link href="/terminos-servicio" className="text-gray-300 hover:text-white text-sm transition-colors break-words">
          Términos de Servicio
        </Link>
        <Link href="/politica-privacidad" className="text-gray-300 hover:text-white text-sm transition-colors break-words">
          Política de Privacidad
        </Link>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <p className="text-gray-400 text-sm mb-2 md:mb-0 break-words">
        by{" "}
        <span className="text-red-500 hover:text-sky-400 transition-colors cursor-pointer font-medium">
          team 3
        </span>
      </p>
      <p className="text-gray-400 text-sm">
        © 2025 Dr. Gil Bocardo. Todos los derechos reservados.
      </p>
    </div>
  </MotionDiv>
)

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      if (typeof window === 'undefined') return
      
      const shouldShow = window.pageYOffset > 300
      setShowButton(shouldShow)
      setIsScrolling(true)
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => setIsScrolling(false), 2000)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
        clearTimeout(scrollTimeout)
      }
    }
  }, [])
  
  const scrollToTop = () => {
    window?.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!showButton || !isScrolling) return null

  return (
    <motion.button 
      onClick={scrollToTop} 
      className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
      style={{ backgroundColor: "var(--medical-white)", color: "var(--medical-primary)" }}
      whileHover={{ y: -2 }} 
      whileTap={{ scale: 0.95 }}
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  )
}

// Main Component
export default function Footer() {
  return (
    <footer 
      style={{ backgroundColor: "var(--medical-primary)" }} 
      className="text-white relative overflow-hidden"
    >
      <ScrollToTopButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4 w-full">
          <DoctorHeader doctorName={FOOTER_CONFIG.doctor.name} />
          
          <ContactSection 
            phoneContacts={FOOTER_CONFIG.phoneContacts}
            email={FOOTER_CONFIG.doctor.email}
          />
          <ServicesSection services={FOOTER_CONFIG.services} />
          <QuickLinksSection links={FOOTER_CONFIG.quickLinks} />
          <HoursAndSocialSection socialMedia={FOOTER_CONFIG.socialMedia} />
          
          <GradientSeparator />
          
          <LocationsSection locations={FOOTER_CONFIG.locations} />
          
          <FooterBottom />
        </div>
      </div>
    </footer>
  )
}