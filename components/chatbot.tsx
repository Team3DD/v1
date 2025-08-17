"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send, FileText, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Aquí se integrará la IA y el PDF local más adelante
      console.log("Mensaje enviado:", message)
      setMessage("")
    }
  }

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 left-6 p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 z-50"
        style={{
          backgroundColor: "var(--medical-accent)",
          color: "var(--medical-white)",
        }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir chat de asistencia"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: "rgba(3, 105, 161, 0.3)", backdropFilter: "blur(4px)" }}
              onClick={toggleChat}
            />

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-24 left-6 w-80 h-96 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
              style={{ backgroundColor: "var(--medical-white)" }}
            >
              {/* Header */}
              <div
                className="p-4 flex items-center justify-between"
                style={{ backgroundColor: "var(--medical-primary)" }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: "var(--medical-light)", color: "var(--medical-primary)" }}
                  >
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Asistente Médico</h3>
                    <p className="text-xs text-gray-200">Consulta información médica</p>
                  </div>
                </div>
                <button
                  onClick={toggleChat}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                  aria-label="Cerrar chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-4 overflow-y-auto" style={{ backgroundColor: "var(--medical-neutral)" }}>
                <div className="space-y-4">
                  {/* Welcome Message */}
                  <div className="flex items-start space-x-3">
                    <div
                      className="p-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--medical-light)", color: "var(--medical-primary)" }}
                    >
                      <Bot className="h-4 w-4" />
                    </div>
                    <div
                      className="max-w-xs p-3 rounded-lg shadow-sm"
                      style={{ backgroundColor: "var(--medical-white)" }}
                    >
                      <p className="text-sm" style={{ color: "var(--medical-primary)" }}>
                        ¡Hola! Soy tu asistente médico virtual. Puedo ayudarte con información sobre ortopedia y
                        traumatología.
                      </p>
                      <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-gray-100">
                        <FileText className="h-3 w-3" style={{ color: "var(--medical-secondary)" }} />
                        <span className="text-xs" style={{ color: "var(--medical-secondary)" }}>
                          Basado en documentación médica
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Placeholder for future messages */}
                  <div className="text-center py-8">
                    <div
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm"
                      style={{ backgroundColor: "var(--medical-light)", color: "var(--medical-secondary)" }}
                    >
                      <FileText className="h-4 w-4" />
                      <span>Próximamente: Integración con IA y PDF médico</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu consulta médica..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 text-sm focus:ring-blue-500"
                    disabled
                  />
                  <button
                    type="submit"
                    disabled
                    className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "var(--medical-accent)", color: "var(--medical-white)" }}
                    aria-label="Enviar mensaje"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
                <p className="text-xs mt-2 text-center" style={{ color: "var(--medical-secondary)" }}>
                  Función en desarrollo - Próximamente disponible
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}