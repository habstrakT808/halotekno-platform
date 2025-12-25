'use client'

interface ArticleContentProps {
  content: string
}

export default function ArticleContent({ content }: ArticleContentProps) {
  return (
    <div className="prose prose-lg prose-gray mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
      />

      <style jsx global>{`
        .article-content {
          color: #374151;
          line-height: 1.75;
        }

        .article-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .article-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .article-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .article-content p {
          margin-bottom: 1.25rem;
        }

        .article-content ul,
        .article-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }

        .article-content li {
          margin-bottom: 0.5rem;
        }

        .article-content strong {
          font-weight: 600;
          color: #111827;
        }

        .article-content a {
          color: #2563eb;
          text-decoration: underline;
        }

        .article-content a:hover {
          color: #1d4ed8;
        }

        .article-content code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: monospace;
        }

        .article-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          font-style: italic;
          color: #4b5563;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  )
}
