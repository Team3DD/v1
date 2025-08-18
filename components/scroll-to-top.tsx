"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ 
            y: -2, 
            scale: 1.1,
            backgroundColor: "var(--medical-primary)",
            color: "white"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="
            inline-flex items-center justify-center
            w-12 h-12 
            rounded-full 
            border-2 
            transition-all duration-300 ease-in-out
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500
            focus:ring-offset-2
            shadow-lg
            backdrop-blur-sm
            hover:shadow-xl
          "
          style={{
            backgroundColor: "white",
            borderColor: "var(--medical-primary)",
            color: "var(--medical-primary)",
            // Eliminamos cualquier shadow o outline extraño
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            outline: "none",
            WebkitTapHighlightColor: "transparent" // Elimina highlight en mobile
          }}
          aria-label="Volver arriba"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}