import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { rutaInicioSegunPermisos } from '@/utils/permisos';

/**
 * El Sidebar oculta el link a quien no tiene el permiso, pero nada impedía
 * llegar a la pantalla igual por otra vía (historial del navegador, un
 * marcador viejo, una URL escrita a mano) -- la página se renderizaba
 * igual y disparaba sus queries, que el backend rechazaba en cascada
 * (múltiples 403 seguidos, muy visible en consola y confuso para
 * diagnosticar). Esto corta el render ANTES de que la página dispare
 * ningún pedido, mismo criterio de permisos que ya usa Sidebar.tsx.
 */
export function RutaProtegida({ permisos, children }: { permisos: string[]; children: ReactNode }) {
  const { user } = useAuth();
  const tienePermiso = permisos.some((p) => user?.permisos?.includes(p));

  if (!tienePermiso) {
    return <Navigate to={rutaInicioSegunPermisos(user?.permisos)} replace />;
  }

  return <>{children}</>;
}
