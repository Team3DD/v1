"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Configuración de clínica
const CLINIC_CONFIG = {
  name: "Dr. Gil Bocardo - Ortopedia y Traumatología",
  locations: [
    {
      name: "Hospital San José Satélite",
      address: "Circuito Circunvalación Pte. 53",
      schedule: "Martes y jueves"
    },
    {
      name: "Hospital San Ángel Inn Satélite",
      address: "Circuito Centro Comercial No. 20",
      schedule: "Lunes, miércoles y viernes"
    }
  ]
}

// Configuración de Cloudinary
const CLOUDINARY_CONFIG = {
  cloudName: "dhtiz2ebk",
  baseUrl: "https://res.cloudinary.com/dhtiz2ebk/image/upload"
}

// Mapeo de IDs de imagen a sus versiones de Cloudinary
const IMAGE_VERSIONS: Record<string, string> = {
  "9_lcfk3s": "v1760671158",
  "10_xovud3": "v1760671161",
  "8_xri4rq": "v1760671156",
  "7_kkqewh": "v1760671153",
  "6_n9203z": "v1760671152",
  "5_cw3tuj": "v1760671149",
  "13_veujvf": "v1760671167",
  "12_kihwjw": "v1760671165",
  "11_wkhndu": "v1760671161",
  "15_eazs9r": "v1760671170",
  "14_jocxra": "v1760671169",
  "16_xuhpqb": "v1760671173",
  "17_nyfjwa": "v1760671175",
  "18_ssiv46": "v1760671177",
  "24_yovld4": "v1760671997",
  "3_ag5dgv": "v1760671145",
  "22_fgh610": "v1760671184",
  "23_ubai1k": "v1760671186",
  "2_clrlj1": "v1760671143",
  "20_zcreys": "v1760671180",
  "19_fr2syo": "v1760671179",
  "1_hqebyi": "v1760671142",
  "21_ij1al1": "v1760671182"
}

// Función helper para generar URLs de Cloudinary optimizadas
const getCloudinaryUrl = (imageId: string): string => {
  const version = IMAGE_VERSIONS[imageId] || "v1760671000"
  return `${CLOUDINARY_CONFIG.baseUrl}/${version}/${imageId}.jpg`
}

const medicalCases = [
  {
    id: 1,
    title: "Reconstrucción de Ligamento Cruzado Anterior",
    category: "Medicina Deportiva",
    description: "Cirugía artroscópica exitosa en atleta profesional con retorno completo a la actividad deportiva.",
    images: ["9_lcfk3s", "10_xovud3", "8_xri4rq"],
    results: "Recuperación completa en 6 meses",
  },
  {
    id: 2,
    title: "Artroplastia Total de Cadera",
    category: "Cirugía Ortopédica",
    description: "Reemplazo articular en paciente con artrosis severa, mejorando significativamente su calidad de vida.",
    images: ["7_kkqewh", "6_n9203z", "5_cw3tuj"],
    results: "Eliminación completa del dolor",
  },
  {
    id: 3,
    title: "Artroscopia de Hombro",
    category: "Artroscopia",
    description: "Reparación de manguito rotador mediante técnica mínimamente invasiva con excelentes resultados.",
    images: ["13_veujvf", "12_kihwjw", "11_wkhndu"],
    results: "Movilidad completa restaurada",
  },
  {
    id: 4,
    title: "Rehabilitación Post-Quirúrgica",
    category: "Rehabilitación",
    description: "Programa integral de fisioterapia especializada para recuperación funcional óptima.",
    images: ["15_eazs9r", "14_jocxra", "16_xuhpqb"],
    results: "Retorno completo a actividades",
  },
  {
    id: 6,
    title: "Cirugía de Columna Vertebral",
    category: "Cirugía Ortopédica",
    description: "Fusión vertebral para tratamiento de hernia discal con compresión radicular.",
    images: ["17_nyfjwa", "18_ssiv46", "17_nyfjwa"],
    results: "Alivio completo del dolor radicular",
  },
  {
    id: 7,
    title: "Lesión de Menisco",
    category: "Medicina Deportiva",
    description: "Reparación artroscópica de menisco medial con preservación del tejido nativo.",
    images: ["24_yovld4", "3_ag5dgv", "24_yovld4"],
    results: "Función articular preservada",
  },
  {
    id: 8,
    title: "Fractura de Muñeca",
    category: "Traumatología",
    description: "Reducción abierta y fijación interna de fractura de radio distal con placa volar.",
    images: ["22_fgh610", "23_ubai1k", "2_clrlj1"],
    results: "Movilidad completa de muñeca",
  },
  {
    id: 9,
    title: "Prótesis de Rodilla",
    category: "Cirugía Ortopédica",
    description: "Artroplastia total de rodilla con prótesis de última generación y navegación asistida.",
    images: ["20_zcreys", "19_fr2syo", "15_eazs9r"],
    results: "Marcha normal restaurada",
  },
  {
    id: 10,
    title: "Programa Preventivo",
    category: "Prevención",
    description: "Evaluación ergonómica y programa de ejercicios para prevención de lesiones laborales.",
    images: ["1_hqebyi", "21_ij1al1", "20_zcreys"],
    results: "Reducción 90% lesiones laborales",
  },
]

