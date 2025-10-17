"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Award, Users, Clock, Shield, ArrowRight, Phone, ChevronLeft, ChevronRight } from "lucide-react"

// Configuración de Cloudinary
const CLOUDINARY_CONFIG = {
  cloudName: "dzidbhqli",
  baseUrl: "https://res.cloudinary.com/dzidbhqli/image/upload",
  transformations: {
    auto_quality: "q_auto",
    auto_format: "f_auto",
    optimize: "c_scale,w_1000",
    responsive: "c_fill,w_600,h_600,g_center"
  }
}

const generateCloudinaryUrl = (publicId: string, transformations: string[] = []) => {
  const baseTransforms = [
    CLOUDINARY_CONFIG.transformations.auto_quality,
    CLOUDINARY_CONFIG.transformations.auto_format,
    CLOUDINARY_CONFIG.transformations.optimize
  ]
  const allTransforms = [...baseTransforms, ...transformations].join(",")
  return `${CLOUDINARY_CONFIG.baseUrl}/${allTransforms}/${publicId}`
}

const carouselImages = [
  { publicId: "12-LEO00628_x05ipg.jpg", alt: "Consulta médica ortopédica profesional", priority: true },
  { publicId: "logo_lq8w89.png", alt: "Equipo médico especializado en ortopedia", priority: false },
  { publicId: "8-LEO00527_dxywek.jpg", alt: "Rehabilitación y fisioterapia ortopédica", priority: false },
  { publicId: "9-LEO00550_wxobwz.jpg", alt: "Cirugía artroscópica moderna", priority: false },
  { publicId: "3-LEO00469_x9ptjp.jpg", alt: "Medicina deportiva y traumatología", priority: false },
]

