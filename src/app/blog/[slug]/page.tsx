import { notFound } from 'next/navigation'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import ArticleHero from '@/components/blog/article-hero'
import ArticleContent from '@/components/blog/article-content'
import { getArticleBySlug, getArticles } from '@/lib/articles'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan - HaloTekno',
    }
  }

  return {
    title: `${article.title} - HaloTekno Blog`,
    description: article.excerpt,
    keywords: article.tags.join(', '),
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
      type: 'article',
      publishedTime: article.publishDate,
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 text-gray-900">
      <Navbar variant="light" />
      <main className="pt-16">
        <ArticleHero article={article} />
        <ArticleContent content={article.content} />

        {/* Tags */}
        <section className="border-t border-gray-200 py-12">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h3 className="mb-4 text-lg font-bold text-gray-900">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer variant="light" />
    </div>
  )
}
