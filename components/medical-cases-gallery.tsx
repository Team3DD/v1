"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const medicalCases = [
  {
    id: 1,
    title: "Reconstrucción de Ligamento Cruzado Anterior",
    category: "Medicina Deportiva",
    description: "Cirugía artroscópica exitosa en atleta profesional con retorno completo a la actividad deportiva.",
    images: [
      "https://res.cloudinary.com/dzidbhqli/image/upload/v1755386364/11-LEO00616_tqiiuf.jpg",
      "https://res.cloudinary.com/dzidbhqli/image/upload/v1755386371/elderly-woman-suffering-from-pain-hand-arthritis-old-person-senior-woman-female-suffering-from-pain-home_ti7dpd.jpg",
      "https://res.cloudinary.com/dzidbhqli/image/upload/v1755386379/woman-crashed-into-car_o5umkv.jpg",
    ],
    results: "Recuperación completa en 6 meses",
  },
  {
    id: 2,
    title: "Artroplastia Total de Cadera",
    category: "Cirugía Ortopédica",
    description:
      "Reemplazo articular en paciente con artrosis severa, mejorando significativamente su calidad de vida.",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    results: "Eliminación completa del dolor",
  },
  {
    id: 3,
    title: "Artroscopia de Hombro",
    category: "Artroscopia",
    description: "Reparación de manguito rotador mediante técnica mínimamente invasiva con excelentes resultados.",
    images: [
      "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    results: "Movilidad completa restaurada",
  },
  {
    id: 4,
    title: "Fractura Compleja de Tibia",
    category: "Traumatología",
    description: "Tratamiento quirúrgico de fractura expuesta con consolidación ósea exitosa.",
    images: [
      "https://res.cloudinary.com/dzidbhqli/image/upload/v1755386353/old-man-pain-helped-by-nurse_akt7sc.jpg",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    results: "Consolidación ósea completa",
  },
  {
    id: 5,
    title: "Rehabilitación Post-Quirúrgica",
    category: "Rehabilitación",
    description: "Programa integral de fisioterapia especializada para recuperación funcional óptima.",
    images: [
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    results: "Retorno completo a actividades",
  },
  {
    id: 6,
    title: "Cirugía de Columna Vertebral",
    category: "Cirugía Ortopédica",
    description: "Fusión vertebral para tratamiento de hernia discal con compresión radicular.",
    images: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    results: "Alivio completo del dolor radicular",
  },
  {
    id: 7,
    title: "Lesión de Menisco",
    category: "Medicina Deportiva",
    description: "Reparación artroscópica de menisco medial con preservación del tejido nativo.",
    images: [
      "https://res.cloudinary.com/dzidbhqli/image/upload/v1755386369/close-up-man-rubbing-his-painful-back-isolated-white-background_kw3osu.jpg",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    results: "Función articular preservada",
  },
  {
    id: 8,
    title: "Fractura de Muñeca",
    category: "Traumatología",
    description: "Reducción abierta y fijación interna de fractura de radio distal con placa volar.",
    images: [
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    results: "Movilidad completa de muñeca",
  },
  {
    id: 9,
    title: "Prótesis de Rodilla",
    category: "Cirugía Ortopédica",
    description: "Artroplastia total de rodilla con prótesis de última generación y navegación asistida.",
    images: [
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    results: "Marcha normal restaurada",
  },
  {
    id: 10,
    title: "Programa Preventivo",
    category: "Prevención",
    description: "Evaluación ergonómica y programa de ejercicios para prevención de lesiones laborales.",
    images: [
      "https://res.cloudinary.com/dzidbhqli/image/upload/v1755386371/elderly-woman-suffering-from-pain-hand-arthritis-old-person-senior-woman-female-suffering-from-pain-home_ti7dpd.jpg",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    results: "Reducción 90% lesiones laborales",
  },
]

export default function MedicalCasesGallery() {
  const [selectedCase, setSelectedCase] = useState<(typeof medicalCases)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Fix para hidratación
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const nextImage = () => {
    if (selectedCase && isMounted) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedCase.images.length)
    }
  }

  const prevImage = () => {
    if (selectedCase && isMounted) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedCase.images.length) % selectedCase.images.length)
    }
  }

  const openModal = (medicalCase: typeof medicalCases[0]) => {
    if (!isMounted) return
    setSelectedCase(medicalCase)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    if (!isMounted) return
    setSelectedCase(null)
    setCurrentImageIndex(0)
  }

  return (
    <section 
      className="py-16 lg:py-24 overflow-hidden" // Agregado overflow-hidden
      style={{ backgroundColor: "var(--medical-light)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4 break-words" style={{ color: "var(--medical-primary)" }}>
            Casos Médicos Exitosos
          </h2>
          <p className="text-xl max-w-3xl mx-auto break-words" style={{ color: "var(--medical-secondary)" }}>
            Conozca algunos de nuestros casos más representativos y los excelentes resultados obtenidos para nuestros
            pacientes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {medicalCases.map((medicalCase, index) => (
            <motion.div
              key={medicalCase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer h-full w-full"
              onClick={() => openModal(medicalCase)}
            >
              <div
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 h-full flex flex-col w-full max-w-full"
                style={{ backgroundColor: "var(--medical-white)", borderColor: "var(--medical-neutral)" }}
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={medicalCase.images[0] || "/placeholder.svg"}
                    alt={medicalCase.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, rgba(3, 105, 161, 0.7) 0%, transparent 100%)` }}
                  ></div>
                  <div className="absolute top-3 right-3">
                    <span
                      className="px-2 py-1 text-xs font-medium rounded-full break-words"
                      style={{ backgroundColor: "var(--medical-primary)", color: "var(--medical-white)" }}
                    >
                      {medicalCase.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col w-full">
                  <h3
                    className="font-semibold mb-2 min-h-[3rem] flex items-start break-words"
                    style={{ color: "var(--medical-primary)" }}
                  >
                    <span className="line-clamp-2">{medicalCase.title}</span>
                  </h3>
                  <p className="text-sm line-clamp-2 mb-3 flex-1 break-words" style={{ color: "var(--medical-secondary)" }}>
                    {medicalCase.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto w-full">
                    <span className="text-xs font-medium break-words flex-1" style={{ color: "var(--medical-secondary)" }}>
                      {medicalCase.results}
                    </span>
                    <div className="flex space-x-1 flex-shrink-0 ml-2">
                      {medicalCase.images.map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: "var(--medical-light)" }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal - Solo renderizar si está montado */}
      {isMounted && (
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: "rgba(3, 105, 161, 0.9)", backdropFilter: "blur(10px)" }}
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
                style={{ backgroundColor: "var(--medical-white)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full">
                  {/* Image Carousel */}
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={selectedCase.images[currentImageIndex] || "/placeholder.svg"}
                      alt={selectedCase.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />

                    {/* Navigation Buttons */}
                    {selectedCase.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                          style={{ backgroundColor: "var(--medical-white)", color: "var(--medical-primary)" }}
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                          style={{ backgroundColor: "var(--medical-white)", color: "var(--medical-primary)" }}
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                      </>
                    )}

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {selectedCase.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex ? "scale-125" : "opacity-60 hover:opacity-80"
                          }`}
                          style={{ backgroundColor: "var(--medical-white)" }}
                        />
                      ))}
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={closeModal}
                      className="absolute top-4 right-4 p-2 rounded-full shadow-lg transition-colors duration-200"
                      style={{ backgroundColor: "var(--medical-white)", color: "var(--medical-primary)" }}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-8 w-full">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="px-3 py-1 text-sm font-medium rounded-full break-words"
                        style={{ backgroundColor: "var(--medical-light)", color: "var(--medical-primary)" }}
                      >
                        {selectedCase.category}
                      </span>
                    </div>

                    <h2 className="text-3xl font-serif font-bold mb-4 break-words" style={{ color: "var(--medical-primary)" }}>
                      {selectedCase.title}
                    </h2>

                    <p className="text-lg mb-6 leading-relaxed break-words" style={{ color: "var(--medical-secondary)" }}>
                      {selectedCase.description}
                    </p>

                    <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--medical-neutral)" }}>
                      <h4 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
                        Resultado:
                      </h4>
                      <p className="break-words" style={{ color: "var(--medical-secondary)" }}>{selectedCase.results}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  )
}