const statsData = [
  { icon: Award, number: "15+", label: "Años de Experiencia", color: "var(--medical-primary)" },
  { icon: Users, number: "5000+", label: "Pacientes Atendidos", color: "var(--medical-secondary)" },
  { icon: Clock, number: "24/7", label: "Urgencias", color: "var(--medical-primary)" },
  { icon: Shield, number: "100%", label: "Certificado", color: "var(--medical-secondary)" },
]

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const optimizedImages = useMemo(() => 
    carouselImages.map(img => ({
      ...img,
      src: generateCloudinaryUrl(img.publicId, ["c_fill,w_600,h_600,g_center"]),
      srcLow: generateCloudinaryUrl(img.publicId, ["c_scale,w_100", "q_auto:low", "g_center", "e_blur:1000"])
    })),
    []
  )

  // Activar componente después del mount
  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => setIsAutoPlaying(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Control automático del carrusel
  useEffect(() => {
    if (!isMounted || !isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isMounted, isAutoPlaying])

  // Navegación con reinicio de autoplay después de 10s
  const handleNavigation = useCallback((action: () => void) => {
    if (!isMounted) return
    action()
    setIsAutoPlaying(false)
    
    const timer = setTimeout(() => setIsAutoPlaying(true), 10000)
    return () => clearTimeout(timer)
  }, [isMounted])

  const nextImage = useCallback(() => {
    handleNavigation(() => setCurrentImage((prev) => (prev + 1) % carouselImages.length))
  }, [handleNavigation])

  const prevImage = useCallback(() => {
    handleNavigation(() => setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length))
  }, [handleNavigation])

  const goToImage = useCallback((index: number) => {
    handleNavigation(() => setCurrentImage(index))
  }, [handleNavigation])

  // Precargar siguiente imagen
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return
    
    const nextIndex = (currentImage + 1) % carouselImages.length
    const img = new window.Image()
    img.src = optimizedImages[nextIndex].src
  }, [currentImage, optimizedImages, isMounted])

  return (
    <section
      className="py-16 lg:py-24 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, var(--medical-neutral) 0%, var(--medical-white) 50%, var(--medical-light) 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Content Section */}
          <div className="w-full max-w-full space-y-6">
            {/* Badge */}
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: "var(--medical-light)", 
                color: "var(--medical-primary)" 
              }}
            >
              <Shield className="h-4 w-4 mr-2" />
              Especialista Certificado
            </div>

            {/* Title */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: "var(--medical-primary)" }}
            >
              Dr. Gil Bocardo
              <span 
                className="block text-3xl sm:text-4xl lg:text-5xl mt-2"
                style={{ color: "var(--medical-secondary)" }}
              >
                Ortopedia y Traumatología
              </span>
            </h1>

            {/* Description */}
            <p 
              className="text-lg sm:text-xl leading-relaxed max-w-2xl"
              style={{ color: "var(--medical-primary)" }}
            >
              Especialista certificado con más de 15 años de experiencia en el tratamiento de lesiones ortopédicas,
              cirugía artroscópica y medicina deportiva. Comprometido con brindar atención médica de excelencia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button 
                className="group w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center hover:shadow-lg hover:scale-105"
                style={{ 
                  backgroundColor: "var(--medical-primary)", 
                  color: "var(--medical-white)" 
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--medical-primary-hover)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--medical-primary)'
                }}
              >
                Agendar Consulta
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="group w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center hover:shadow-md"
                style={{ 
                  border: "2px solid var(--medical-primary)", 
                  color: "var(--medical-primary)",
                  backgroundColor: "transparent"
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
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full pt-6">
              {statsData.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="flex justify-center mb-3">
                    <div 
                      className="p-3 rounded-full shadow-md group-hover:shadow-lg transition-shadow"
                      style={{ backgroundColor: "var(--medical-white)" }}
                    >
                      <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div 
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ color: "var(--medical-primary)" }}
                  >
                    {stat.number}
                  </div>
                  <div 
                    className="text-xs sm:text-sm font-medium"
                    style={{ color: "var(--medical-secondary)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Carousel Section */}
          <div className="relative w-full max-w-full">
            <div className="relative z-10 w-full">
              <div
                className="relative overflow-hidden rounded-2xl shadow-2xl w-full"
                style={{ backgroundColor: "var(--medical-white)" }}
                onMouseEnter={() => isMounted && setIsAutoPlaying(false)}
                onMouseLeave={() => isMounted && setIsAutoPlaying(true)}
              >
                {/* Contenedor cuadrado 1:1 */}
                <div 
                  className="relative w-full aspect-square overflow-hidden"
                  style={{ backgroundColor: "var(--medical-light)" }}
                >
                  {isMounted ? (
                    <div
                      key={currentImage}
                      className="absolute inset-0 flex items-center justify-center w-full h-full animate-fadeIn"
                    >
                      <img
                        src={optimizedImages[currentImage].src}
                        alt={optimizedImages[currentImage].alt}
                        className="w-full h-full object-cover"
                        loading={optimizedImages[currentImage].priority ? "eager" : "lazy"}
                      />
                    </div>
                  ) : (
                    <div 
                      className="absolute inset-0 flex items-center justify-center w-full h-full"
                      style={{ backgroundColor: "var(--medical-light)" }}
                    >
                      <img
                        src={optimizedImages[0].src}
                        alt={optimizedImages[0].alt}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                {isMounted && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                    <button
                      onClick={prevImage}
                      className="pointer-events-auto p-2 rounded-full shadow-lg hover:scale-110 transition-all"
                      style={{ 
                        backgroundColor: "var(--medical-white)", 
                        color: "var(--medical-primary)" 
                      }}
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="pointer-events-auto p-2 rounded-full shadow-lg hover:scale-110 transition-all"
                      style={{ 
                        backgroundColor: "var(--medical-white)", 
                        color: "var(--medical-primary)" 
                      }}
                      aria-label="Siguiente imagen"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>
                )}

                {/* Indicators */}
                {isMounted && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {optimizedImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImage ? "scale-125 opacity-100" : "opacity-60 hover:opacity-80"
                        }`}
                        style={{ backgroundColor: "var(--medical-white)" }}
                        aria-label={`Ir a imagen ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Background Decorations */}
            <div
              className="absolute -bottom-6 -right-6 w-[calc(100%-12px)] h-[calc(100%-12px)] rounded-2xl -z-10 shadow-xl"
              style={{ 
                background: 'linear-gradient(135deg, var(--medical-primary) 0%, var(--medical-secondary) 100%)' 
              }}
            />
            <div 
              className="absolute -top-4 -left-4 w-24 h-24 rounded-full -z-20"
              style={{ backgroundColor: "var(--medical-light)" }}
            />
            <div 
              className="absolute top-1/2 -right-8 w-16 h-16 rounded-full -z-20"
              style={{ backgroundColor: "var(--medical-neutral)" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.05);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}