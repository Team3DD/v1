interface SEOSchemaProps {
  type: "article" | "medicalArticle" | "faqPage"
  data: any
}

export default function SEOSchema({ type, data }: SEOSchemaProps) {
  let schema = {}

  switch (type) {
    case "medicalArticle":
      schema = {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: data.title,
        description: data.description,
        url: data.url,
        datePublished: data.publishedAt,
        dateModified: data.modifiedAt || data.publishedAt,
        author: {
          "@type": "Person",
          name: data.author,
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
          name: data.medicalCondition,
          description: data.conditionDescription,
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
        mainEntity: data.faqs.map((faq: any) => ({
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
        headline: data.title,
        description: data.description,
        author: {
          "@type": "Person",
          name: data.author,
        },
        datePublished: data.publishedAt,
        dateModified: data.modifiedAt || data.publishedAt,
      }
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
