"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ContactFormProps {
  type?: "contact" | "appointment"
}

export default function ContactForm({ type = "contact" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    appointmentType: "",
    preferredDate: "",
    preferredTime: "",
  })
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const formatWhatsAppMessage = () => {
    const isAppointment = type === "appointment"
    let message = ""
    
    if (isAppointment) {
      message = `*SOLICITUD DE CITA MÉDICA*
🏥 Dr. Gil Bocardo - Traumatólogo y Ortopedista

👤 *Datos del Paciente:*
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}

🩺 *Información de la Consulta:*
• Tipo de consulta: ${getAppointmentTypeText(formData.appointmentType)}
${formData.preferredDate ? `• Fecha preferida: ${formatDate(formData.preferredDate)}` : ''}
${formData.preferredTime ? `• Hora preferida: ${formatTime(formData.preferredTime)}` : ''}

📝 *Descripción:*
${formData.message || 'No especificado'}

---
Solicito agendar una cita médica. Quedo atento a su confirmación.`
    } else {
      message = `*MENSAJE DE CONTACTO*
🏥 Dr. Gil Bocardo - Traumatólogo y Ortopedista

👤 *Datos de Contacto:*
• Nombre: ${formData.name}
• Email: ${formData.email}
• Teléfono: ${formData.phone}
${formData.subject ? `• Asunto: ${formData.subject}` : ''}

📝 *Mensaje:*
${formData.message || 'No especificado'}

---
Espero su respuesta. Gracias por su atención.`
    }
    
    return message
  }

  const getAppointmentTypeText = (value: string) => {
    const types = {
      "primera-vez": "Primera consulta",
      "seguimiento": "Consulta de seguimiento", 
      "cirugia": "Consulta pre-quirúrgica",
      "deportiva": "Medicina deportiva",
      "dolor": "Evaluación de dolor",
      "segunda-opinion": "Segunda opinión"
    }
    return types[value as keyof typeof types] || value
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-MX', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeString: string) => {
    const timeMap = {
      "09:00": "9:00 AM",
      "10:00": "10:00 AM", 
      "11:00": "11:00 AM",
      "12:00": "12:00 PM",
      "14:00": "2:00 PM",
      "15:00": "3:00 PM", 
      "16:00": "4:00 PM",
      "17:00": "5:00 PM"
    }
    return timeMap[timeString as keyof typeof timeMap] || timeString
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Validar campos requeridos
    if (!formData.name || !formData.email || !formData.phone) {
      setSubmitStatus("error")
      return
    }
    
    if (type === "appointment" && !formData.appointmentType) {
      setSubmitStatus("error") 
      return
    }

    try {
      const whatsappMessage = formatWhatsAppMessage()
      const encodedMessage = encodeURIComponent(whatsappMessage)
      const whatsappURL = `https://wa.me/5255918838398?text=${encodedMessage}`
      
      // Abrir WhatsApp en nueva ventana
      window.open(whatsappURL, '_blank')
      
      setSubmitStatus("success")
      
      // Limpiar formulario después de 3 segundos
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          appointmentType: "",
          preferredDate: "",
          preferredTime: "",
        })
        setSubmitStatus("idle")
      }, 3000)
      
    } catch (error) {
      setSubmitStatus("error")
    }
  }

  const isAppointment = type === "appointment"

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-blue-900">
          {isAppointment ? "Agendar Cita" : "Contacto"}
        </CardTitle>
        <CardDescription>
          {isAppointment
            ? "Complete el formulario para solicitar una cita médica vía WhatsApp"
            : "Envíenos un mensaje vía WhatsApp y nos pondremos en contacto con usted"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus === "success" && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {isAppointment
                ? "WhatsApp se ha abierto con su solicitud de cita. Complete el envío en la aplicación."
                : "WhatsApp se ha abierto con su mensaje. Complete el envío en la aplicación."}
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === "error" && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Por favor complete todos los campos obligatorios antes de continuar.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Su nombre completo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="su@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+52 (55) 1234-5678"
            />
          </div>

          {isAppointment ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="appointmentType">Tipo de consulta *</Label>
                <Select onValueChange={(value) => handleSelectChange("appointmentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primera-vez">Primera consulta</SelectItem>
                    <SelectItem value="seguimiento">Consulta de seguimiento</SelectItem>
                    <SelectItem value="cirugia">Consulta pre-quirúrgica</SelectItem>
                    <SelectItem value="deportiva">Medicina deportiva</SelectItem>
                    <SelectItem value="dolor">Evaluación de dolor</SelectItem>
                    <SelectItem value="segunda-opinion">Segunda opinión</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Fecha preferida</Label>
                  <Input
                    id="preferredDate"
                    name="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Hora preferida</Label>
                  <Select onValueChange={(value) => handleSelectChange("preferredTime", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione horario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                      <SelectItem value="17:00">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="subject">Asunto</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Motivo de su consulta"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">
              {isAppointment ? "Descripción de síntomas o motivo de consulta" : "Mensaje"}
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder={
                isAppointment
                  ? "Describa brevemente sus síntomas o el motivo de la consulta..."
                  : "Escriba su mensaje aquí..."
              }
            />
          </div>

          <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700">
            {isAppointment ? "Enviar por WhatsApp 📱" : "Enviar Mensaje por WhatsApp 📱"}
          </Button>
        </div>

        {/* Contact Information */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Dr. Gil Bocardo - Información de Contacto</h3>
          <p className="text-sm text-gray-600 mb-4 font-medium">Traumatólogo y Ortopedista - Sub Especialista en reemplazo articular cadera y rodilla</p>
          
          <div className="space-y-4">
            {/* Urgencias */}
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">🚨 Urgencias Médicas</h4>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-orange-600" />
                <span className="font-medium">55 2343 1295</span>
              </div>
            </div>         
          </div>
        </div>
      </CardContent>
    </Card>
  )
}