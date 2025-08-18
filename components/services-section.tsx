"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bone, Activity, Stethoscope, Zap, Heart, Shield, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

// Definir el tipo para los servicios
type Service = {
  icon: React.ComponentType<any>
  title: string
  description: string
  fullDescription: string
  features: string[]
  procedures: string[]
  benefits: string[]
}

const services: Service[] = [
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

// Animaciones optimizadas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detectar dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedService])

  const closeModal = () => setSelectedService(null)

  return (
    <section 
      id="servicios" 
      className="py-12 sm:py-16 lg:py-24" 
      style={{ backgroundColor: "var(--medical-white)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con tipografía responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-3 sm:mb-4" 
            style={{ color: "var(--medical-primary)" }}
          >
            Servicios Especializados
          </h2>
          <p 
            className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2" 
            style={{ color: "var(--medical-secondary)" }}
          >
            Ofrezco una amplia gama de servicios ortopédicos con tecnología de vanguardia y un enfoque personalizado
            para cada paciente.
          </p>
        </motion.div>

        {/* Grid de servicios responsive */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className="group hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer border-2"
                style={{
                  borderColor: "var(--medical-light)",
                  backgroundColor: "var(--medical-white)",
                }}
                onClick={() => setSelectedService(service)}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div
                      className="p-2 sm:p-3 rounded-lg transition-colors duration-300"
                      style={{ backgroundColor: "var(--medical-light)" }}
                    >
                      <service.icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: "var(--medical-primary)" }} />
                    </div>
                    <ArrowRight
                      className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-all duration-300"
                      style={{ color: "var(--medical-secondary)" }}
                    />
                  </div>
                  <CardTitle
                    className="text-lg sm:text-xl font-semibold group-hover:text-blue-900 transition-colors leading-tight"
                    style={{ color: "var(--medical-primary)" }}
                  >
                    {service.title}
                  </CardTitle>
                  <CardDescription 
                    className="leading-relaxed text-sm sm:text-base" 
                    style={{ color: "var(--medical-secondary)" }}
                  >
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 sm:space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs sm:text-sm">
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-2 sm:mr-3 flex-shrink-0"
                          style={{ backgroundColor: "var(--medical-secondary)" }}
                        />
                        <span style={{ color: "var(--medical-primary)" }}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Botón principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Link href="/citas">
            <Button 
              size={isMobile ? "default" : "lg"} 
              className="btn-medical hover:scale-105 transition-all duration-300 hover:shadow-lg text-sm sm:text-base px-6 sm:px-8"
            >
              Agendar Consulta
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Modal optimizado */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            style={{ backgroundColor: "rgba(47, 65, 86, 0.8)", backdropFilter: "blur(8px)" }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto rounded-xl sm:rounded-2xl shadow-2xl"
              style={{ backgroundColor: "var(--medical-white)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Header del modal */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center">
                    <div 
                      className="p-2 sm:p-3 rounded-lg mr-3 sm:mr-4" 
                      style={{ backgroundColor: "var(--medical-light)" }}
                    >
                      <selectedService.icon 
                        className="h-6 w-6 sm:h-8 sm:w-8" 
                        style={{ color: "var(--medical-primary)" }} 
                      />
                    </div>
                    <h2 
                      className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold leading-tight" 
                      style={{ color: "var(--medical-primary)" }}
                    >
                      {selectedService.title}
                    </h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-1.5 sm:p-2 rounded-full transition-colors duration-200 hover:bg-opacity-80"
                    style={{ backgroundColor: "var(--medical-light)", color: "var(--medical-primary)" }}
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                {/* Descripción */}
                <p 
                  className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed" 
                  style={{ color: "var(--medical-secondary)" }}
                >
                  {selectedService.fullDescription}
                </p>

                {/* Contenido en columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {/* Procedimientos */}
                  <div>
                    <h3 
                      className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4" 
                      style={{ color: "var(--medical-primary)" }}
                    >
                      Procedimientos
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {selectedService.procedures.map((procedure, index) => (
                        <li key={index} className="flex items-start">
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"
                            style={{ backgroundColor: "var(--medical-secondary)" }}
                          />
                          <span 
                            className="text-sm sm:text-base leading-relaxed" 
                            style={{ color: "var(--medical-primary)" }}
                          >
                            {procedure}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Beneficios */}
                  <div>
                    <h3 
                      className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4" 
                      style={{ color: "var(--medical-primary)" }}
                    >
                      Beneficios
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {selectedService.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"
                            style={{ backgroundColor: "var(--medical-secondary)" }}
                          />
                          <span 
                            className="text-sm sm:text-base leading-relaxed" 
                            style={{ color: "var(--medical-primary)" }}
                          >
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Solo botón de agendar consulta */}
                <div className="mt-6 sm:mt-8 text-center">
                  <Link href="/citas">
                    <Button 
                      className="btn-medical w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8"
                      size={isMobile ? "default" : "lg"}
                    >
                      Agendar Consulta
                    </Button>
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