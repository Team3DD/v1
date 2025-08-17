import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog-card"
import { blogPosts, getFeaturedPosts, getAllCategories } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Blog - Dr. Gil Bocardo | Artículos de Ortopedia y Traumatología",
  description:
    "Artículos especializados sobre ortopedia, traumatología, medicina deportiva y rehabilitación. Información médica confiable del Dr. Gil Bocardo.",
  keywords: "blog ortopedia, artículos traumatología, medicina deportiva, rehabilitación, lesiones deportivas",
}

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts()
  const categories = getAllCategories()
  const recentPosts = blogPosts.slice(0, 6)

  return (
    <main className="min-h-screen">
      <Header />

      <section
        className="text-white py-16 relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(3, 105, 161, 0.8), rgba(8, 145, 178, 0.8)), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Blog Médico Especializado</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8" style={{ color: "var(--medical-light)" }}>
              Artículos especializados sobre ortopedia, traumatología, medicina deportiva y rehabilitación. Información
              médica confiable basada en evidencia científica.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="text-sm border-white text-white hover:bg-white hover:text-sky-700"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "var(--medical-white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center" style={{ color: "var(--medical-primary)" }}>
              Artículos Destacados
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} featured={true} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16" style={{ backgroundColor: "var(--medical-neutral)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center" style={{ color: "var(--medical-primary)" }}>
            Todos los Artículos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {blogPosts.length > 6 && (
            <div className="text-center mt-12">
              <Button size="lg" className="btn-medical">
                Ver Más Artículos
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 text-white" style={{ backgroundColor: "var(--medical-primary)" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Mantente Informado</h2>
          <p className="text-xl mb-8" style={{ color: "var(--medical-light)" }}>
            Recibe los últimos artículos y consejos médicos directamente en tu correo electrónico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="text-white hover:opacity-90" style={{ backgroundColor: "var(--medical-accent)" }}>
              Suscribirse
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}