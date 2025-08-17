"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Award, Users, MapPin } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

const credentials = [
  {
    icon: GraduationCap,
    title: "Formación Académica",
    items: [
      "Médico Cirujano - UNAM",
      "Especialidad en Ortopedia y Traumatología - Hospital ABC",
      "Fellowship en Cirugía Artroscópica - Mayo Clinic",
    ],
  },
  {
    icon: Award,
    title: "Certificaciones",
    items: [
      "Consejo Mexicano de Ortopedia y Traumatología",
      "American Academy of Orthopaedic Surgeons",
      "Arthroscopy Association of North America",
    ],
  },
  {
    icon: Users,
    title: "Experiencia",
    items: [
      "15+ años de práctica clínica",
      "Médico del equipo de fútbol profesional",
      "Más de 2000 cirugías realizadas",
    ],
  },
  {
    icon: MapPin,
    title: "Ubicaciones",
    items: ["Hospital ABC Santa Fe", "Clínica Londres", "Consultorio Polanco"],
  },
]

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="py-16 lg:py-24" style={{ backgroundColor: "var(--medical-neutral)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Text Content - Equal width */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6" style={{ color: "var(--medical-primary)" }}>
              Sobre el Dr. Gil Bocardo
            </h2>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: "var(--medical-secondary)" }}>
                Con más de 15 años de experiencia en ortopedia y traumatología, me he especializado en brindar atención
                médica de excelencia, combinando técnicas quirúrgicas avanzadas con un enfoque humano y personalizado.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "var(--medical-secondary)" }}>
                Mi formación incluye estudios en prestigiosas instituciones nacionales e internacionales, lo que me
                permite ofrecer tratamientos de vanguardia respaldados por la evidencia científica más actual.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: "var(--medical-secondary)" }}>
                Creo firmemente en la importancia de la educación del paciente y el trabajo en equipo multidisciplinario
                para lograr los mejores resultados en cada caso.
              </p>
            </div>
          </motion.div>

          {/* Image - Equal width and larger */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <Image
                  src="https://res.cloudinary.com/dzidbhqli/image/upload/v1755386372/1-DOC1_g17mjo.jpg"
                  alt="Dr. Gil Bocardo - Especialista en Ortopedia y Traumatología"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, rgba(47, 65, 86, 0.2) 0%, transparent 100%)` }}
                ></div>
              </motion.div>
            </div>

            {/* Decorative elements with new color palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute -bottom-6 -right-6 w-full h-full rounded-2xl -z-10 shadow-xl"
              style={{
                background: `linear-gradient(135deg, var(--medical-primary) 0%, var(--medical-secondary) 100%)`,
              }}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute -top-4 -left-4 w-24 h-24 rounded-full -z-20"
              style={{ backgroundColor: "var(--medical-light)" }}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute top-1/2 -right-8 w-16 h-16 rounded-full -z-20"
              style={{ backgroundColor: "var(--medical-white)" }}
            ></motion.div>
          </motion.div>
        </div>

        {/* Credentials Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {credentials.map((credential, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card
                className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2"
                style={{
                  backgroundColor: "var(--medical-white)",
                  borderColor: "var(--medical-light)",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: "var(--medical-light)" }}>
                      <credential.icon className="h-5 w-5" style={{ color: "var(--medical-primary)" }} />
                    </div>
                    <h3 className="font-semibold" style={{ color: "var(--medical-primary)" }}>
                      {credential.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {credential.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--medical-secondary)" }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
