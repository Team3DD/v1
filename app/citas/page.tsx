import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { Calendar, Clock, CheckCircle, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Agendar Cita - Dr. Gil Bocardo | Ortopedia y Traumatología",
  description:
    "Agende su cita con el Dr. Gil Bocardo, especialista en ortopedia y traumatología. Atención personalizada y profesional en Ciudad de México.",
  keywords: "agendar cita ortopedista, consulta traumatología, Dr. Gil Bocardo, cita médica",
}

export default function AppointmentPage() {
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
            {/* Information */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6" style={{ color: "var(--medical-primary)" }}>
                Información Importante
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="h-6 w-6 mt-1" style={{ color: "var(--medical-primary)" }} />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
                      Disponibilidad
                    </h3>
                    <p style={{ color: "var(--medical-secondary)" }}>
                      Las citas están disponibles de lunes a viernes de 9:00 a 18:00 y sábados de 9:00 a 14:00.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 mt-1" style={{ color: "var(--medical-primary)" }} />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
                      Duración
                    </h3>
                    <p style={{ color: "var(--medical-secondary)" }}>
                      Las consultas tienen una duración aproximada de 45 minutos para primera vez y 30 minutos para
                      seguimiento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 mt-1" style={{ color: "var(--medical-primary)" }} />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
                      Qué Traer
                    </h3>
                    <ul className="space-y-1" style={{ color: "var(--medical-secondary)" }}>
                      <li>• Identificación oficial</li>
                      <li>• Estudios médicos previos (rayos X, resonancias, etc.)</li>
                      <li>• Lista de medicamentos actuales</li>
                      <li>• Tarjeta de seguro médico (si aplica)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 mt-1" style={{ color: "var(--medical-primary)" }} />
                  <div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--medical-primary)" }}>
                      Política de Cancelación
                    </h3>
                    <p style={{ color: "var(--medical-secondary)" }}>
                      Por favor, cancele o reprograme su cita con al menos 24 horas de anticipación.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Form */}
            <div>
              <ContactForm type="appointment" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
