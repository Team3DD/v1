interface SEOSchemaProps {
  type: "article" | "medicalArticle" | "faqPage"
  data: Record<string, unknown>
}

interface FAQItem {
  question: string
  answer: string
}

interface SchemaData extends Record<string, unknown> {
  title?: string
  description?: string
  url?: string
  publishedAt?: string
  modifiedAt?: string
  author?: string
  medicalCondition?: string
  conditionDescription?: string
  faqs?: FAQItem[]
}

export default function SEOSchema({ type, data }: SEOSchemaProps) {
  const schemaData = data as SchemaData
  let schema: Record<string, unknown> = {}

  switch (type) {
    case "medicalArticle":
      schema = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: schemaData.title,
        description: schemaData.description,
        url: schemaData.url,
        datePublished: schemaData.publishedAt,
        dateModified: schemaData.modifiedAt || schemaData.publishedAt,
        author: {
          "@type": "Person",
          name: schemaData.author,
          jobTitle: "Especialista en Ortopedia y Traumatología",
          worksFor: {
            "@type": "MedicalOrganization",
            name: "Dr. Gil Bocardo - Ortopedia y Traumatología",
          },
        },
        publisher: {
          "@type": "MedicalOrganization",
          name: "Dr. Gil Bocardo - Ortopedia y Traumatología",
          logo: {
            "@type": "ImageObject",
            url: "https://ortopediagilbocardo.com/logo.png",
          },
        },
        mainEntity: {
          "@type": "MedicalCondition",
          name: schemaData.medicalCondition,
          description: schemaData.conditionDescription,
        },
        about: {
          "@type": "MedicalSpecialty",
          name: "Orthopedics",
        },
        audience: {
          "@type": "PeopleAudience",
          audienceType: "Patients seeking orthopedic care",
        },
        medicalAudience: {
          "@type": "MedicalAudience",
          audienceType: "Patient",
        },
      }
      break

    case "faqPage":
      schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: schemaData.faqs?.map((faq: FAQItem) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
      break

    default:
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: schemaData.title,
        description: schemaData.description,
        author: {
          "@type": "Person",
          name: schemaData.author,
        },
        datePublished: schemaData.publishedAt,
        dateModified: schemaData.modifiedAt || schemaData.publishedAt,
      }
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}