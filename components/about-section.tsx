"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Award, Users, MapPin, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

// Configuración de Cloudinary (DRY)
const CLOUDINARY_CONFIG = {
  cloudName: "dhtiz2ebk",
  baseUrl: "https://res.cloudinary.com/dhtiz2ebk/image/upload",
  transformations: {
    auto_quality: "q_auto",
    auto_format: "f_auto",
    optimize: "c_scale,w_800",
    aspectRatio: "c_fill,w_600,h_800,g_face:center"
  }
} as const

// Constantes de configuración
const CAROUSEL_CONFIG = {
  intervalMs: 5000, // 5 segundos para mejor legibilidad
  transitionDuration: 800 // Transición más suave
} as const

// Función helper para generar URLs de Cloudinary optimizadas (DRY)
const generateCloudinaryUrl = (publicId: string): string => {
  const transforms = Object.values(CLOUDINARY_CONFIG.transformations).join(",")
  return `${CLOUDINARY_CONFIG.baseUrl}/${transforms}/${publicId}`
}

// Tipo para las imágenes del carrusel
interface CarouselImage {
  publicId: string
  alt: string
  priority: boolean
}

// Función para mezclar array (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: readonly T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Datos del carrusel con configuración de Cloudinary
const carouselImages: CarouselImage[] = [
  {
    publicId: "v1760665949/19_unay1o.webp",
    alt: "Dr. Gil Bocardo - Cirujano Ortopédico Profesional",
    priority: true
  },
  {
    publicId: "v1760665949/11_mzdeyl.webp",
    alt: "Dr. Gil Bocardo - Especialista en Ortopedia",
    priority: false
  },
  {
    publicId: "v1760665953/8_aojtik.webp",
    alt: "Equipo médico del Dr. Gil Bocardo",
    priority: false
  },
  {
    publicId: "v1760665948/17_nu9kju.webp",
    alt: "Consulta médica ortopédica profesional",
    priority: false
  },
  {
    publicId: "v1760665948/14_l3rioc.webp",
    alt: "Dr. Gil Bocardo en cirugía ortopédica",
    priority: false
  },
  {
    publicId: "v1760665948/15_pqftul.webp",
    alt: "Tratamiento ortopédico especializado",
    priority: false
  },
  {
    publicId: "v1760665948/13_ngwetw.webp",
    alt: "Dr. Gil Bocardo - Atención personalizada",
    priority: false
  },
  {
    publicId: "v1760664908/Dr._Gil_Bocardo_Cirujano_Ortop%C3%A9dico_Atendiendo_un_Tend%C3%B3n_Profesional_qlrlau.webp",
    alt: "Cirugía de tendón - Dr. Gil Bocardo",
    priority: false
  },
  {
    publicId: "v1760664908/Dr._Gil_Bocardo_Cirujano_Ortop%C3%A9dico_Asistido_y_Atendiendo_un_Tend%C3%B3n_Profesional_oac2rz.webp",
    alt: "Procedimiento quirúrgico ortopédico",
    priority: false
  },
  {
    publicId: "v1760664908/Dr._Gil_Bocardo_Cirujano_Ortop%C3%A9dico_y_su_equipo_de_trabajo_en_pose_de_exito_n3ak5m.webp",
    alt: "Equipo médico exitoso - Dr. Gil Bocardo",
    priority: false
  }
]

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
] as const

// Animaciones reutilizables (DRY)
const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
}

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay: 0.2 }
}

