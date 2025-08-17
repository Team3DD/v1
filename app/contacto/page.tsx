"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { MapPin } from "lucide-react"

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
      {/* Map Container - Iframe limpio */}
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
        {/* Overlay para click directo a Google Maps */}
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

      {/* Card Footer - Dos Columnas */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2 items-end" style={{ backgroundColor: 'var(--medical-light)' }}>
        {/* Columna Izquierda - Información */}
        <div>
          <h4 className="font-bold text-lg mb-1" style={{ color: 'var(--medical-primary)' }}>
            {title}
          </h4>
          <p className="text-sm mb-1" style={{ color: 'var(--medical-secondary)' }}>
            {address}
          </p>
          <p className="text-sm font-medium" style={{ color: 'var(--medical-secondary)' }}>
            {schedule}
          </p>
        </div>
        
        {/* Columna Derecha - Botón */}
        <div className="flex justify-end">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'var(--medical-accent)',
              color: 'var(--medical-white)'
            }}
          >
            <MapPin className="mr-2 h-4 w-4" />
            Ver en Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
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

      {/* Hero Section */}
      <section
        className="text-white py-16 relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(3, 105, 161, 0.85), rgba(8, 145, 178, 0.85)), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Contacto</h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: "var(--medical-light)" }}>
              Dr. Gil Bocardo - Traumatólogo y Ortopedista
              <br />
              <span className="text-lg">Sub Especialista en reemplazo articular cadera y rodilla</span>
            </p>
          </div>
        </div>
      </section>

      {/* Header Section */}
      <section className="py-12" style={{ backgroundColor: "var(--medical-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: "var(--medical-primary)" }}>
              Nuestros Consultorios
            </h2>
            <p className="text-lg" style={{ color: "var(--medical-secondary)" }}>
              Contamos con dos consultorios equipados para brindarle la mejor atención médica especializada.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16" style={{ backgroundColor: "var(--medical-white)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Maps Column */}
            <div className="space-y-8">
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
            
            {/* Contact Form Column */}
            <div className="lg:sticky lg:top-24">
              <ContactForm type="contact" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}