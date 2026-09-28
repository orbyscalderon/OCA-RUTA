import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from './posts';

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Blog — OCA Ruta</title>
        <meta
          name="description"
          content="Guías prácticas para financieras y prestamistas: cobranza en ruta, buró de crédito, reducción de mora y gestión de cartera."
        />
        <link rel="canonical" href="https://ocaruta.com/blog" />
      </Helmet>

      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-brand-600">OCA Ruta</Link>
          <Link to="/#registro" className="btn-primary text-sm">Probar gratis 7 días</Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-500 mb-10">
          Guías prácticas para dueños de financieras y prestamistas que cobran en ruta.
        </p>

        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="border-b border-gray-100 pb-8 last:border-0">
              <p className="text-xs text-gray-400 mb-1">
                {formatearFecha(post.publishedAt)} · {post.readingMinutes} min de lectura
              </p>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                <Link to={`/blog/${post.slug}`} className="hover:text-brand-600">{post.title}</Link>
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{post.description}</p>
              <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-brand-600 hover:underline">
                Leer artículo →
              </Link>
            </article>
          ))}
        </div>

        <p className="mt-14 text-sm text-gray-400">
          <Link to="/" className="text-brand-600 font-medium hover:underline">OCA Ruta</Link>
          {' — Software de préstamos y cobranza en ruta'}
        </p>
      </main>
    </div>
  );
}
