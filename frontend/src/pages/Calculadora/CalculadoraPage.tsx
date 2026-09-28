import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CalculadoraPrestamo } from '@/components/common/CalculadoraPrestamo';

export function CalculadoraPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Calculadora de Préstamos con Interés Simple — OCA Ruta</title>
        <meta
          name="description"
          content="Calcula el plan de cuotas de un préstamo con interés simple: capital, tasa y cantidad de cuotas diarias, semanales, quincenales o mensuales. Gratis, sin registro."
        />
        <link rel="canonical" href="https://ocaruta.com/calculadora-de-prestamos" />
      </Helmet>

      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-brand-600">OCA Ruta</Link>
          <Link to="/#registro" className="btn-primary text-sm">{t('landing.calculadora_pagina_cta')}</Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-14 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
          {t('landing.calculadora_pagina_titulo')}
        </h1>
        <p className="text-gray-500 mb-10 leading-relaxed">
          {t('landing.calculadora_pagina_intro')}
        </p>
        <CalculadoraPrestamo />

        <p className="mt-14 text-sm text-gray-400">
          <Link to="/" className="text-brand-600 font-medium hover:underline">OCA Ruta</Link>
          {' — '}{t('landing.footer_titulo')}
        </p>
      </main>
    </div>
  );
}
