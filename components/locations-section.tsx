"use client"

import { Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

interface Location {
  name: string
  address: string
  days: string
  phone?: string
  whatsapp?: string
  link: string
  mapSrc: string
}

const locations: Location[] = [
  {
    name: "Consultorio Hospital San José Satélite",
    address:
      "Circuito Circunvalación Pte. 53, Cd. Satélite, 53100 Naucalpan de Juárez, Edo. de México.",
    days: "Atención martes y jueves",
    phone: "55 5572 8930 ext. 522",
    link: "https://maps.app.goo.gl/hjWJxr3A2ZkNrUX18",
    mapSrc:
      "https://maps.google.com/maps?q=Hospital+San+José+Satélite,+Circuito+Circunvalación+Pte.+53,+Naucalpan&t=&z=16&ie=UTF8&output=embed",
  },
  {
    name: "Consultorio 1406 Hospital San Ángel Inn - Satélite",
    address:
      "Circuito Centro Comercial No. 20, Ciudad Satélite, Naucalpan de Juárez, Edo. de México.",
    days: "Atención lunes, miércoles y viernes",
    phone: "55 1675 4809",
    whatsapp: "55 9188 3839",
    link: "https://maps.app.goo.gl/1JX98yKs1aki7EuAA",
    mapSrc:
      "https://maps.google.com/maps?q=Hospital+San+Ángel+Inn+Satélite,+Circuito+Centro+Comercial+No.+20,+Naucalpan&t=&z=16&ie=UTF8&output=embed",
  },
]

export default function LocationsSection() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date()
      const mexicoTime = new Date(
        now.toLocaleString("en-US", {
          timeZone: "America/Mexico_City",
        })
      )

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

  return (
    <section className="py-16 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2
            className="text-3xl lg:text-4xl font-serif font-bold break-words"
            style={{ color: "var(--medical-primary)" }}
          >
            Ubicaciones
          </h2>
        </motion.div>

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
              className="rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-full"
              style={{ backgroundColor: "var(--medical-light)" }}
            >
              <div className="h-64 bg-gray-100 relative overflow-hidden">
                <iframe
                  src={location.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.2)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${location.name}`}
                />

                <a
                  href={location.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-transparent hover:bg-black/10 transition-all duration-300 flex items-center justify-center group"
                >
                  <div className="bg-white bg-opacity-90 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-xs font-medium text-gray-700">
                      Abrir en Google Maps
                    </span>
                  </div>
                </a>
              </div>

              <div className="p-6 lg:p-8 w-full">
                {/* Título */}
                <h4
                  className="font-bold text-xl lg:text-2xl break-words mb-4"
                  style={{ color: "var(--medical-primary)" }}
                >
                  {location.name}
                </h4>

                {/* Dirección */}
                <p
                  className="text-sm lg:text-base break-words leading-relaxed mb-3"
                  style={{ color: "var(--medical-secondary)" }}
                >
                  {location.address}
                </p>

                {/* Días de atención */}
                <p
                  className="text-sm lg:text-base font-medium break-words mb-4"
                  style={{ color: "var(--medical-secondary)" }}
                >
                  {location.days}
                </p>

                {/* Línea divisoria */}
                <div className="border-t border-gray-200/60 mb-4"></div>

                {/* Teléfonos */}
                <div className="space-y-3">
                  {location.phone && (
                    <p
                      className="text-sm lg:text-base break-words flex items-center gap-3"
                      style={{ color: "var(--medical-secondary)" }}
                    >
                      <Phone className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                      <span>{location.phone}</span>
                    </p>
                  )}

                  {location.whatsapp && (
                    <p
                      className="text-sm lg:text-base break-words flex items-center gap-3"
                      style={{ color: "var(--medical-secondary)" }}
                    >
                      <MessageCircle className="h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                      <span>{location.whatsapp}</span>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 lg:mt-20 p-8 lg:p-10 rounded-2xl w-full max-w-full"
          style={{
            backgroundColor: "var(--medical-neutral)",
            border: "2px solid var(--medical-light)"
          }}
        >
          <h3
            className="text-2xl lg:text-3xl font-serif font-bold mb-4 break-words"
            style={{ color: "var(--medical-primary)" }}
          >
            ¿Listo para agendar tu consulta?
          </h3>

          <p
            className="text-base lg:text-lg mb-8 max-w-2xl mx-auto break-words leading-relaxed"
            style={{ color: "var(--medical-secondary)" }}
          >
            Nuestro equipo está disponible para atenderte en cualquiera de nuestras ubicaciones. 
            Contáctanos para programar tu cita.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Link
              href="/citas"
              className="inline-flex items-center px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
              style={{
                backgroundColor: "var(--medical-primary)",
                color: "var(--medical-white)"
              }}
            >
              Contactar ahora
            </Link>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
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