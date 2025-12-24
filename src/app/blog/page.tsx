import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import BlogHero from '@/components/blog/blog-hero'
import ArticleCard from '@/components/blog/article-card'
import { getArticles } from '@/lib/articles'

export const metadata = {
  title: 'Blog & Artikel - HaloTekno',
  description:
    'Tips, trik, dan panduan seputar servis HP, sparepart, dan teknologi terkini dari para ahli HaloTekno',
  keywords:
    'blog servis hp, tips smartphone, panduan reparasi hp, artikel teknologi',
  openGraph: {
    title: 'Blog & Artikel - HaloTekno',
    description:
      'Tips, trik, dan panduan seputar servis HP, sparepart, dan teknologi terkini',
    type: 'website',
  },
}

export default function BlogPage() {
  const articles = getArticles()

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 text-gray-900">
      <Navbar variant="light" />
      <main className="pt-16">
        <BlogHero />

        {/* Articles Grid */}
        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Artikel Terbaru
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Baca artikel pilihan dari para ahli kami
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer variant="light" />
    </div>
  )
}
