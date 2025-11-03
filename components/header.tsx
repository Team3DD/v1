"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

// Configuración de Cloudinary
const CLOUDINARY_CONFIG = {
  cloudName: "dzidbhqli",
  baseUrl: "https://res.cloudinary.com/dzidbhqli/image/upload",
  transformations: {
    auto_quality: "q_auto",
    auto_format: "f_auto",
    logo_small: "c_fit,w_120,h_40",
    logo_large: "c_fit,w_150,h_50"
  }
}

// Función helper para generar URLs de Cloudinary
const generateCloudinaryUrl = (publicId: string, transformations: string[] = []) => {
  const baseTransforms = [
    CLOUDINARY_CONFIG.transformations.auto_quality,
    CLOUDINARY_CONFIG.transformations.auto_format
  ]
  const allTransforms = [...baseTransforms, ...transformations].join(",")
  return `${CLOUDINARY_CONFIG.baseUrl}/${allTransforms}/${publicId}`
}

// Datos de navegación
const navigationLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#sobre-mi", label: "Sobre Mí" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" }
]

// Tipos para el componente NavLink
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isMobile?: boolean;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // URLs del logo optimizadas
  const logoUrls = useMemo(() => ({
    small: generateCloudinaryUrl("DRGILlogo_r2bbeq.png", [CLOUDINARY_CONFIG.transformations.logo_small]),
    large: generateCloudinaryUrl("DRGILlogo_r2bbeq.png", [CLOUDINARY_CONFIG.transformations.logo_large]),
    lowQuality: generateCloudinaryUrl("DRGILlogo_r2bbeq.png", ["c_fit,w_60,h_20", "q_auto:low"])
  }), [])

  // Manejo del scroll optimizado con threshold más suave
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    setIsScrolled(scrollY > 50) // Mayor threshold para evitar cambios bruscos
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Cerrar menú móvil al cambiar de ruta
  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Toggle del menú móvil
  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  // Componente de navegación reutilizable con tipos
  const NavLink = ({ href, children, isMobile = false }: NavLinkProps) => (
    <Link
      href={href}
      onClick={handleLinkClick}
      className={`text-gray-700 transition-colors duration-300 hover:text-[var(--medical-secondary)] ${
        isMobile ? "text-base py-2" : ""
      }`}
    >
      {children}
    </Link>
  )

  return (
    <>
      {/* Main Header - Sticky */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ease-out border-b ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-lg transform translate-y-0" 
            : "bg-white shadow-sm"
        }`}
        style={{ 
          borderColor: "var(--medical-light)",
          // Transición suave para evitar el efecto rebote
          transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
          willChange: 'transform, background-color, box-shadow'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between w-full transition-all duration-500 ease-out ${
            isScrolled ? "py-2 sm:py-3" : "py-3 sm:py-4"
          }`}>
            {/* Sección Izquierda: Logo + Texto */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Logo y Marca */}
              <Link 
                href="/" 
                className="flex items-center space-x-2 sm:space-x-3 group"
                onClick={handleLinkClick}
              >
                {/* Contenedor del Logo */}
                <div className="relative flex-shrink-0">
                  <div className={`relative rounded overflow-hidden bg-transparent transition-all duration-500 ease-out ${
                    isScrolled 
                      ? "w-12 h-8 sm:w-14 sm:h-9 md:w-16 md:h-10" 
                      : "w-14 h-9 sm:w-16 sm:h-10 md:w-20 md:h-12 lg:w-28 lg:h-16"
                  }`}>
                    <Image
                      src={logoUrls.small}
                      alt="Dr. Gil Bocardo Logo"
                      fill
                      className="object-contain"
                      priority
                      placeholder="blur"
                      blurDataURL={logoUrls.lowQuality}
                      sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 112px"
                    />
                  </div>
                </div>

                {/* Texto de la Marca */}
                <div className="flex flex-col">
                  <span 
                    className={`font-serif font-bold leading-tight group-hover:text-[var(--medical-secondary)] transition-all duration-500 ease-out ${
                      isScrolled 
                        ? "text-base sm:text-lg" 
                        : "text-lg sm:text-xl md:text-2xl"
                    }`}
                    style={{ color: "var(--medical-primary)" }}
                  >
                    Dr. Gil Bocardo
                  </span>
                  <span 
                    className={`hidden sm:block md:hidden lg:block leading-tight transition-all duration-500 ease-out ${
                      isScrolled 
                        ? "text-xs opacity-90" 
                        : "text-xs lg:text-sm opacity-100"
                    }`}
                    style={{ color: "var(--medical-secondary)" }}
                  >
                    Ortopedia y Traumatología
                  </span>
                </div>
              </Link>
            </div>

            {/* Sección Derecha: Navegación */}
            <div className="flex items-center">
              {/* Navegación Desktop (solo pantallas grandes) */}
              <nav className="hidden xl:flex items-center space-x-6 xl:space-x-8">
                {navigationLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
                <Link href="/citas">
                  <Button className={`btn-medical transition-all duration-300 hover:scale-105 ${
                    isScrolled ? "px-4 py-2 text-sm" : ""
                  }`}>
                    Agendar Cita
                  </Button>
                </Link>
              </nav>

              {/* Navegación Tablet y Mobile - Botón Cita + Menú */}
              <nav className="flex xl:hidden items-center space-x-3">
                {/* Botón Cita (oculto en pantallas muy pequeñas) */}
                <div className="hidden xs:block">
                  <Link href="/citas">
                    <Button size="sm" className="btn-medical text-xs px-3 py-2">
                      Cita
                    </Button>
                  </Link>
                </div>
                
                {/* Botón Menú Hamburguesa */}
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  onClick={toggleMobileMenu}
                  style={{ color: "var(--medical-primary)" }}
                  aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </nav>
            </div>
          </div>

          {/* Menú Móvil/Tablet */}
          <div 
            className={`xl:hidden transition-all duration-500 ease-out border-t overflow-hidden ${
              isMenuOpen 
                ? "max-h-96 opacity-100 py-4" 
                : "max-h-0 opacity-0 py-0"
            }`}
            style={{ borderColor: "var(--medical-light)" }}
          >
            <nav className="flex flex-col space-y-1">
              {navigationLinks.map((link) => (
                <NavLink key={link.href} href={link.href} isMobile>
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t" style={{ borderColor: "var(--medical-light)" }}>
                <Link href="/citas" onClick={handleLinkClick}>
                  <Button className="btn-medical w-full">
                    Agendar Cita
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}