import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from '../locales/es/common.json';
import en from '../locales/en/common.json';

export const IDIOMAS_SOPORTADOS = ['es', 'en'] as const;
export type Idioma = (typeof IDIOMAS_SOPORTADOS)[number];

const IDIOMA_STORAGE_KEY = 'oc-credit-idioma';

function idiomaGuardado(): Idioma {
  try {
    const guardado = localStorage.getItem(IDIOMA_STORAGE_KEY);
    if (guardado && (IDIOMAS_SOPORTADOS as readonly string[]).includes(guardado)) {
      return guardado as Idioma;
    }
  } catch { /* localStorage no disponible (SSR, privacidad, etc.) -- se ignora */ }
  return 'es';
}

const idiomaInicial = idiomaGuardado();

i18n.use(initReactI18next).init({
  resources: {
    es: { common: es },
    en: { common: en },
  },
  lng: idiomaInicial,
  fallbackLng: 'es',
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

// idiomaGuardado() puede devolver 'en' en la carga inicial (localStorage de
// una visita anterior) -- sin esto, <html lang="es"> queda desincronizado
// del idioma real hasta el primer cambio manual (bug de accesibilidad y
// señal confusa para crawlers que renderizan JS).
if (typeof document !== 'undefined') {
  document.documentElement.lang = idiomaInicial;
}

export function cambiarIdioma(idioma: Idioma) {
  i18n.changeLanguage(idioma);
  document.documentElement.lang = idioma;
  try {
    localStorage.setItem(IDIOMA_STORAGE_KEY, idioma);
  } catch { /* privado/bloqueado -- el cambio de idioma sigue aplicando esta sesión */ }
}

export default i18n;
