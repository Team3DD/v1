"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Phone, Calendar } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `linear-gradient(135deg, var(--medical-neutral) 0%, var(--medical-white) 50%, var(--medical-light) 100%)`,
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-9xl md:text-[12rem] font-bold leading-none" style={{ color: "var(--medical-primary)" }}>
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ color: "var(--medical-primary)" }}>
              Página No Encontrada
            </h2>
            <p className="text-lg md:text-xl mb-6" style={{ color: "var(--medical-secondary)" }}>
              Lo sentimos, la página que está buscando no existe o ha sido movida.
            </p>
            <p className="text-base" style={{ color: "var(--medical-secondary)" }}>
              Pero no se preocupe, podemos ayudarle a encontrar lo que necesita.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/">
              <Button className="btn-medical group w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Ir al Inicio
              </Button>
            </Link>
            <Link href="/citas">
              <Button className="btn-medical-outline group w-full sm:w-auto">
                <Calendar className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                Agendar Consulta
              </Button>
            </Link>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { href: "/", label: "Inicio", icon: Home },
              { href: "/blog", label: "Blog Médico", icon: ArrowLeft },
              { href: "/contacto", label: "Contacto", icon: Phone },
              { href: "/citas", label: "Citas", icon: Calendar },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="block p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                  style={{
                    backgroundColor: "var(--medical-white)",
                    borderColor: "var(--medical-light)",
                  }}
                >
                  <link.icon
                    className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform"
                    style={{ color: "var(--medical-primary)" }}
                  />
                  <span className="text-sm font-medium" style={{ color: "var(--medical-primary)" }}>
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Emergency Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="p-6 rounded-xl border-2"
            style={{
              backgroundColor: "var(--medical-white)",
              borderColor: "var(--medical-light)",
            }}
          >
            <h3 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
              ¿Necesita Atención Médica Urgente?
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--medical-secondary)" }}>
              Para emergencias médicas, no dude en contactarnos inmediatamente.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+525512345678" className="btn-medical inline-flex items-center justify-center">
                <Phone className="mr-2 h-4 w-4" />
                Llamar Ahora
              </a>
              <Link href="/contacto">
                <Button className="btn-medical-outline w-full sm:w-auto">Información de Contacto</Button>
              </Link>
            </div>
          </motion.div>

          {/* Back to Previous Page */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-8"
          >
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-sm transition-colors duration-200 hover:underline"
              style={{ color: "var(--medical-secondary)" }}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Volver a la página anterior
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
