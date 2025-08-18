import type React from "react"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import "./globals.css"
/*import Chatbot from "@/components/chatbot"*/
/* import ScrollToTop from "@/components/scroll-to-top" */

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
})

export const metadata: Metadata = {
  title: {
    default: "Dr. Gil Bocardo - Ortopedia y Traumatología | Ciudad de México",
    template: "%s | Dr. Gil Bocardo - Ortopedia y Traumatología",
  },
  description:
    "Dr. Gil Bocardo, especialista certificado en Ortopedia y Traumatología con más de 15 años de experiencia. Tratamientos avanzados para lesiones deportivas, fracturas, artroscopia y cirugía de columna en Ciudad de México.",
  keywords: [
    "ortopedia Ciudad de México",
    "traumatología CDMX",
    "cirugía ortopédica",
    "lesiones deportivas",
    "fracturas",
    "artroscopia",
    "Dr. Gil Bocardo",
    "ortopedista",
    "medicina deportiva",
    "cirugía de columna",
    "dolor de espalda",
    "rehabilitación ortopédica",
  ],
  authors: [{ name: "Dr. Gil Bocardo", url: "https://ortopediagilbocardo.com" }],
  creator: "Dr. Gil Bocardo",
  publisher: "Consultorio Dr. Gil Bocardo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ortopediagilbocardo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dr. Gil Bocardo - Ortopedia y Traumatología",
    description:
      "Especialista certificado en Ortopedia y Traumatología con más de 15 años de experiencia. Atención personalizada en Ciudad de México.",
    url: "https://ortopediagilbocardo.com",
    siteName: "Dr. Gil Bocardo - Ortopedia y Traumatología",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dr. Gil Bocardo - Especialista en Ortopedia y Traumatología",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Gil Bocardo - Ortopedia y Traumatología",
    description: "Especialista certificado en Ortopedia y Traumatología con más de 15 años de experiencia.",
    images: ["/og-image.png"],
    creator: "@DrGilBocardo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
}

// JSON-LD Schema for Medical Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "@id": "https://ortopediagilbocardo.com/#organization",
  name: "Dr. Gil Bocardo - Ortopedia y Traumatología",
  url: "https://ortopediagilbocardo.com",
  logo: "https://ortopediagilbocardo.com/logo.png",
  image: "https://ortopediagilbocardo.com/og-image.png",
  description:
    "Especialista certificado en Ortopedia y Traumatología con más de 15 años de experiencia en Ciudad de México.",
  medicalSpecialty: ["Orthopedic Surgery", "Trauma Surgery", "Sports Medicine", "Arthroscopy", "Spine Surgery"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Insurgentes Sur 1234",
    addressLocality: "Ciudad de México",
    addressRegion: "CDMX",
    postalCode: "03100",
    addressCountry: "MX",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 19.4326,
    longitude: -99.1332,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+52-55-1234-5678",
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
    areaServed: "MX",
  },
  openingHours: ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
  priceRange: "$$",
  paymentAccepted: ["Cash", "Credit Card", "Insurance"],
  currenciesAccepted: "MXN",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Ortopedia",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Consulta de Ortopedia",
          description: "Evaluación y diagnóstico de problemas ortopédicos",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Artroscopia",
          description: "Cirugía mínimamente invasiva para articulaciones",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: "Medicina Deportiva",
          description: "Tratamiento especializado para lesiones deportivas",
        },
      },
    ],
  },
  founder: {
    "@type": "Person",
    "@id": "https://ortopediagilbocardo.com/#doctor",
    name: "Dr. Gil Bocardo",
    jobTitle: "Especialista en Ortopedia y Traumatología",
    worksFor: {
      "@id": "https://ortopediagilbocardo.com/#organization",
    },
    alumniOf: "Universidad Nacional Autónoma de México",
    memberOf: "Colegio Mexicano de Ortopedia y Traumatología",
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Medical Specialty",
        educationalLevel: "Specialist",
        recognizedBy: "Consejo Mexicano de Ortopedia y Traumatología",
      },
    ],
  },
  sameAs: [
    "https://www.facebook.com/DrGilBocardo",
    "https://www.instagram.com/DrGilBocardo",
    "https://www.linkedin.com/in/gil-bocardo",
    "https://twitter.com/DrGilBocardo",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <link rel="canonical" href="https://ortopediagilbocardo.com" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body 
        className="font-sans antialiased"
        suppressHydrationWarning={true}
      >
        {children}
        {/* <Chatbot /> */}
        {/* <ScrollToTop /> */}
      </body>
    </html>
  )
}