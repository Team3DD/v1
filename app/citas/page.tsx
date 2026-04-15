"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, Clock, CheckCircle, Users, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

const MapCard = ({ 
  title, 
  address, 
  schedule, 
  mapSrc, 
  googleMapsUrl 
}: { 
  title: string
  address: string
  schedule: string
  mapSrc: string
  googleMapsUrl: string
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="h-80 bg-gray-100 relative">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.2)' }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${title}`}
        />
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 bg-transparent hover:bg-black hover:bg-opacity-5 transition-all duration-300 flex items-center justify-center group"
        >
          <div className="bg-white bg-opacity-90 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-xs font-medium text-gray-700">Abrir en Google Maps</span>
          </div>
        </a>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2 items-end" style={{ backgroundColor: 'var(--medical-light)' }}>
        <div>
          <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--medical-primary)' }}>{title}</h4>
          <p className="text-sm mb-1" style={{ color: 'var(--medical-secondary)' }}>{address}</p>
          <p className="text-sm font-medium" style={{ color: 'var(--medical-secondary)' }}>{schedule}</p>
        </div>
        <div className="flex justify-end">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--medical-accent)', color: 'var(--medical-white)' }}
          >
            <MapPin className="mr-2 h-4 w-4" /> Ver en Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    clinic: "",
    consultationType: "",
    date: "",
    time: "",
    message: "",
  })
  const [greeting, setGreeting] = useState("")
  const [timeOptions, setTimeOptions] = useState<string[]>([])
  const [minDate, setMinDate] = useState("")

  // Obtener fecha mínima (hoy en México) en formato YYYY-MM-DD
  useEffect(() => {
    const now = new Date()
    const mexicoDate = new Date(now.toLocaleString("en-US", { timeZone: "America/Mexico_City" }))
    const year = mexicoDate.getFullYear()
    const month = String(mexicoDate.getMonth() + 1).padStart(2, '0')
    const day = String(mexicoDate.getDate()).padStart(2, '0')
    setMinDate(`${year}-${month}-${day}`)
  }, [])

  // Saludo para urgencias (no usado en este formulario, pero se conserva por si acaso)
  useEffect(() => {
    const getGreeting = () => {
      const now = new Date()
      const mexicoTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Mexico_City" }))
      const hours = mexicoTime.getHours()
      if (hours >= 6 && hours < 12) return "Buenos días"
      if (hours >= 12 && hours < 19) return "Buenas tardes"
      return "Buenas noches"
    }
    setGreeting(getGreeting())
  }, [])

  // Generar opciones de hora según fecha seleccionada (cada 20 min, rango según día)
  useEffect(() => {
    if (!formData.date) {
      setTimeOptions([])
      return
    }
    // Construir fecha local para evitar desfase horario
    const [year, month, day] = formData.date.split('-').map(Number)
    const selectedDate = new Date(year, month - 1, day)
    const dayOfWeek = selectedDate.getDay() // 0 domingo, 1 lunes, ..., 6 sábado

    if (dayOfWeek === 0) {
      setTimeOptions([])
      if (formData.time) setFormData(prev => ({ ...prev, time: "" }))
      return
    }

    const isSaturday = dayOfWeek === 6
    const startHour = 9
    const endHour = isSaturday ? 14 : 18
    const interval = 20
    const times: string[] = []
    for (let hour = startHour; hour <= endHour; hour++) {
      let minute = 0
      while (minute < 60) {
        if (hour === endHour && minute > 0) break
        times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
        minute += interval
      }
    }
    // Agregar explícitamente la hora de cierre si no está incluida
    if (!isSaturday && !times.includes("18:00")) times.push("18:00")
    if (isSaturday && !times.includes("14:00")) times.push("14:00")
    times.sort()
    setTimeOptions(times)
    if (formData.time && !times.includes(formData.time)) {
      setFormData(prev => ({ ...prev, time: "" }))
    }
  }, [formData.date, formData.time])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "date") {
      // Validar que la fecha no sea anterior a hoy (en México)
      if (minDate && value < minDate) {
        alert("No se pueden seleccionar fechas pasadas. Por favor elija una fecha a partir de hoy.")
        return
      }
      // Validar domingo
      const [year, month, day] = value.split('-').map(Number)
      const selectedDate = new Date(year, month - 1, day)
      if (selectedDate.getDay() === 0) {
        alert("Los domingos no hay atención. Por favor seleccione otro día.")
        return
      }
    }
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Construir mensaje de WhatsApp con los datos del formulario y enviar
  const handleWhatsAppSubmit = () => {
  if (!formData.name || !formData.email || !formData.phone || !formData.clinic || !formData.consultationType || !formData.date || !formData.time) {
    alert("Por favor complete todos los campos obligatorios antes de enviar.")
    return
  }

  // Formatear fecha: "Sábado, 17 de abril de 2026"
  const [year, month, day] = formData.date.split('-')
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day))
  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
  const diaSemana = diasSemana[dateObj.getDay()]
  const fechaFormateada = `${diaSemana}, ${day} de ${meses[Number(month)-1]} de ${year}`

  const message = `Hola Dr. Gil Bocardo, me gustaría agendar una cita.

Datos del paciente:
Nombre: ${formData.name}
Correo: ${formData.email}
Teléfono: ${formData.phone}

Detalles de la cita:
Clínica: ${formData.clinic}
Tipo de consulta: ${formData.consultationType}
Fecha: ${fechaFormateada}
Hora: ${formData.time}
Mensaje adicional: ${formData.message || "Ninguno"}

Por favor confirmar disponibilidad.`
  const url = `https://wa.me/525591883839?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}

  const consultoriosData = [
    {
      title: "Hospital San José Satélite",
      address: "Circuito Circunvalación Pte. 53",
      schedule: "Martes y jueves",
      mapSrc: "https://maps.google.com/maps?q=19.5102,-99.2384&t=&z=16&ie=UTF8&output=embed",
      googleMapsUrl: "https://maps.google.com/?q=19.5102,-99.2384"
    },
    {
      title: "Hospital San Ángel Inn Satélite",
      address: "Circuito Centro Comercial No. 20",
      schedule: "Lunes, miércoles y viernes",
      mapSrc: "https://maps.google.com/maps?q=19.5089,-99.2389&t=&z=16&ie=UTF8&output=embed",
      googleMapsUrl: "https://maps.google.com/?q=19.5089,-99.2389"
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section
        className="text-white py-16"
        style={{ background: `linear-gradient(135deg, var(--medical-primary) 0%, var(--medical-secondary) 100%)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Agendar Cita</h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--medical-light)" }}>
              Solicite su consulta con el Dr. Gil Bocardo. Atención especializada en ortopedia y traumatología.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "var(--medical-neutral)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: "var(--medical-primary)" }}>
              Proceso de Cita
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "var(--medical-secondary)" }}>
              Siga estos sencillos pasos para agendar su consulta médica
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center border-2" style={{ borderColor: "var(--medical-light)" }}>
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--medical-primary)" }}
                >
                  <span className="text-white font-bold">1</span>
                </div>
                <CardTitle className="text-lg" style={{ color: "var(--medical-primary)" }}>
                  Complete el Formulario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription style={{ color: "var(--medical-secondary)" }}>
                  Llene el formulario con sus datos personales y motivo de consulta
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2" style={{ borderColor: "var(--medical-light)" }}>
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--medical-primary)" }}
                >
                  <span className="text-white font-bold">2</span>
                </div>
                <CardTitle className="text-lg" style={{ color: "var(--medical-primary)" }}>
                  Confirmación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription style={{ color: "var(--medical-secondary)" }}>
                  Nos pondremos en contacto para confirmar su cita en 24 horas
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2" style={{ borderColor: "var(--medical-light)" }}>
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--medical-primary)" }}
                >
                  <span className="text-white font-bold">3</span>
                </div>
                <CardTitle className="text-lg" style={{ color: "var(--medical-primary)" }}>
                  Preparación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription style={{ color: "var(--medical-secondary)" }}>
                  Reciba instrucciones y prepare la documentación necesaria
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2" style={{ borderColor: "var(--medical-light)" }}>
              <CardHeader>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--medical-primary)" }}
                >
                  <span className="text-white font-bold">4</span>
                </div>
                <CardTitle className="text-lg" style={{ color: "var(--medical-primary)" }}>
                  Consulta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription style={{ color: "var(--medical-secondary)" }}>
                  Asista a su cita y reciba atención médica especializada
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16" style={{ backgroundColor: "var(--medical-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Columna izquierda: Información importante */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6" style={{ color: "var(--medical-primary)" }}>
                Información Importante
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: "var(--medical-primary)" }} />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
                      Disponibilidad
                    </h3>
                    <p className="leading-relaxed" style={{ color: "var(--medical-secondary)" }}>
                      Las citas están disponibles de lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 14:00.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: "var(--medical-primary)" }} />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
                      Duración
                    </h3>
                    <p className="leading-relaxed" style={{ color: "var(--medical-secondary)" }}>
                      Las consultas tienen una duración aproximada de 45 minutos para primera vez y 30 minutos para seguimiento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: "var(--medical-primary)" }} />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
                      Qué Traer
                    </h3>
                    <ul className="space-y-1 leading-relaxed" style={{ color: "var(--medical-secondary)" }}>
                      <li>• Identificación oficial</li>
                      <li>• Estudios médicos previos (rayos X, resonancias, etc.)</li>
                      <li>• Lista de medicamentos actuales</li>
                      <li>• Tarjeta de seguro médico (si aplica)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 flex-shrink-0 mt-1" style={{ color: "var(--medical-primary)" }} />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
                      Política de Cancelación
                    </h3>
                    <p className="leading-relaxed" style={{ color: "var(--medical-secondary)" }}>
                      Por favor, cancele o reprograme su cita con al menos 24 horas de anticipación.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: Formulario */}
            <div>
              <div
                className="rounded-lg shadow-lg p-6 border"
                style={{ backgroundColor: "var(--medical-primary)", borderColor: "var(--medical-light)" }}
              >
                <h3 className="text-2xl font-serif font-bold mb-4 text-white">Solicitar Cita</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">Nombre completo</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                      style={{ borderColor: "var(--medical-light)" }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-200">Correo electrónico</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                        style={{ borderColor: "var(--medical-light)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-200">Teléfono</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                        style={{ borderColor: "var(--medical-light)" }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-200">Tipo de consulta</label>
                      <select
                        name="consultationType"
                        required
                        value={formData.consultationType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                        style={{ borderColor: "var(--medical-light)" }}
                      >
                        <option value="">Seleccione</option>
                        <option value="Primera vez">Primera vez</option>
                        <option value="Seguimiento">Seguimiento</option>
                        <option value="Urgencia">Urgencia</option>
                        <option value="Consulta general">Consulta general</option>
                        <option value="Segunda opinión">Segunda opinión</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-200">Clínica</label>
                      <select
                        name="clinic"
                        required
                        value={formData.clinic}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                        style={{ borderColor: "var(--medical-light)" }}
                      >
                        <option value="">Seleccione</option>
                        <option value="San José Satélite">Consultorio San José Satélite</option>
                        <option value="San Ángel Inn">Consultorio San Ángel Inn - Samará Satélite</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-200">Fecha</label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        min={minDate}
                        className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                        style={{ borderColor: "var(--medical-light)" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-200">Hora</label>
                      <select
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleChange}
                        disabled={timeOptions.length === 0}
                        className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                        style={{ borderColor: "var(--medical-light)" }}
                      >
                        <option value="">Seleccione una hora</option>
                        {timeOptions.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {timeOptions.length === 0 && formData.date && (
                        <p className="text-xs text-red-300 mt-1">No hay horarios disponibles para este día</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-200">Mensaje adicional (opcional)</label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-white text-gray-900"
                      style={{ borderColor: "var(--medical-light)" }}
                    />
                  </div>

                  <p className="text-sm text-gray-300 italic">
                    La cita médica se confirmará únicamente con la confirmación del equipo de OGB una vez revisando la agenda disponible de la semana.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2 justify-center">
                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="inline-flex items-center w-[140px] justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 hover:scale-105 bg-green-600 hover:bg-green-700 text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="h-5 w-5">
                        <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155l14.61-9.74,23,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a87.87,87.87,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216,52.47,178.6a8,8,0,0,0-.66-6.54A88,88,0,1,1,128,216Z"></path>
                      </svg>
                      ¡Enviar!
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sección de mapas: fuera del grid, ancho completo */}
          <div className="mt-16">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center" style={{ color: "var(--medical-primary)" }}>
              Nuestros Consultorios
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {consultoriosData.map((consultorio, index) => (
                <MapCard
                  key={index}
                  title={consultorio.title}
                  address={consultorio.address}
                  schedule={consultorio.schedule}
                  mapSrc={consultorio.mapSrc}
                  googleMapsUrl={consultorio.googleMapsUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}