export default function AboutSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

  // Memorizar imágenes mezcladas
  const shuffledImages = useMemo(() => shuffleArray(carouselImages), [])

  // Precargar todas las imágenes en cache
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = shuffledImages.map(img => generateCloudinaryUrl(img.publicId))
      
      const loadPromises = imageUrls.map(url => {
        return new Promise((resolve, reject) => {
          const img = new window.Image()
          img.src = url
          img.onload = () => {
            setPreloadedImages(prev => new Set(prev).add(url))
            resolve(url)
          }
          img.onerror = reject
        })
      })

      try {
        await Promise.all(loadPromises)
        console.log('✅ Todas las imágenes precargadas en cache')
      } catch (error) {
        console.warn('⚠️ Error al precargar algunas imágenes:', error)
      }
    }

    if (isClient) {
      preloadImages()
    }
  }, [isClient, shuffledImages])

  // Marcar como cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Cambiar imagen automáticamente
  const goToNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % shuffledImages.length)
  }, [shuffledImages.length])

  const goToPrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + shuffledImages.length) % shuffledImages.length)
  }, [shuffledImages.length])

  // Auto-avance (solo si no está pausado)
  useEffect(() => {
    if (!isClient || isPaused) return
    const interval = setInterval(goToNextImage, CAROUSEL_CONFIG.intervalMs)
    return () => clearInterval(interval)
  }, [isClient, isPaused, goToNextImage])

  // Función para navegar a imagen específica
  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev)
  }, [])

  const currentImage: CarouselImage = shuffledImages[currentImageIndex]

  if (!isClient) {
    return null
  }

  return (
    <section 
      id="sobre-mi" 
      className="py-16 lg:py-24 overflow-hidden"
      style={{ backgroundColor: "var(--medical-neutral)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16 w-full">
          {/* Text Content */}
          <motion.div {...fadeInLeft} className="space-y-6 w-full max-w-full">
            <h2 
              className="text-3xl lg:text-4xl font-serif font-bold mb-6 break-words" 
              style={{ color: "var(--medical-primary)" }}
            >
              Sobre el Dr. Gil Bocardo
            </h2>
            <div className="space-y-6 w-full">
              <p 
                className="text-lg leading-relaxed break-words" 
                style={{ color: "var(--medical-secondary)" }}
              >
                Con más de 15 años de experiencia en ortopedia y traumatología, me he especializado en brindar atención
                médica de excelencia, combinando técnicas quirúrgicas avanzadas con un enfoque humano y personalizado.
              </p>
              <p 
                className="text-lg leading-relaxed break-words" 
                style={{ color: "var(--medical-secondary)" }}
              >
                Mi formación incluye estudios en prestigiosas instituciones nacionales e internacionales, lo que me
                permite ofrecer tratamientos de vanguardia respaldados por la evidencia científica más actual.
              </p>
              <p 
                className="text-lg leading-relaxed break-words" 
                style={{ color: "var(--medical-secondary)" }}
              >
                Creo firmemente en la importancia de la educación del paciente y el trabajo en equipo multidisciplinario
                para lograr los mejores resultados en cada caso.
              </p>
            </div>
          </motion.div>

          {/* Image Carousel Optimizado */}
          <motion.div
            {...fadeInRight}
            className="relative flex justify-center lg:justify-end w-full"
          >
            <div className="relative w-full max-w-md">
              <div
                className="relative overflow-hidden rounded-2xl shadow-2xl w-full bg-gray-100"
                style={{ aspectRatio: "3/4" }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                role="region"
                aria-label="Galería de imágenes del Dr. Gil Bocardo"
                aria-live="polite"
              >
                {/* Contenedor de imágenes con crossfade */}
                <div className="relative w-full h-full">
                  {shuffledImages.map((image, index) => (
                    <div
                      key={index}
                      className="absolute inset-0 transition-opacity duration-800 ease-in-out"
                      style={{
                        opacity: index === currentImageIndex ? 1 : 0,
                        zIndex: index === currentImageIndex ? 1 : 0
                      }}
                    >
                      <Image
                        src={generateCloudinaryUrl(image.publicId)}
                        alt={image.alt}
                        fill
                        className="object-cover object-center"
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                        priority={index === 0}
                      />
                    </div>
                  ))}
                  
                  {/* Overlay sutil */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{ 
                      background: `linear-gradient(to top, rgba(86, 47, 52, 0.08) 0%, transparent 60%)`,
                      mixBlendMode: 'multiply'
                    }}
                  />
                </div>

                {/* Controles de navegación destacados */}
                <button
                  onClick={goToPrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                  style={{ color: "var(--medical-primary)" }}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
                  style={{ color: "var(--medical-primary)" }}
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                
                {/* Indicadores de progreso */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 ">
                  {shuffledImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: index === currentImageIndex ? '24px' : '8px',
                        height: '8px',
                        backgroundColor: index === currentImageIndex 
                          ? "var(--medical-primary)" 
                          : "rgba(255, 255, 255, 0.1)"
                      }}
                      aria-label={`Ir a imagen ${index + 1} de ${shuffledImages.length}`}
                      aria-current={index === currentImageIndex}
                    />
                  ))}
                </div>

               
              </div>
              
              {/* Elemento decorativo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -top-4 -left-4 w-24 h-24 rounded-full -z-10"
                style={{ 
                  backgroundColor: "var(--medical-light)",
                  maxWidth: '96px',
                  maxHeight: '96px'
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Credentials Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {credentials.map((credential, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="w-full"
            >
              <Card
                className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 w-full"
                style={{
                  backgroundColor: "var(--medical-white)",
                  borderColor: "var(--medical-light)",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: "var(--medical-light)" }}>
                      <credential.icon className="h-5 w-5" style={{ color: "var(--medical-primary)" }} />
                    </div>
                    <h3 className="font-semibold text-sm break-words flex-1" style={{ color: "var(--medical-primary)" }}>
                      {credential.title}
                    </h3>
                  </div>
                  <ul className="space-y-1.5">
                    {credential.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-xs leading-relaxed break-words"
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