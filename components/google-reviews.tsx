"use client"

import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"

interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
  authorImage?: string
}

// Datos de ejemplo - Reemplaza con tus reseñas reales
const SAMPLE_REVIEWS: Review[] = [
  {
    id: "1",
    author: "María González",
    rating: 5,
    text: "Excelente atención del Dr. Gil Bocardo. Me operó la rodilla y la recuperación fue increíble. Muy profesional y humano.",
    date: "Hace 2 semanas",
    authorImage: "https://ui-avatars.com/api/?name=Maria+Gonzalez&background=0369a1&color=fff"
  },
  {
    id: "2",
    author: "Carlos Ramírez",
    rating: 5,
    text: "El mejor ortopedista de la CDMX. Solucionó mi problema de columna que llevaba años arrastrando. Totalmente recomendado.",
    date: "Hace 1 mes",
    authorImage: "https://ui-avatars.com/api/?name=Carlos+Ramirez&background=0891b2&color=fff"
  },
  {
    id: "3",
    author: "Ana Martínez",
    rating: 5,
    text: "Tratamiento para lesión deportiva excepcional. El doctor explica todo con detalle y el seguimiento es impecable.",
    date: "Hace 1 mes",
    authorImage: "https://ui-avatars.com/api/?name=Ana+Martinez&background=3b82f6&color=fff"
  },
  {
    id: "4",
    author: "Roberto Silva",
    rating: 5,
    text: "Cirugía de hombro exitosa. El Dr. Bocardo es muy paciente y explica todo el proceso. Las instalaciones son de primera.",
    date: "Hace 2 meses",
    authorImage: "https://ui-avatars.com/api/?name=Roberto+Silva&background=0369a1&color=fff"
  },
  {
    id: "5",
    author: "Laura Fernández",
    rating: 5,
    text: "Consulta muy profesional y completa. Me siento en las mejores manos para mi tratamiento de rodilla.",
    date: "Hace 2 meses",
    authorImage: "https://ui-avatars.com/api/?name=Laura+Fernandez&background=0891b2&color=fff"
  },
  {
    id: "6",
    author: "Jorge Mendoza",
    rating: 5,
    text: "Atención personalizada y resultados excelentes. El doctor se toma el tiempo necesario para cada paciente.",
    date: "Hace 3 meses",
    authorImage: "https://ui-avatars.com/api/?name=Jorge+Mendoza&background=3b82f6&color=fff"
  }
]

interface GoogleReviewsProps {
  reviews?: Review[]
  maxReviews?: number
  showHeader?: boolean
}

export default function GoogleReviews({ 
  reviews = SAMPLE_REVIEWS, 
  maxReviews = 6,
  showHeader = true 
}: GoogleReviewsProps) {
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setDisplayedReviews(reviews.slice(0, maxReviews))
  }, [reviews, maxReviews])

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  const totalReviews = reviews.length

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ))
  }

  return (
    <section 
    id="reviews"
    className="py-16 md:py-24 bg-medical-neutral">
      <div className="container mx-auto px-4 md:px-6">
        {showHeader && (
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Lo Que Dicen Nuestros{" "}
              <span className="text-medical-primary">Pacientes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Testimonios reales de pacientes satisfechos con nuestros servicios
            </p>
            
            {/* Rating Summary */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {renderStars(Math.round(averageRating))}
              </div>
              <div className="text-left">
                <p className="text-3xl font-bold text-foreground">
                  {averageRating.toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {totalReviews} reseñas
                </p>
              </div>
            </div>

            {/* Google Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium text-foreground">
                Reseñas de Google
              </span>
            </div>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedReviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 text-medical-light mb-4" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {renderStars(review.rating)}
              </div>

              {/* Review Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                {review.text}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={review.authorImage || `https://ui-avatars.com/api/?name=${review.author}&background=0369a1&color=fff`}
                  alt={review.author}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground">
                    {review.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {review.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="https://maps.app.goo.gl/NQwjoaLk4gBa6Q3u6"
            /* href="https://g.page/r/TU_LINK_DE_GOOGLE/review" */
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-medical"
          >
            <Star className="w-5 h-5" />
            Déjanos tu Reseña en Google
          </a>
        </div>
      </div>
    </section>
  )
}
