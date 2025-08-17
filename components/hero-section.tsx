"use client"

import { Button } from "@/components/ui/button"
import { Award, Users, Clock, Shield, ArrowRight, Phone, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback, useMemo } from "react"

// Configuración de Cloudinary
const CLOUDINARY_CONFIG = {
  cloudName: "dzidbhqli",
  baseUrl: "https://res.cloudinary.com/dzidbhqli/image/upload",
  transformations: {
    auto_quality: "q_auto",
    auto_format: "f_auto",
    optimize: "c_scale,w_1000",
    responsive: "c_fill,w_600,h_600,g_center" // Cuadrado 1:1 centrado
  }
}

// Función helper para generar URLs de Cloudinary con transformaciones
const generateCloudinaryUrl = (publicId: string, transformations: string[] = []) => {
  const baseTransforms = [
    CLOUDINARY_CONFIG.transformations.auto_quality,
    CLOUDINARY_CONFIG.transformations.auto_format,
    CLOUDINARY_CONFIG.transformations.optimize
  ]
  const allTransforms = [...baseTransforms, ...transformations].join(",")
  return `${CLOUDINARY_CONFIG.baseUrl}/${allTransforms}/${publicId}`
}

// Datos del carrusel optimizados con URLs de Cloudinary
const carouselImages = [
  {
    publicId: "12-LEO00628_x05ipg.jpg",
    alt: "Consulta médica ortopédica profesional",
    priority: true
  },
  {
    publicId: "logo_lq8w89.png",
    alt: "Equipo médico especializado en ortopedia",
    priority: false
  },
  {
    publicId: "8-LEO00527_dxywek.jpg",
    alt: "Rehabilitación y fisioterapia ortopédica",
    priority: false
  },
  {
    publicId: "9-LEO00550_wxobwz.jpg",
    alt: "Cirugía artroscópica moderna",
    priority: false
  },
  {
    publicId: "3-LEO00469_x9ptjp.jpg",
    alt: "Medicina deportiva y traumatología",
    priority: false
  },
]

// Datos de estadísticas
const statsData = [
  { icon: Award, number: "15+", label: "Años de Experiencia", color: "var(--medical-primary)" },
  { icon: Users, number: "5000+", label: "Pacientes Atendidos", color: "var(--medical-secondary)" },
  { icon: Clock, number: "24/7", label: "Urgencias", color: "var(--medical-primary)" },
  { icon: Shield, number: "100%", label: "Certificado", color: "var(--medical-secondary)" },
]

