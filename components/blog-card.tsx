import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"
import type { BlogPost } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const cardClass = featured
    ? "group hover:shadow-xl transition-all duration-300 border-blue-200 bg-gradient-to-br from-blue-50 to-white"
    : "group hover:shadow-lg transition-all duration-300 border-gray-200"

  return (
    <Card className={cardClass}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={400}
            height={240}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && <Badge className="absolute top-4 left-4 bg-blue-900 text-white">Destacado</Badge>}
          <Badge variant="secondary" className="absolute top-4 right-4 bg-white/90 text-gray-700">
            {post.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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

        <h3
          className={`font-serif font-bold mb-3 group-hover:text-blue-900 transition-colors ${
            featured ? "text-xl" : "text-lg"
          }`}
        >
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-900 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          Leer más →
        </Link>
      </CardContent>
    </Card>
  )
}
