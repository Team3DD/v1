// Este es un ejemplo de cómo obtener reseñas reales
// Necesitas configurar tu API Key en .env.local

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY
const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID

export async function fetchGoogleReviews() {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${GOOGLE_API_KEY}`
    )
    
    const data = await response.json()
    
    if (data.result && data.result.reviews) {
      return data.result.reviews.map((review: any) => ({
        id: review.time.toString(),
        author: review.author_name,
        rating: review.rating,
        text: review.text,
        date: review.relative_time_description,
        authorImage: review.profile_photo_url
      }))
    }
    
    return []
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return []
  }
}
