"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bone, Activity, Stethoscope, Zap, Heart, Shield, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

const services = [
  {
    icon: Bone,
    title: "Cirugía Ortopédica",
    description: "Procedimientos quirúrgicos especializados para fracturas, luxaciones y deformidades óseas.",
    fullDescription:
      "Realizamos cirugías ortopédicas de alta complejidad utilizando técnicas mínimamente invasivas y tecnología de vanguardia. Nuestro enfoque se centra en la recuperación rápida y funcional del paciente, minimizando el dolor postoperatorio y optimizando los resultados a largo plazo.",
    features: ["Fracturas complejas", "Cirugía de columna", "Reemplazos articulares"],
    procedures: [
      "Osteosíntesis con placas y tornillos de titanio",
      "Artroplastias de cadera y rodilla",
      "Cirugía de columna vertebral",
      "Corrección de deformidades congénitas",
      "Cirugía reconstructiva de extremidades",
    ],
    benefits: [
      "Técnicas mínimamente invasivas",
      "Recuperación más rápida",
      "Menor dolor postoperatorio",
      "Cicatrices mínimas",
      "Seguimiento personalizado",
    ],
  },
  {
    icon: Activity,
    title: "Medicina Deportiva",
    description: "Tratamiento integral de lesiones deportivas y rehabilitación para atletas.",
    fullDescription:
      "Especialistas en el tratamiento de lesiones deportivas, ofrecemos un enfoque integral que incluye diagnóstico preciso, tratamiento conservador o quirúrgico según sea necesario, y programas de rehabilitación diseñados específicamente para cada deporte y atleta.",
    features: ["Lesiones ligamentarias", "Rehabilitación deportiva", "Prevención de lesiones"],
    procedures: [
      "Reconstrucción de ligamento cruzado anterior",
      "Reparación de meniscos",
      "Tratamiento de tendinopatías",
      "Infiltraciones con ácido hialurónico",
      "Terapia con plasma rico en plaquetas (PRP)",
    ],
    benefits: [
      "Retorno seguro al deporte",
      "Prevención de re-lesiones",
      "Optimización del rendimiento",
      "Programas personalizados",
      "Seguimiento continuo",
    ],
  },
  {
    icon: Stethoscope,
    title: "Artroscopia",
    description: "Cirugía mínimamente invasiva para diagnóstico y tratamiento articular.",
    fullDescription:
      "La artroscopia es una técnica quirúrgica mínimamente invasiva que permite visualizar, diagnosticar y tratar problemas dentro de una articulación. Utilizamos equipos de alta definición para obtener imágenes precisas y realizar procedimientos con máxima precisión.",
    features: ["Artroscopia de rodilla", "Artroscopia de hombro", "Recuperación rápida"],
    procedures: [
      "Artroscopia diagnóstica y terapéutica",
      "Reparación de cartílago articular",
      "Limpieza articular (debridamiento)",
      "Reparación de labrum",
      "Liberación de adherencias",
    ],
    benefits: [
      "Incisiones mínimas (2-3mm)",
      "Menor trauma tisular",
      "Recuperación ambulatoria",
      "Menor riesgo de infección",
      "Visualización directa HD",
    ],
  },
  {
    icon: Zap,
    title: "Traumatología",
    description: "Atención especializada en traumatismos y lesiones del sistema musculoesquelético.",
    fullDescription:
      "Brindamos atención de urgencia las 24 horas para traumatismos ortopédicos. Nuestro equipo está capacitado para manejar desde fracturas simples hasta politraumatismos complejos, garantizando una atención rápida y efectiva en situaciones críticas.",
    features: ["Urgencias traumatológicas", "Politraumatismos", "Atención 24/7"],
    procedures: [
      "Reducción y fijación de fracturas",
      "Tratamiento de luxaciones",
      "Manejo de heridas complejas",
      "Estabilización de politraumatizados",
      "Cirugía de urgencia",
    ],
    benefits: [
      "Atención inmediata 24/7",
      "Equipo multidisciplinario",
      "Tecnología de emergencia",
      "Protocolos estandarizados",
      "Seguimiento integral",
    ],
  },
  {
    icon: Heart,
    title: "Rehabilitación",
    description: "Programas personalizados de fisioterapia y rehabilitación funcional.",
    fullDescription:
      "Nuestros programas de rehabilitación están diseñados individualmente para cada paciente, considerando su condición específica, objetivos funcionales y estilo de vida. Trabajamos con un equipo multidisciplinario de fisioterapeutas especializados.",
    features: ["Fisioterapia especializada", "Terapia ocupacional", "Seguimiento continuo"],
    procedures: [
      "Evaluación funcional completa",
      "Terapia manual especializada",
      "Ejercicios terapéuticos progresivos",
      "Reeducación de la marcha",
      "Terapia acuática",
    ],
    benefits: [
      "Recuperación funcional óptima",
      "Prevención de complicaciones",
      "Retorno a actividades diarias",
      "Mejora de calidad de vida",
      "Educación en autocuidado",
    ],
  },
  {
    icon: Shield,
    title: "Prevención",
    description: "Evaluaciones preventivas y programas de salud musculoesquelética.",
    fullDescription:
      "La prevención es fundamental en la salud ortopédica. Ofrecemos evaluaciones integrales para identificar factores de riesgo y desarrollar estrategias personalizadas para mantener la salud del sistema musculoesquelético a largo plazo.",
    features: ["Chequeos preventivos", "Ergonomía laboral", "Educación en salud"],
    procedures: [
      "Evaluación postural completa",
      "Análisis de la marcha",
      "Densitometría ósea",
      "Evaluación ergonómica",
      "Programas de ejercicio preventivo",
    ],
    benefits: [
      "Detección temprana de problemas",
      "Prevención de lesiones",
      "Mejora de la postura",
      "Optimización ergonómica",
      "Educación continua",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  return (
    <section id="servicios" className="py-16 lg:py-24" style={{ backgroundColor: "var(--medical-white)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4" style={{ color: "var(--medical-primary)" }}>
            Servicios Especializados
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--medical-secondary)" }}>
            Ofrezco una amplia gama de servicios ortopédicos con tecnología de vanguardia y un enfoque personalizado
            para cada paciente.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className="group hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-2 cursor-pointer border-2"
                style={{
                  borderColor: "var(--medical-light)",
                  backgroundColor: "var(--medical-white)",
                }}
                onClick={() => setSelectedService(service)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-3 rounded-lg transition-colors duration-300"
                      style={{ backgroundColor: "var(--medical-light)" }}
                    >
                      <service.icon className="h-6 w-6" style={{ color: "var(--medical-primary)" }} />
                    </div>
                    <ArrowRight
                      className="h-5 w-5 group-hover:translate-x-1 transition-all duration-300"
                      style={{ color: "var(--medical-secondary)" }}
                    />
                  </div>
                  <CardTitle
                    className="text-xl font-semibold group-hover:text-blue-900 transition-colors"
                    style={{ color: "var(--medical-primary)" }}
                  >
                    {service.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed" style={{ color: "var(--medical-secondary)" }}>
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div
                          className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                          style={{ backgroundColor: "var(--medical-secondary)" }}
                        ></div>
                        <span style={{ color: "var(--medical-primary)" }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/citas">
            <Button size="lg" className="btn-medical hover:scale-105 transition-all duration-300 hover:shadow-lg">
              Agendar Consulta
            </Button>
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(47, 65, 86, 0.8)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
              style={{ backgroundColor: "var(--medical-white)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: "var(--medical-light)" }}>
                      <selectedService.icon className="h-8 w-8" style={{ color: "var(--medical-primary)" }} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold" style={{ color: "var(--medical-primary)" }}>
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="p-2 rounded-full transition-colors duration-200"
                    style={{ backgroundColor: "var(--medical-light)", color: "var(--medical-primary)" }}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--medical-secondary)" }}>
                  {selectedService.fullDescription}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--medical-primary)" }}>
                      Procedimientos
                    </h3>
                    <ul className="space-y-3">
                      {selectedService.procedures.map((procedure, index) => (
                        <li key={index} className="flex items-start">
                          <div
                            className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                            style={{ backgroundColor: "var(--medical-secondary)" }}
                          ></div>
                          <span style={{ color: "var(--medical-primary)" }}>{procedure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--medical-primary)" }}>
                      Beneficios
                    </h3>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div
                            className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0"
                            style={{ backgroundColor: "var(--medical-secondary)" }}
                          ></div>
                          <span style={{ color: "var(--medical-primary)" }}>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <Link href="/citas">
                    <Button className="btn-medical mr-4">Agendar Consulta</Button>
                  </Link>
                  <Link href="/contacto">
                    <Button className="btn-medical-outline">Más Información</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
