import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog-card"
import { getBlogPost, blogPosts } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Artículo no encontrado - Dr. Gil Bocardo",
    }
  }

  return {
    title: `${post.title} - Dr. Gil Bocardo`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter(
      (p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((tag) => post.tags.includes(tag))),
    )
    .slice(0, 3)

  return (
    <main className="min-h-screen">
      <Header />

      {/* Article Header */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-900 hover:text-blue-700 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Blog
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <Badge className="bg-blue-900 text-white">{post.category}</Badge>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">{post.title}</h1>

            <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-serif font-bold text-gray-900 mt-8 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-serif font-bold text-gray-900 mt-6 mb-3">{children}</h3>
                ),
                h4: ({ children }) => <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">{children}</h4>,
                p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-900 pl-4 italic text-gray-600 my-6">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="border-gray-300 my-8" />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
                GB
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">Dr. Gil Bocardo</h3>
                <p className="text-gray-600 mb-4">
                  Especialista certificado en Ortopedia y Traumatología con más de 15 años de experiencia. Experto en
                  medicina deportiva, artroscopia y cirugía de columna vertebral.
                </p>
                <Button className="bg-blue-900 hover:bg-blue-800">Agendar Consulta</Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Artículos Relacionados</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