// Configuraciones de animación
const animationVariants = {
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.4 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }
}

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Memoizar las URLs de las imágenes con transformaciones centradas
  const optimizedImages = useMemo(() => 
    carouselImages.map(img => ({
      ...img,
      src: generateCloudinaryUrl(img.publicId, ["c_fill,w_600,h_600,g_center"]), // Cuadrado centrado
      srcLow: generateCloudinaryUrl(img.publicId, ["c_scale,w_300", "q_auto:low", "g_center"])
    })),
    []
  )

  // Control automático del carrusel
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 6000)
    
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  // Navegación del carrusel
  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    setIsAutoPlaying(false)
  }, [])

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
    setIsAutoPlaying(false)
  }, [])

  const goToImage = useCallback((index: number) => {
    setCurrentImage(index)
    setIsAutoPlaying(false)
  }, [])

  // Precargar la siguiente imagen
  useEffect(() => {
    const nextIndex = (currentImage + 1) % carouselImages.length
    const nextImg = new window.Image()
    nextImg.src = optimizedImages[nextIndex].src
  }, [currentImage, optimizedImages])

  return (
    <section
      className="py-16 lg:py-24 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, var(--medical-neutral) 0%, var(--medical-white) 50%, var(--medical-light) 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <motion.div
            initial={animationVariants.slideInLeft.initial}
            animate={animationVariants.slideInLeft.animate}
            transition={animationVariants.slideInLeft.transition}
          >
            {/* Badge */}
            <motion.div
              initial={animationVariants.fadeInUp.initial}
              animate={animationVariants.fadeInUp.animate}
              transition={{ ...animationVariants.fadeInUp.transition, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: "var(--medical-light)", color: "var(--medical-primary)" }}
            >
              <Shield className="h-4 w-4 mr-2" />
              Especialista Certificado
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={animationVariants.fadeInUp.initial}
              animate={animationVariants.fadeInUp.animate}
              transition={{ ...animationVariants.fadeInUp.transition, delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
              style={{ color: "var(--medical-primary)" }}
            >
              Dr. Gil Bocardo
              <span
                className="block text-3xl sm:text-4xl lg:text-5xl mt-2"
                style={{ color: "var(--medical-secondary)" }}
              >
                Ortopedia y Traumatología
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={animationVariants.fadeInUp.initial}
              animate={animationVariants.fadeInUp.animate}
              transition={{ ...animationVariants.fadeInUp.transition, delay: 0.5 }}
              className="text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl"
              style={{ color: "var(--medical-primary)" }}
            >
              Especialista certificado con más de 15 años de experiencia en el tratamiento de lesiones ortopédicas,
              cirugía artroscópica y medicina deportiva. Comprometido con brindar atención médica de excelencia.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={animationVariants.fadeInUp.initial}
              animate={animationVariants.fadeInUp.animate}
              transition={{ ...animationVariants.fadeInUp.transition, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/citas">
                <Button
                  size="lg"
                  variant="medical"
                  className="group w-full sm:w-auto"
                >
                  Agendar Consulta
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="tel:+525512345678">
                <Button
                  size="lg"
                  variant="medical-outline"
                  className="group w-full sm:w-auto hover:bg-medical-light"
                  style={{
                    ['--tw-bg-opacity' as any]: '1',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--medical-light)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <Phone className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Llamar Ahora
                </Button>
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={animationVariants.fadeInUp.initial}
              animate={animationVariants.fadeInUp.animate}
              transition={{ ...animationVariants.fadeInUp.transition, delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={`${stat.label}-${index}`}
                  initial={animationVariants.scaleIn.initial}
                  animate={animationVariants.scaleIn.animate}
                  transition={{ 
                    ...animationVariants.scaleIn.transition, 
                    delay: 1 + index * 0.1 
                  }}
                  className="text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex justify-center mb-3">
                    <div
                      className="p-3 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: "var(--medical-white)" }}
                    >
                      <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: "var(--medical-primary)" }}>
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm font-medium" style={{ color: "var(--medical-secondary)" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Carousel Section */}
          <motion.div
            initial={animationVariants.slideInRight.initial}
            animate={animationVariants.slideInRight.animate}
            transition={animationVariants.slideInRight.transition}
            className="relative"
          >
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl focus:outline-none"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                style={{ 
                  outline: 'none',
                  border: 'none',
                  backgroundColor: 'var(--medical-white)'
                }}
              >
                {/* Contenedor cuadrado 1:1 */}
                <div className="relative w-full aspect-square">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImage}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: 'var(--medical-light)' }}
                    >
                      <Image
                        src={optimizedImages[currentImage].src}
                        alt={optimizedImages[currentImage].alt}
                        fill
                        className="object-contain" // Cambiado de object-cover a object-contain para centrar
                        priority={optimizedImages[currentImage].priority}
                        placeholder="blur"
                        blurDataURL={optimizedImages[currentImage].srcLow}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 600px"
                        style={{ 
                          outline: 'none', 
                          border: 'none'
                        }}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ 
                          background: `linear-gradient(to top, rgba(3, 105, 161, 0.1) 0%, transparent 100%)` 
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={prevImage}
                    className="p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ 
                      backgroundColor: "var(--medical-white)", 
                      color: "var(--medical-primary)",
                      border: 'none'
                    }}
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    style={{ 
                      backgroundColor: "var(--medical-white)", 
                      color: "var(--medical-primary)",
                      border: 'none'
                    }}
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {optimizedImages.map((_, index) => (
                    <button
                      key={`indicator-${index}`}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        index === currentImage ? "scale-125" : "opacity-60 hover:opacity-80"
                      }`}
                      style={{ 
                        backgroundColor: "var(--medical-white)",
                        border: 'none'
                      }}
                      aria-label={`Ir a imagen ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Background Decorations */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute -bottom-6 -right-6 w-full h-full rounded-2xl -z-10 shadow-xl"
              style={{
                background: `linear-gradient(135deg, var(--medical-primary) 0%, var(--medical-secondary) 100%)`,
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -top-4 -left-4 w-24 h-24 rounded-full -z-20"
              style={{ backgroundColor: "var(--medical-light)" }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="absolute top-1/2 -right-8 w-16 h-16 rounded-full -z-20"
              style={{ backgroundColor: "var(--medical-neutral)" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}