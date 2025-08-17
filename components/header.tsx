"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, MapPin } from "lucide-react"

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
  { href: "#servicios", label: "Servicios" },
  { href: "#sobre-mi", label: "Sobre Mí" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" }
]

// Datos de contacto
const contactInfo = {
  phone: "+52 (55) 1234-5678",
  location: "Ciudad Satélite, Naucalpan",
  hours: "Horarios: Lun-Vie 9:00-18:00 | Sáb 9:00-14:00"
}

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

  // Manejo del scroll optimizado
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 0)
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
      className={`text-gray-700 transition-colors duration-200 hover:text-[var(--medical-secondary)] ${
        isMobile ? "text-base py-2" : ""
      }`}
    >
      {children}
    </Link>
  )

  return (
    <>
      {/* Top Bar */}
      <div
        className={`text-white py-2 transition-all duration-300 ${
          isScrolled ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0"
        }`}
        style={{ backgroundColor: "var(--medical-primary)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span className="hidden xs:inline">{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">{contactInfo.location}</span>
              </div>
            </div>
            <div className="hidden lg:block">
              <span>{contactInfo.hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`transition-all duration-300 border-b ${
          isScrolled 
            ? "fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg" 
            : "bg-white shadow-sm"
        }`}
        style={{ borderColor: "var(--medical-light)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 w-full">
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
                  <div className="relative w-16 h-10 sm:w-20 sm:h-12 lg:w-28 lg:h-16 rounded overflow-hidden bg-transparent">
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
                    className="text-xl sm:text-2xl font-serif font-bold leading-tight group-hover:text-[var(--medical-secondary)] transition-colors duration-200" 
                    style={{ color: "var(--medical-primary)" }}
                  >
                    Dr. Gil Bocardo
                  </span>
                  <span 
                    className="text-xs sm:text-sm hidden sm:block leading-tight" 
                    style={{ color: "var(--medical-secondary)" }}
                  >
                    Ortopedia y Traumatología
                  </span>
                </div>
              </Link>
            </div>

            {/* Sección Derecha: Navegación */}
            <div className="flex items-center">
              {/* Navegación Desktop */}
              <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                {navigationLinks.map((link) => (
                  <NavLink key={link.href} href={link.href}>
                    {link.label}
                  </NavLink>
                ))}
                <Link href="/citas">
                  <Button className="btn-medical transition-all duration-200 hover:scale-105">
                    Agendar Cita
                  </Button>
                </Link>
              </nav>

              {/* Navegación Tablet */}
              <nav className="hidden md:flex lg:hidden items-center space-x-4">
                <Link href="/citas">
                  <Button size="sm" className="btn-medical">
                    Cita
                  </Button>
                </Link>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  onClick={toggleMobileMenu}
                  style={{ color: "var(--medical-primary)" }}
                  aria-label="Abrir menú"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </nav>

              {/* Botón Menú Móvil */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                onClick={toggleMobileMenu}
                style={{ color: "var(--medical-primary)" }}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Menú Móvil */}
          <div 
            className={`md:hidden transition-all duration-300 border-t overflow-hidden ${
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
                  <Button className="btn-medical w-full sm:w-fit">
                    Agendar Cita
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Espaciador para Header Fixed */}
      <div 
        className={`transition-all duration-300 ${
          isScrolled ? "h-16 sm:h-18 lg:h-20" : "h-0"
        }`}
        aria-hidden="true"
      />
    </>
  )
}