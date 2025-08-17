"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Footer() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <footer style={{ backgroundColor: "var(--medical-primary)" }} className="text-white relative">
      <motion.button 
        onClick={scrollToTop} 
        className="scroll-to-top" 
        whileHover={{ y: -2 }} 
        whileTap={{ scale: 0.95 }}
        suppressHydrationWarning={true}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-base font-serif font-bold mb-3" style={{ color: "var(--medical-light)" }}>
              Dr. Gil Bocardo
            </h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2 group">
                <Phone
                  className="h-3 w-3 mt-0.5 group-hover:scale-110 transition-transform"
                  style={{ color: "var(--medical-light)" }}
                />
                <div>
                  <p className="font-medium text-xs">Teléfono</p>
                  <Link href="tel:+525512345678" className="text-gray-300 hover:text-white transition-colors text-xs">
                    +52 (55) 1234-5678
                  </Link>
                </div>
              </div>
              <div className="flex items-start space-x-2 group">
                <Mail
                  className="h-3 w-3 mt-0.5 group-hover:scale-110 transition-transform"
                  style={{ color: "var(--medical-light)" }}
                />
                <div>
                  <p className="font-medium text-xs">Email</p>
                  <Link
                    href="mailto:contacto@ortopediagilbocardo.com"
                    className="text-gray-300 hover:text-white transition-colors text-xs"
                  >
                    contacto@ortopediagilbocardo.com
                  </Link>
                </div>
              </div>
              <div className="flex items-start space-x-2 group">
                <MapPin
                  className="h-3 w-3 mt-0.5 group-hover:scale-110 transition-transform"
                  style={{ color: "var(--medical-light)" }}
                />
                <div>
                  <p className="font-medium text-xs">Ubicación</p>
                  <p className="text-gray-300 text-xs">San Ángel Inn Consultorio 1406</p>
                  <p className="text-gray-300 text-xs">Ciudad Satélite, Naucalpan</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold mb-3">Servicios</h3>
            <ul className="space-y-1">
              {["Cirugía Ortopédica", "Medicina Deportiva", "Artroscopia", "Traumatología", "Rehabilitación"].map(
                (service, index) => (
                  <li key={index}>
                    <Link
                      href="#servicios"
                      className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block text-xs opacity-80"
                    >
                      {service}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold mb-3">Enlaces Rápidos</h3>
            <ul className="space-y-1">
              {[
                { name: "Inicio", href: "/" },
                { name: "Sobre Mí", href: "#sobre-mi" },
                { name: "Blog", href: "/blog" },
                { name: "Contacto", href: "/contacto" },
                { name: "Agendar Cita", href: "/citas" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Hours & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold mb-3">Horarios</h3>
            <div className="space-y-1 mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" style={{ color: "var(--medical-light)" }} />
                <span className="text-gray-300 text-xs">Lun-Vie: 9:00-18:00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" style={{ color: "var(--medical-light)" }} />
                <span className="text-gray-300 text-xs">Sábado: 9:00-14:00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3" style={{ color: "var(--medical-light)" }} />
                <span className="text-gray-300 text-xs">Urgencias: 24/7</span>
              </div>
            </div>

            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="transition-all duration-300 hover:scale-110 text-gray-300 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-4 pt-3"
        >
          {/* Privacy text above */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
            <p className="text-gray-400 text-xs mb-2 md:mb-0">
              Protegemos su privacidad y datos personales conforme a la normativa vigente.
            </p>
            <div className="flex space-x-4">
              <Link href="/terminos-servicio" className="text-gray-400 hover:text-white text-xs transition-colors">
                Términos de Servicio
              </Link>
              <Link href="/politica-privacidad" className="text-gray-400 hover:text-white text-xs transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>

          {/* Copyright and credits below */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <p className="text-gray-400 text-xs mb-1 md:mb-0">© 2024 Dr. Gil Bocardo. Todos los derechos reservados.</p>
            <p className="text-gray-400 text-xs">
              by{" "}
              <span className="text-red-500 hover:text-sky-400 transition-colors cursor-pointer font-medium">
                team 3
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}