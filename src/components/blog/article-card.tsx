import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import type { Article } from '@/lib/articles'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <article className="group h-full overflow-hidden rounded-2xl border border-white/50 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {/* Category Badge */}
          <div className="absolute left-4 top-4">
            <span className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 text-sm font-semibold text-white">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 group-hover:text-blue-600 md:text-2xl">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-3 text-gray-600">{article.excerpt}</p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {/* Author */}
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-6 w-6 rounded-full object-cover"
              />
              <span>{article.author.name}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(article.publishDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime} menit</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
