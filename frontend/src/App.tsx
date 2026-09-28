import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/Layout/AppLayout';
import { LandingPage } from '@/pages/Landing/LandingPage';
import { RutaProtegida } from '@/components/common/RutaProtegida';
import { Permiso } from '@/utils/permisos';

// Todo lo que no sea la landing pública va con lazy() -- sin esto, alguien
// que solo visita ocaruta.com para leer sobre el producto descarga también
// el dashboard, los mapas (Leaflet), los reportes y las librerías de
// exportación de PDF antes de ver nada. Afecta LCP/TTI real y, para la
// landing, es señal de ranking (Core Web Vitals).
const LoginPage = lazy(() => import('@/pages/Login').then((m) => ({ default: m.LoginPage })));
const OlvidePasswordPage = lazy(() => import('@/pages/OlvidePassword').then((m) => ({ default: m.OlvidePasswordPage })));
const ResetearPasswordPage = lazy(() => import('@/pages/ResetearPassword').then((m) => ({ default: m.ResetearPasswordPage })));
const DashboardPage = lazy(() => import('@/pages/Dashboard').then((m) => ({ default: m.DashboardPage })));
const ClientesPage = lazy(() => import('@/pages/Clientes/ClientesPage').then((m) => ({ default: m.ClientesPage })));
const ClienteDetallePage = lazy(() => import('@/pages/Clientes/ClienteDetallePage').then((m) => ({ default: m.ClienteDetallePage })));
const ClienteNuevoPage = lazy(() => import('@/pages/Clientes/ClienteNuevoPage').then((m) => ({ default: m.ClienteNuevoPage })));
const PrestamosPage = lazy(() => import('@/pages/Prestamos/PrestamosPage').then((m) => ({ default: m.PrestamosPage })));
const PrestamoNuevoPage = lazy(() => import('@/pages/Prestamos/PrestamoNuevoPage').then((m) => ({ default: m.PrestamoNuevoPage })));
const PrestamoDetallePage = lazy(() => import('@/pages/Prestamos/PrestamoDetallePage').then((m) => ({ default: m.PrestamoDetallePage })));
const PrestamoRenovarPage = lazy(() => import('@/pages/Prestamos/PrestamoRenovarPage').then((m) => ({ default: m.PrestamoRenovarPage })));
const CajasPage = lazy(() => import('@/pages/Cajas/CajasPage').then((m) => ({ default: m.CajasPage })));
const CajaArqueoPage = lazy(() => import('@/pages/Cajas/CajaArqueoPage').then((m) => ({ default: m.CajaArqueoPage })));
const RutasPage = lazy(() => import('@/pages/Rutas/RutasPage').then((m) => ({ default: m.RutasPage })));
const RutaNuevaPage = lazy(() => import('@/pages/Rutas/RutaNuevaPage').then((m) => ({ default: m.RutaNuevaPage })));
const RutaMapaPage = lazy(() => import('@/pages/Rutas/RutaMapaPage').then((m) => ({ default: m.RutaMapaPage })));
const BuroPage = lazy(() => import('@/pages/Buro/BuroPage').then((m) => ({ default: m.BuroPage })));
const BuroConsultaPage = lazy(() => import('@/pages/Buro/BuroConsultaPage').then((m) => ({ default: m.BuroConsultaPage })));
const ReportesPage = lazy(() => import('@/pages/Reportes/ReportesPage').then((m) => ({ default: m.ReportesPage })));
const CuentasCobrarPage = lazy(() => import('@/pages/Reportes/CuentasCobrarPage').then((m) => ({ default: m.CuentasCobrarPage })));
const ConfigPage = lazy(() => import('@/pages/Config/ConfigPage').then((m) => ({ default: m.ConfigPage })));
const BackupPage = lazy(() => import('@/pages/Config/BackupPage').then((m) => ({ default: m.BackupPage })));
const HistorialPagosPage = lazy(() => import('@/pages/Prestamos/HistorialPagosPage').then((m) => ({ default: m.HistorialPagosPage })));
const EmpleadosPage = lazy(() => import('@/pages/Empleados/EmpleadosPage').then((m) => ({ default: m.EmpleadosPage })));
const CobroNuevoPage = lazy(() => import('@/pages/Cobros/CobroNuevoPage').then((m) => ({ default: m.CobroNuevoPage })));
const RutaDetallePage = lazy(() => import('@/pages/Rutas/RutaDetallePage').then((m) => ({ default: m.RutaDetallePage })));
const MiRutaPage = lazy(() => import('@/pages/Rutas/MiRutaPage').then((m) => ({ default: m.MiRutaPage })));
const FeriadosPage = lazy(() => import('@/pages/Config/FeriadosPage').then((m) => ({ default: m.FeriadosPage })));
const PortalClientePage = lazy(() => import('@/pages/Portal/PortalClientePage').then((m) => ({ default: m.PortalClientePage })));
const SuperAdminPage = lazy(() => import('@/pages/SuperAdmin/SuperAdminPage').then((m) => ({ default: m.SuperAdminPage })));
const SuscripcionVencidaPage = lazy(() => import('@/pages/SuscripcionVencida').then((m) => ({ default: m.SuscripcionVencidaPage })));
const LegalPage = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.LegalPage })));
const CalculadoraPage = lazy(() => import('@/pages/Calculadora/CalculadoraPage').then((m) => ({ default: m.CalculadoraPage })));
const BlogIndexPage = lazy(() => import('@/pages/Blog/BlogIndexPage').then((m) => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import('@/pages/Blog/BlogPostPage').then((m) => ({ default: m.BlogPostPage })));

function PantallaCarga() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <svg className="animate-spin h-8 w-8 text-brand-500" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PantallaCarga />}>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LandingPage />} />
          {/* /en: misma landing, forzada a inglés -- ver LandingPage.tsx
              (hreflang recíproco + useEffect que cambia i18n según pathname).
              Es la única forma real de que Google indexe una versión en
              inglés de esta SPA sin invertir en SSR/prerender completo. */}
          <Route path="/en" element={<LandingPage />} />
          <Route path="/calculadora-de-prestamos" element={<CalculadoraPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/olvide-password" element={<OlvidePasswordPage />} />
          <Route path="/resetear-password" element={<ResetearPasswordPage />} />
          <Route path="/portal" element={<PortalClientePage />} />
          <Route path="/super-admin" element={<SuperAdminPage />} />
          <Route path="/suscripcion-vencida" element={<SuscripcionVencidaPage />} />
          <Route path="/legal" element={<LegalPage />} />
          {/* /terminos y /privacidad ya no son páginas propias -- eran
              contenido 100% duplicado de /legal (mismo componente, mismo
              <title>). El _redirects (edge, 301) es el mecanismo real para
              SEO; este <Navigate> es solo fallback client-side por si algo
              llega aquí sin pasar por el edge. */}
          <Route path="/terminos" element={<Navigate to="/legal#terminos" replace />} />
          <Route path="/privacidad" element={<Navigate to="/legal#privacidad" replace />} />

          {/* Panel admin — requiere autenticación. Mismo mapeo pantalla→permiso
              que Sidebar.tsx (ahí se define qué link ve cada quien); acá se
              hace cumplir de verdad, no solo se esconde el link. */}
          <Route element={<AppLayout />}>
            <Route path="/panel" element={
              <RutaProtegida permisos={[Permiso.REPORTES_ADMIN]}><DashboardPage /></RutaProtegida>
            } />

            <Route path="/clientes" element={
              <RutaProtegida permisos={[Permiso.CLIENTES_VER]}><ClientesPage /></RutaProtegida>
            } />
            <Route path="/clientes/nuevo" element={
              <RutaProtegida permisos={[Permiso.CLIENTES_CREAR]}><ClienteNuevoPage /></RutaProtegida>
            } />
            <Route path="/clientes/:id" element={<ClienteDetallePage />} />

            <Route path="/prestamos" element={
              <RutaProtegida permisos={[Permiso.PRESTAMOS_VER]}><PrestamosPage /></RutaProtegida>
            } />
            <Route path="/prestamos/nueva-solicitud" element={<PrestamoNuevoPage />} />
            <Route path="/prestamos/:id" element={<PrestamoDetallePage />} />
            <Route path="/prestamos/:id/renovar" element={<PrestamoRenovarPage />} />
            <Route path="/prestamos/:id/historial" element={<HistorialPagosPage />} />

            <Route path="/cajas" element={
              <RutaProtegida permisos={[Permiso.CAJAS_OPERAR, Permiso.CAJAS_SUPERVISAR]}><CajasPage /></RutaProtegida>
            } />
            <Route path="/cajas/:id/arqueo" element={<CajaArqueoPage />} />
            <Route path="/cobros/nuevo" element={
              <RutaProtegida permisos={[Permiso.COBROS_REGISTRAR]}><CobroNuevoPage /></RutaProtegida>
            } />

            <Route path="/rutas" element={
              <RutaProtegida permisos={[Permiso.RUTAS_GESTIONAR]}><RutasPage /></RutaProtegida>
            } />
            <Route path="/rutas/nueva" element={
              <RutaProtegida permisos={[Permiso.RUTAS_GESTIONAR]}><RutaNuevaPage /></RutaProtegida>
            } />
            <Route path="/rutas/:id" element={<RutaDetallePage />} />
            <Route path="/rutas/:id/mapa" element={<RutaMapaPage />} />
            <Route path="/mi-ruta" element={
              <RutaProtegida permisos={[Permiso.RUTAS_VER_PROPIA]}><MiRutaPage /></RutaProtegida>
            } />

            <Route path="/empleados" element={
              <RutaProtegida permisos={[Permiso.EMPLEADOS_VER]}><EmpleadosPage /></RutaProtegida>
            } />

            <Route path="/buro" element={
              <RutaProtegida permisos={[Permiso.BURO_CONSULTAR]}><BuroPage /></RutaProtegida>
            } />
            <Route path="/buro/consultar" element={
              <RutaProtegida permisos={[Permiso.BURO_CONSULTAR]}><BuroConsultaPage /></RutaProtegida>
            } />

            <Route path="/reportes" element={
              <RutaProtegida permisos={[Permiso.REPORTES_ADMIN]}><ReportesPage /></RutaProtegida>
            } />
            <Route path="/cuentas-cobrar" element={
              <RutaProtegida permisos={[Permiso.REPORTES_AVANZADOS]}><CuentasCobrarPage /></RutaProtegida>
            } />

            <Route path="/config" element={
              <RutaProtegida permisos={[Permiso.TENANT_VER_CONFIG]}><ConfigPage /></RutaProtegida>
            } />
            <Route path="/config/feriados" element={
              <RutaProtegida permisos={[Permiso.TENANT_VER_CONFIG]}><FeriadosPage /></RutaProtegida>
            } />
            <Route path="/config/backup" element={
              <RutaProtegida permisos={[Permiso.REPORTES_ADMIN]}><BackupPage /></RutaProtegida>
            } />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
