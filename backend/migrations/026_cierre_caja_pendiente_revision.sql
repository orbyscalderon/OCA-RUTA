-- Cierre ciego de caja: el cobrador declara sin ver el esperado, pero hasta
-- ahora quedaba "Cerrada" (final) apenas lo hacía -- si el admin encontraba
-- una diferencia grande no tenía forma de dejarla marcada como pendiente de
-- su revisión, ni de reabrirla para que el cobrador corrija. Ahora el
-- cierre del cobrador deja la caja en "PendienteRevision"; el admin la
-- aprueba (queda "Cerrada", final) o la reabre (vuelve a "Abierta") si algo
-- no cuadra.

ALTER TYPE estado_caja ADD VALUE IF NOT EXISTS 'PendienteRevision';

ALTER TABLE cajas
    ADD COLUMN IF NOT EXISTS revisado_por_id UUID REFERENCES empleados(id),
    ADD COLUMN IF NOT EXISTS fecha_revision  TIMESTAMPTZ;
