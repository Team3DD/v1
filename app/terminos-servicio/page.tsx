import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, FileCheck, AlertTriangle, Users, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Términos de Servicio | Dr. Gil Bocardo - Ortopedia y Traumatología",
  description:
    "Términos y condiciones de uso de los servicios médicos del Dr. Gil Bocardo, especialista en ortopedia y traumatología.",
  keywords: "términos servicio, condiciones uso, ortopedia, Dr. Gil Bocardo, servicios médicos",
}

export default function TerminosServicio() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--medical-neutral)" }}>
      {/* Header */}
      <div className="py-16" style={{ backgroundColor: "var(--medical-secondary)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-white hover:text-gray-200 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <FileCheck className="h-8 w-8 text-white" />
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white">Términos de Servicio</h1>
          </div>
          <p className="text-xl text-gray-200">Condiciones de uso de nuestros servicios médicos</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                <strong>Última actualización:</strong> Enero 2024
              </p>
              <p className="text-gray-700 leading-relaxed">
                Estos términos y condiciones regulan el uso de los servicios médicos proporcionados por el Dr. Gil
                Bocardo, especialista en Ortopedia y Traumatología, así como el uso de este sitio web.
              </p>
            </div>

            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6" style={{ color: "var(--medical-secondary)" }} />
                <h2 className="text-2xl font-serif font-bold" style={{ color: "var(--medical-secondary)" }}>
                  Aceptación de Términos
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  Al utilizar nuestros servicios médicos o acceder a este sitio web, usted acepta estar sujeto a estos
                  términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar
                  nuestros servicios.
                </p>
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en
                  vigor inmediatamente después de su publicación en este sitio web.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="h-6 w-6" style={{ color: "var(--medical-secondary)" }} />
                <h2 className="text-2xl font-serif font-bold" style={{ color: "var(--medical-secondary)" }}>
                  Servicios Médicos
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold">Servicios Ofrecidos</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consultas especializadas en ortopedia y traumatología</li>
                  <li>Cirugías ortopédicas y procedimientos artroscópicos</li>
                  <li>Medicina deportiva y rehabilitación</li>
                  <li>Tratamiento de fracturas y lesiones traumáticas</li>
                  <li>Seguimiento post-operatorio y terapia física</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6">Limitaciones</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Los servicios están limitados al ámbito de la ortopedia y traumatología</li>
                  <li>No proporcionamos servicios de emergencia las 24 horas</li>
                  <li>Algunos procedimientos pueden requerir derivación a otros especialistas</li>
                  <li>Los resultados médicos no están garantizados y pueden variar</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-secondary)" }}>
                Citas y Cancelaciones
              </h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold">Política de Citas</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Las citas deben agendarse con al menos 24 horas de anticipación</li>
                  <li>Se requiere confirmación 24 horas antes de la cita</li>
                  <li>La puntualidad es esencial para mantener el horario de todos los pacientes</li>
                  <li>Llegadas tardías de más de 15 minutos pueden resultar en reprogramación</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4">Cancelaciones</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancelaciones deben realizarse con al menos 24 horas de anticipación</li>
                  <li>Cancelaciones tardías o no presentarse pueden incurrir en cargos</li>
                  <li>Emergencias médicas están exentas de cargos por cancelación</li>
                  <li>Reprogramaciones están sujetas a disponibilidad</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-secondary)" }}>
                Responsabilidades del Paciente
              </h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar información médica completa y precisa</li>
                  <li>Seguir las instrucciones de tratamiento y medicación</li>
                  <li>Asistir a todas las citas programadas</li>
                  <li>Informar sobre cambios en su condición médica</li>
                  <li>Realizar pagos de manera oportuna</li>
                  <li>Respetar al personal médico y otros pacientes</li>
                  <li>Mantener la confidencialidad de otros pacientes</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-secondary)" }}>
                Pagos y Facturación
              </h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Los pagos son requeridos al momento del servicio</li>
                  <li>Aceptamos efectivo, tarjetas de crédito/débito y transferencias</li>
                  <li>Los precios pueden cambiar sin previo aviso</li>
                  <li>Las facturas se proporcionan para efectos fiscales</li>
                  <li>Los seguros médicos son responsabilidad del paciente</li>
                  <li>Pagos atrasados pueden incurrir en intereses</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="h-6 w-6" style={{ color: "var(--medical-secondary)" }} />
                <h2 className="text-2xl font-serif font-bold" style={{ color: "var(--medical-secondary)" }}>
                  Limitación de Responsabilidad
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  El Dr. Gil Bocardo y su equipo médico se comprometen a proporcionar atención médica de la más alta
                  calidad siguiendo los estándares profesionales establecidos.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>No garantizamos resultados específicos de tratamientos</li>
                  <li>Los riesgos médicos inherentes serán explicados antes de procedimientos</li>
                  <li>La responsabilidad está limitada al ámbito de la práctica médica</li>
                  <li>No somos responsables por complicaciones fuera de nuestro control</li>
                  <li>El seguro de responsabilidad profesional cubre nuestra práctica</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-secondary)" }}>
                Uso del Sitio Web
              </h2>
              <div className="space-y-4 text-gray-700">
                <ul className="list-disc pl-6 space-y-2">
                  <li>El contenido es solo para fines informativos</li>
                  <li>No reemplaza la consulta médica profesional</li>
                  <li>Prohibido el uso comercial sin autorización</li>
                  <li>Respete los derechos de autor y propiedad intelectual</li>
                  <li>No publique contenido ofensivo o inapropiado</li>
                  <li>Mantenga la seguridad de sus credenciales de acceso</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-secondary)" }}>
                Confidencialidad Médica
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Mantenemos estricta confidencialidad de toda información médica conforme a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ley General de Salud de México</li>
                  <li>Normas Oficiales Mexicanas en materia de salud</li>
                  <li>Código de Ética Médica</li>
                  <li>Ley Federal de Protección de Datos Personales</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-secondary)" }}>
                Contacto y Quejas
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Para consultas sobre estos términos o presentar quejas:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>
                    <strong>Dr. Gil Bocardo</strong>
                  </p>
                  <p>San Ángel Inn Consultorio 1406 – Satélite</p>
                  <p>Circuito Centro Comercial No.20</p>
                  <p>Ciudad Satélite, Naucalpan de Juárez, EDOMEX</p>
                  <p>
                    Email:{" "}
                    <Link href="mailto:contacto@ortopediagilbocardo.com" className="text-blue-600 hover:underline">
                      contacto@ortopediagilbocardo.com
                    </Link>
                  </p>
                  <p>Teléfono: +52 (55) 1234-5678</p>
                </div>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                Estos términos se rigen por las leyes de México. Cualquier disputa será resuelta en los tribunales
                competentes del Estado de México.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
