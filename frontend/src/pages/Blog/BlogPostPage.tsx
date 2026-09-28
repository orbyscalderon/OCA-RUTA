import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { obtenerPost } from './posts';

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? obtenerPost(slug) : undefined;

  if (!post) return <Navigate to="/blog" replace />;

  const url = `https://ocaruta.com/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{post.title} — OCA Ruta</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            author: { '@type': 'Organization', name: 'OCA Ruta' },
            publisher: { '@type': 'Organization', name: 'OCA Holding Group LLC' },
            mainEntityOfPage: url,
          })}
        </script>
      </Helmet>

      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-brand-600">OCA Ruta</Link>
          <Link to="/#registro" className="btn-primary text-sm">Probar gratis 7 días</Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-6 py-14">
        <Link to="/blog" className="text-sm text-gray-400 hover:text-gray-600">← Blog</Link>
        <p className="text-xs text-gray-400 mt-4 mb-1">
          {formatearFecha(post.publishedAt)} · {post.readingMinutes} min de lectura
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">{post.title}</h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          {post.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-xl font-bold text-gray-900 mt-8 mb-3">{section.heading}</h2>
              )}
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mb-4">{p}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-brand-100 bg-brand-50 p-6 text-center">
          <p className="font-bold text-gray-900 mb-2">¿Listo para dejar la libreta y el WhatsApp?</p>
          <p className="text-sm text-gray-600 mb-4">Prueba OCA Ruta gratis 7 días, sin tarjeta requerida hasta que decidas seguir.</p>
          <Link to="/#registro" className="btn-primary inline-flex">Empezar gratis</Link>
        </div>
      </article>
    </div>
  );
}
