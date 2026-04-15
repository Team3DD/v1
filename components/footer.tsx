"use client"

import Link from "next/link"
import { MapPin, Clock, Facebook, Instagram, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

// Types
interface Doctor {
  name: string
  email: string
}

interface Location {
  name: string
  address: string
  days: string
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
  locations: [
    {
      name: "Consultorio San José Satélite",
      address: "Circuito Circunvalación Pte. 53",
      days: "Martes y jueves"
    },
    {
      name: "Consultorio San Ángel Inn - Samará Satélite",
      address: "Circuito Centro Comercial No. 20",
      days: "Lunes, miércoles y viernes"
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

// Horarios: array con texto y destino (opcional)
const HOURS_ITEMS = [
  { text: "Lun-Vie: 09:00-18:00", href: "/citas" },
  { text: "Sábados: 09:00-14:00", href: "/citas" },
  { text: "2 consultorios disponibles", href: "/citas" },
  { text: "Urgencias: 24/7", href: "whatsapp" } // especial
]

// Hook personalizado para el saludo y URL de WhatsApp
const useGreeting = () => {
  const [greeting, setGreeting] = useState<string>("")

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date()
      const mexicoTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Mexico_City" }))
      const hours = mexicoTime.getHours()
      if (hours >= 6 && hours < 12) return "Buenos días"
      if (hours >= 12 && hours < 19) return "Buenas tardes"
      return "Buenas noches"
    }
    setGreeting(getGreeting())
  }, [])

  const getWhatsAppUrl = () => {
    const message = `${greeting}, Dr. Gil Bocardo, tengo una emergencia, espero me pueda atender.`
    return `https://wa.me/525523431295?text=${encodeURIComponent(message)}`
  }

  return { getWhatsAppUrl }
}

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

// CORRECCIÓN: icon es opcional, no se pasa null
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

const ListItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
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

// Componente para cada fila de horario (ícono + contenido)
const ClockItem = ({ text, href, isWhatsApp = false }: { text: string; href?: string; isWhatsApp?: boolean }) => {
  const { getWhatsAppUrl } = useGreeting()
  const finalHref = isWhatsApp ? getWhatsAppUrl() : href

  const content = (
    <div className="flex items-center space-x-3">
      <Clock className="h-4 w-4 flex-shrink-0" style={{ color: "var(--medical-light)" }} />
      {finalHref ? (
        isWhatsApp ? (
          <a
            href={finalHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 text-sm transition-colors duration-200 hover:text-red-500"
          >
            {text}
          </a>
        ) : (
          <Link
            href={finalHref}
            className="text-gray-300 text-sm transition-colors duration-200 hover:text-[var(--medical-light)]"
          >
            {text}
          </Link>
        )
      ) : (
        <span className="text-gray-300 text-sm">{text}</span>
      )}
    </div>
  )

  return content
}

// Main Components
const DoctorHeader = ({ doctorName }: { doctorName: string }) => (
  <MotionDiv className="col-span-full mb-2">
    <h2 className="text-3xl font-serif font-bold text-left break-words" style={{ color: "var(--medical-light)" }}>
      {doctorName}
    </h2>
  </MotionDiv>
)

// Sección de contacto: botones (Agendar cita, Urgencias) y email
const ContactSection = ({ email }: { email: string }) => {
  const { getWhatsAppUrl } = useGreeting()

  return (
    <MotionDiv delay={0.1} className="relative w-full min-w-0">
      <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
      <div className="flex flex-col gap-5">
        <Link href="/citas">
          <button
            className="px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-center min-w-[140px] bg-[var(--background)]/80 hover:bg-[var(--background)]"
            style={{ color: "var(--medical-primary)" }}
          >
            Agendar cita
          </button>
        </Link>
        <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
          <button
            className="px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 text-center min-w-[140px] bg-[var(--destructive)]/80 hover:bg-[var(--destructive)] text-white/90"
          >
            Urgencias
          </button>
        </a>
        <div>
          <p className="text-gray-300 text-xs">Email</p>
          <Link
            href={`mailto:${email}`}
            className="text-gray-300 hover:text-white transition-colors text-sm block break-all leading-relaxed"
          >
            {email}
          </Link>
        </div>
      </div>
      <VerticalSeparator />
    </MotionDiv>
  )
}

// CORRECCIÓN: no pasar icon={null}, simplemente omitir la prop
const ServicesSection = ({ services }: { services: string[] }) => (
  <MotionDiv delay={0.2} className="relative w-full min-w-0">
    <SectionTitle title="Servicios" />
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
    <SectionTitle title="Enlaces Rápidos" />
    <ul className="space-y-2">
      {links.map((link, index) => (
        <ListItem key={index} href={link.href}>{link.name}</ListItem>
      ))}
    </ul>
    <VerticalSeparator />
  </MotionDiv>
)

// Horarios y Redes Sociales
const HoursAndSocialSection = ({ socialMedia }: { socialMedia: SocialMedia[] }) => (
  <MotionDiv delay={0.4} className="w-full min-w-0">
    <div className="mb-6">
      <SectionTitle icon={Clock} title="Horarios" />
      <div className="space-y-3">
        {HOURS_ITEMS.map((item, idx) => (
          <ClockItem
            key={idx}
            text={item.text}
            href={item.href === "whatsapp" ? undefined : item.href}
            isWhatsApp={item.href === "whatsapp"}
          />
        ))}
      </div>
    </div>
    <div>
      <SectionTitle title="Síguenos" />
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

// LocationsSection: todos los enlaces a /citas
const LocationsSection = ({ locations }: { locations: Location[] }) => (
  <MotionDiv delay={0.6} className="col-span-full">
    <h3 className="text-lg font-semibold mb-6 text-white text-center">Ubicaciones</h3>
    <div className="grid md:grid-cols-2 gap-4">
      {locations.map((location, index) => (
        <Link
          key={index}
          href="/citas"
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

// FooterBottom con año dinámico y créditos DAUC
const FooterBottom = () => {
  const currentYear = new Date().getFullYear()
  return (
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
          Design & Development by{" "}
          <span className="text-sky-400 hover:text-white transition-colors cursor-pointer font-medium">
            DAUC
          </span>
        </p>
        <p className="text-gray-400 text-sm">
          © {currentYear} Dr. Gil Bocardo. Todos los derechos reservados.
        </p>
      </div>
    </MotionDiv>
  )
}

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300
      setShowButton(shouldShow)
      setIsScrolling(true)
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => setIsScrolling(false), 2000)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])
  
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
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
    <footer style={{ backgroundColor: "var(--medical-primary)" }} className="text-white relative overflow-hidden">
      <ScrollToTopButton />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4 w-full">
          <DoctorHeader doctorName={FOOTER_CONFIG.doctor.name} />
          <ContactSection email={FOOTER_CONFIG.doctor.email} />
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