import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Política de Privacidad | Dr. Gil Bocardo - Ortopedia y Traumatología",
  description:
    "Política de privacidad y protección de datos personales del consultorio del Dr. Gil Bocardo, especialista en ortopedia y traumatología.",
  keywords: "política privacidad, protección datos, ortopedia, Dr. Gil Bocardo, confidencialidad médica",
}

export default function PoliticaPrivacidad() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--medical-neutral)" }}>
      {/* Header */}
      <div className="py-16" style={{ backgroundColor: "var(--medical-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-white hover:text-gray-200 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
          <div className="flex items-center space-x-4 mb-4">
            <Shield className="h-8 w-8 text-white" />
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white">Política de Privacidad</h1>
          </div>
          <p className="text-xl text-gray-200">Protección y tratamiento de datos personales</p>
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
                El Dr. Gil Bocardo, especialista en Ortopedia y Traumatología, se compromete a proteger la privacidad y
                confidencialidad de los datos personales de sus pacientes y usuarios, en cumplimiento con la Ley Federal
                de Protección de Datos Personales en Posesión de los Particulares.
              </p>
            </div>

            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="h-6 w-6" style={{ color: "var(--medical-primary)" }} />
                <h2 className="text-2xl font-serif font-bold" style={{ color: "var(--medical-primary)" }}>
                  Datos que Recopilamos
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Recopilamos los siguientes tipos de información:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Datos de identificación:</strong> Nombre completo, fecha de nacimiento, CURP, RFC
                  </li>
                  <li>
                    <strong>Datos de contacto:</strong> Dirección, teléfono, correo electrónico
                  </li>
                  <li>
                    <strong>Datos médicos:</strong> Historial clínico, diagnósticos, tratamientos, estudios médicos
                  </li>
                  <li>
                    <strong>Datos financieros:</strong> Información de facturación y pagos
                  </li>
                  <li>
                    <strong>Datos de navegación:</strong> Cookies, dirección IP, comportamiento en el sitio web
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="h-6 w-6" style={{ color: "var(--medical-primary)" }} />
                <h2 className="text-2xl font-serif font-bold" style={{ color: "var(--medical-primary)" }}>
                  Uso de la Información
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Utilizamos sus datos personales para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Brindar atención médica especializada y seguimiento de tratamientos</li>
                  <li>Agendar y confirmar citas médicas</li>
                  <li>Comunicarnos sobre su tratamiento y cuidados médicos</li>
                  <li>Procesar pagos y generar facturas</li>
                  <li>Cumplir con obligaciones legales y regulatorias</li>
                  <li>Mejorar nuestros servicios médicos y experiencia del paciente</li>
                  <li>Enviar información relevante sobre salud ortopédica (con su consentimiento)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <Lock className="h-6 w-6" style={{ color: "var(--medical-primary)" }} />
                <h2 className="text-2xl font-serif font-bold" style={{ color: "var(--medical-primary)" }}>
                  Protección de Datos
                </h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Implementamos medidas de seguridad técnicas, físicas y administrativas:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cifrado de datos sensibles y transmisiones seguras</li>
                  <li>Control de acceso restringido al personal autorizado</li>
                  <li>Sistemas de respaldo y recuperación de información</li>
                  <li>Capacitación continua del personal en protección de datos</li>
                  <li>Auditorías regulares de seguridad informática</li>
                  <li>Cumplimiento con estándares internacionales de seguridad médica</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-primary)" }}>
                Sus Derechos ARCO
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Usted tiene derecho a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Acceder</strong> a sus datos personales en nuestro poder
                  </li>
                  <li>
                    <strong>Rectificar</strong> datos inexactos o incompletos
                  </li>
                  <li>
                    <strong>Cancelar</strong> sus datos cuando considere que no son necesarios
                  </li>
                  <li>
                    <strong>Oponerse</strong> al tratamiento de sus datos para fines específicos
                  </li>
                </ul>
                <p>
                  Para ejercer estos derechos, contacte a nuestro Departamento de Datos Personales en{" "}
                  <Link href="mailto:privacidad@ortopediagilbocardo.com" className="text-blue-600 hover:underline">
                    privacidad@ortopediagilbocardo.com
                  </Link>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-primary)" }}>
                Compartir Información
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Sus datos médicos pueden ser compartidos únicamente con:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Otros profesionales médicos involucrados en su tratamiento</li>
                  <li>Laboratorios y centros de diagnóstico autorizados</li>
                  <li>Compañías de seguros (con su autorización expresa)</li>
                  <li>Autoridades sanitarias cuando sea requerido por ley</li>
                </ul>
                <p>
                  <strong>Nunca</strong> vendemos, alquilamos o compartimos sus datos con terceros para fines
                  comerciales.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-primary)" }}>
                Cookies y Tecnologías Web
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Nuestro sitio web utiliza cookies para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mejorar la funcionalidad y experiencia de navegación</li>
                  <li>Analizar el tráfico y uso del sitio web</li>
                  <li>Personalizar contenido y recordar preferencias</li>
                  <li>Facilitar el proceso de agendamiento de citas</li>
                </ul>
                <p>
                  Puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del
                  sitio.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold mb-4" style={{ color: "var(--medical-primary)" }}>
                Contacto
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Para cualquier consulta sobre esta política de privacidad:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p>
                    <strong>Dr. Gil Bocardo</strong>
                  </p>
                  <p>San Ángel Inn Consultorio 1406 – Satélite</p>
                  <p>Circuito Centro Comercial No.20</p>
                  <p>Ciudad Satélite, Naucalpan de Juárez, EDOMEX</p>
                  <p>
                    Email:{" "}
                    <Link href="mailto:privacidad@ortopediagilbocardo.com" className="text-blue-600 hover:underline">
                      privacidad@ortopediagilbocardo.com
                    </Link>
                  </p>
                  <p>Teléfono: +52 (55) 1234-5678</p>
                </div>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                Esta política puede ser actualizada periódicamente. Le notificaremos sobre cambios significativos a
                través de nuestro sitio web o por correo electrónico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