// Componente reutilizable para navegación de imágenes
const ImageNavigationButton = ({ direction, onClick, ariaLabel }: { 
  direction: 'prev' | 'next'
  onClick: () => void
  ariaLabel: string 
}) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === 'prev' ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110`}
    style={{ backgroundColor: "var(--medical-white)", color: "var(--medical-primary)" }}
    aria-label={ariaLabel}
  >
    {direction === 'prev' ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
  </button>
)

export default function MedicalCasesGallery() {
  const [selectedCase, setSelectedCase] = useState<(typeof medicalCases)[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleImageNavigation = (direction: 'next' | 'prev') => {
    if (!selectedCase || !isMounted) return
    
    setCurrentImageIndex((prev) => {
      const total = selectedCase.images.length
      return direction === 'next' 
        ? (prev + 1) % total 
        : (prev - 1 + total) % total
    })
  }

  const handleOpenModal = (medicalCase: typeof medicalCases[0]) => {
    if (!isMounted) return
    setSelectedCase(medicalCase)
    setCurrentImageIndex(0)
  }

  const handleCloseModal = () => {
    if (!isMounted) return
    setSelectedCase(null)
    setCurrentImageIndex(0)
  }

  return (
    <section 
      className="py-16 lg:py-24 overflow-hidden"
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
              onClick={() => handleOpenModal(medicalCase)}
            >
              <div
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 h-full flex flex-col w-full max-w-full"
                style={{ backgroundColor: "var(--medical-white)", borderColor: "var(--medical-neutral)" }}
              >
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <Image
                    src={getCloudinaryUrl(medicalCase.images[0])}
                    alt={medicalCase.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to top, rgba(3, 105, 161, 0.7) 0%, transparent 100%)` }}
                  />
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
                  <div className="mt-auto w-full pt-3 border-t" style={{ borderColor: "var(--medical-neutral)" }}>
                    <span className="text-xs font-medium break-words" style={{ color: "var(--medical-secondary)" }}>
                      {medicalCase.results}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {isMounted && (
        <AnimatePresence>
          {selectedCase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ backgroundColor: "rgba(3, 105, 161, 0.9)", backdropFilter: "blur(10px)" }}
              onClick={handleCloseModal}
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
                  <div className="relative h-96 overflow-hidden">
                    <Image
                      src={getCloudinaryUrl(selectedCase.images[currentImageIndex])}
                      alt={selectedCase.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />

                    {selectedCase.images.length > 1 && (
                      <>
                        <ImageNavigationButton
                          direction="prev"
                          onClick={() => handleImageNavigation('prev')}
                          ariaLabel="Imagen anterior"
                        />
                        <ImageNavigationButton
                          direction="next"
                          onClick={() => handleImageNavigation('next')}
                          ariaLabel="Imagen siguiente"
                        />
                      </>
                    )}

                    <button
                      onClick={handleCloseModal}
                      className="absolute top-4 right-4 p-2 rounded-full shadow-lg transition-colors duration-200"
                      style={{ backgroundColor: "var(--medical-white)", color: "var(--medical-primary)" }}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

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