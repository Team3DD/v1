"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ArrowUp, MessageCircle, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

// Definición de tipos
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

// Configuración de datos del footer
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

// Separador vertical
const VerticalSeparator = () => (
  <div className="hidden lg:block absolute right-0 top-4 bottom-4 w-px">
    <div className="h-full bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
  </div>
)

// Componente del nombre del doctor (alineado a la izquierda)
const DoctorHeader = ({ doctorName }: { doctorName: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="col-span-full mb-4"
  >
    <h2 className="text-3xl font-serif font-bold text-left" style={{ color: "var(--medical-light)" }}>
      {doctorName}
    </h2>
  </motion.div>
)

// Componente de contacto
const ContactSection = ({ phoneContacts, email }: { 
  phoneContacts: PhoneContact[]
  email: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 }}
    className="relative"
  >
    <h3 className="text-lg font-semibold mb-4 text-white">Contacto</h3>
    
    {/* Teléfonos */}
    <div className="mb-6">
      <h4 className="text-sm font-medium mb-3 text-white">Teléfonos</h4>
      <div className="space-y-2">
        {phoneContacts.map((contact, index) => (
          <div key={index} className="flex items-center space-x-3">
            {contact.type === 'whatsapp' ? (
              <MessageCircle className="h-4 w-4 flex-shrink-0 text-green-400" />
            ) : contact.type === 'emergency' ? (
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
            ) : (
              <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "var(--medical-light)" }} />
            )}
            <div>
              <p className="text-gray-300 text-xs">{contact.label}</p>
              <Link 
                href={contact.type === 'whatsapp' ? `https://wa.me/52${contact.number}` : `tel:${contact.number}`}
                className="text-white text-sm hover:text-gray-300 transition-colors"
              >
                {contact.number}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Email */}
    <div>
      <h4 className="text-sm font-medium mb-3 text-white">Email</h4>
      <div className="flex items-center space-x-3">
        <Mail className="h-4 w-4 flex-shrink-0" style={{ color: "var(--medical-light)" }} />
        <Link
          href={`mailto:${email}`}
          className="text-gray-300 hover:text-white transition-colors text-sm break-all"
        >
          {email}
        </Link>
      </div>
    </div>

    <VerticalSeparator />
  </motion.div>
)

// Componente de servicios
const ServicesSection = ({ services }: { services: string[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="relative"
  >
    <h3 className="text-lg font-semibold mb-4 text-white">Servicios</h3>
    <ul className="space-y-2">
      {services.map((service, index) => (
        <li key={index} className="flex items-center space-x-2">
          <span className="text-gray-400">•</span>
          <Link
            href="#servicios"
            className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 text-sm"
          >
            {service}
          </Link>
        </li>
      ))}
    </ul>
    <VerticalSeparator />
  </motion.div>
)

// Componente de enlaces rápidos
const QuickLinksSection = ({ links }: { links: QuickLink[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="relative"
  >
    <h3 className="text-lg font-semibold mb-4 text-white">Enlaces Rápidos</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index} className="flex items-center space-x-2">
          <span className="text-gray-400">•</span>
          <Link
            href={link.href}
            className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-1 text-sm"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
    <VerticalSeparator />
  </motion.div>
)

// Componente de horarios y redes sociales
const HoursAndSocialSection = ({ socialMedia }: { socialMedia: SocialMedia[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.4 }}
  >
    {/* Horarios */}
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Horarios</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <Clock className="h-4 w-4 flex-shrink-0" style={{ color: "var(--medical-light)" }} />
          <span className="text-gray-300 text-sm">Lun-Vie: 17:00-20:00</span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="h-4 w-4 flex-shrink-0" style={{ color: "var(--medical-light)" }} />
          <span className="text-gray-300 text-sm">2 consultorios disponibles</span>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="h-4 w-4 flex-shrink-0" style={{ color: "var(--medical-light)" }} />
          <span className="text-gray-300 text-sm">Urgencias: 24/7</span>
        </div>
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
  </motion.div>
)

// Separador degradado horizontal
const GradientSeparator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.5 }}
    className="col-span-full my-8"
  >
    <div className="relative h-px">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
    </div>
  </motion.div>
)

// Componente de ubicaciones
const LocationsSection = ({ locations }: { locations: Location[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.6 }}
    className="col-span-full"
  >
    <h3 className="text-lg font-semibold mb-6 text-white text-center">Ubicaciones</h3>
    <div className="grid md:grid-cols-2 gap-8">
      {locations.map((location, index) => (
        <Link 
          key={index} 
          href={location.link}
          className="text-center block transition-all duration-300 hover:scale-105 hover:bg-white/5 p-4 rounded-lg"
        >
          <div className="flex items-center justify-center space-x-2 mb-3">
            <MapPin className="h-5 w-5" style={{ color: "var(--medical-light)" }} />
            <h4 className="text-white font-medium text-lg">{location.name}</h4>
          </div>
          <p className="text-gray-300 text-sm mb-2">{location.address}</p>
          <p className="text-gray-400 text-xs">{location.days}</p>
        </Link>
      ))}
    </div>
  </motion.div>
)

// Componente del footer bottom
const FooterBottom = () => {
  // Usamos un año fijo para evitar hydration mismatch
  const currentYear = 2025;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="col-span-full border-t border-white/20 mt-8 pt-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <p className="text-gray-300 text-sm mb-3 md:mb-0 max-w-md">
          Protegemos su privacidad y datos personales conforme a la normativa vigente.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/terminos-servicio" className="text-gray-300 hover:text-white text-sm transition-colors">
            Términos de Servicio
          </Link>
          <Link href="/politica-privacidad" className="text-gray-300 hover:text-white text-sm transition-colors">
            Política de Privacidad
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="text-gray-400 text-sm mb-2 md:mb-0">
          © {currentYear} Dr. Gil Bocardo. Todos los derechos reservados.
        </p>
        <p className="text-gray-400 text-sm">
          by{" "}
          <span className="text-red-500 hover:text-sky-400 transition-colors cursor-pointer font-medium">
            team 3
          </span>
        </p>
      </div>
    </motion.div>
  )
}

// Botón scroll to top
const ScrollToTopButton = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <motion.button 
      onClick={scrollToTop} 
      className="scroll-to-top" 
      whileHover={{ y: -2 }} 
      whileTap={{ scale: 0.95 }}
      suppressHydrationWarning={true}
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  )
}

// Componente principal del Footer
export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--medical-primary)" }} className="text-white relative">
      <ScrollToTopButton />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Fila 1: Dr. Gil Bocardo (alineado a la izquierda) */}
          <DoctorHeader doctorName={FOOTER_CONFIG.doctor.name} />
          
          {/* Fila 2: 4 columnas con separadores verticales */}
          <ContactSection 
            phoneContacts={FOOTER_CONFIG.phoneContacts}
            email={FOOTER_CONFIG.doctor.email}
          />
          <ServicesSection services={FOOTER_CONFIG.services} />
          <QuickLinksSection links={FOOTER_CONFIG.quickLinks} />
          <HoursAndSocialSection socialMedia={FOOTER_CONFIG.socialMedia} />
          
          {/* Separador degradado */}
          <GradientSeparator />
          
          {/* Fila 3: Ubicaciones */}
          <LocationsSection locations={FOOTER_CONFIG.locations} />
          
          {/* Footer bottom */}
          <FooterBottom />
        </div>
      </div>
    </footer>
  )
}