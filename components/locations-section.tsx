"use client"

import { MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface Location {
  name: string
  address: string
  days: string
  link: string
  mapSrc: string
}

const locations: Location[] = [
  {
    name: "Hospital San José Satélite",
    address: "Circuito Circunvalación Pte. 53",
    days: "Martes y jueves",
    link: "https://maps.google.com/?q=19.5102,-99.2384",
    mapSrc: "https://maps.google.com/maps?q=19.5102,-99.2384&t=&z=16&ie=UTF8&output=embed"
  },
  {
    name: "Hospital San Ángel Inn Satélite",
    address: "Circuito Centro Comercial No. 20",
    days: "Lunes, miércoles y viernes",
    link: "https://maps.google.com/?q=19.5089,-99.2389",
    mapSrc: "https://maps.google.com/maps?q=19.5089,-99.2389&t=&z=16&ie=UTF8&output=embed"
  }
]

export default function LocationsSection() {
  return (
    <section className="py-16 lg:py-20 bg-white overflow-hidden"> {/* Agregado overflow-hidden */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 break-words" style={{ color: "var(--medical-primary)" }}>
            Ubicaciones
          </h2>
        </motion.div>

        {/* Locations Grid - Cards with Maps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 lg:gap-12 w-full"
        >
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-full"
            >
              {/* Map Container */}
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                <iframe
                  src={location.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.2)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${location.name}`}
                />
                {/* Overlay para click directo a Google Maps */}
                <a
                  href={location.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center group"
                >
                  <div className="bg-white bg-opacity-90 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-xs font-medium text-gray-700">Abrir en Google Maps</span>
                  </div>
                </a>
              </div>

              {/* Card Footer - Solo información */}
              <div className="p-6 w-full" style={{ backgroundColor: 'var(--medical-light)' }}>
                <h4 className="font-bold text-lg mb-2 break-words" style={{ color: 'var(--medical-primary)' }}>
                  {location.name}
                </h4>
                <p className="text-sm mb-1 break-words" style={{ color: 'var(--medical-secondary)' }}>
                  {location.address}
                </p>
                <p className="text-sm font-medium break-words" style={{ color: 'var(--medical-secondary)' }}>
                  {location.days}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 p-8 rounded-2xl w-full max-w-full"
          style={{ 
            backgroundColor: "var(--medical-neutral)",
            border: "2px solid var(--medical-light)"
          }}
        >
          <h3 className="text-2xl font-serif font-bold mb-4 break-words" style={{ color: "var(--medical-primary)" }}>
            ¿Listo para agendar tu consulta?
          </h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto break-words" style={{ color: "var(--medical-secondary)" }}>
            Nuestro equipo está disponible para atenderte en cualquiera de nuestras ubicaciones. 
            Contáctanos para programar tu cita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link
              href="#contacto"
              className="inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              style={{
                backgroundColor: "var(--medical-primary)",
                color: "var(--medical-white)"
              }}
            >
              Contactar ahora
            </Link>
            <a
              href="tel:+525512345678"
              className="inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 border-2 w-full sm:w-auto"
              style={{
                borderColor: "var(--medical-primary)",
                color: "var(--medical-primary)",
                backgroundColor: "transparent"
              }}
            >
              <Phone className="mr-2 h-4 w-4" />
              Llamar directamente
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}