import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Lock, Receipt, PiggyBank, MinusCircle, ShieldAlert } from 'lucide-react';
import { cajasApi } from '@/api/cajas.api';
import { Badge } from '@/components/common/Badge';
import { ModalOverlay } from '@/components/common/ModalOverlay';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency } from '@/utils/format';
import { Rol } from '@/types';
import { mensajeError } from '@/utils/errores';

const badgeEstado = { Abierta: 'green', PendienteRevision: 'amber', Cerrada: 'gray' } as const;

export function CajaArqueoPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [montoCierre, setMontoCierre] = useState('');
  const [montoGasto, setMontoGasto] = useState('');
  const [descGasto, setDescGasto] = useState('');
  const [confirmarCierre, setConfirmarCierre] = useState(false);
  const [confirmarReapertura, setConfirmarReapertura] = useState(false);

  const { data: caja, isLoading } = useQuery({
    queryKey: ['arqueo', id],
    queryFn: () => cajasApi.obtenerArqueo(id!),
    enabled: !!id,
  });

  const { data: movimientos = [] } = useQuery({
    queryKey: ['movimientos', id],
    queryFn: () => cajasApi.movimientos(id!),
    enabled: !!id,
  });

  const gastoMut = useMutation({
    mutationFn: () =>
      cajasApi.registrarGasto({
        uuid_idempotencia: crypto.randomUUID(),
        caja_id: id!,
        monto: parseFloat(montoGasto) || 0,
        descripcion: descGasto,
      }),
    onSuccess: () => {
      setMontoGasto('');
      setDescGasto('');
      qc.invalidateQueries({ queryKey: ['arqueo', id] });
      qc.invalidateQueries({ queryKey: ['movimientos', id] });
    },
  });

  const cerrarMut = useMutation({
    mutationFn: () =>
      cajasApi.cerrar(id!, { monto_cierre_declarado: parseFloat(montoCierre) || 0 }),
    onSuccess: () => {
      setConfirmarCierre(false);
      qc.invalidateQueries({ queryKey: ['arqueo', id] });
      qc.invalidateQueries({ queryKey: ['cajas-hoy'] });
    },
  });

  const aprobarMut = useMutation({
    mutationFn: () => cajasApi.aprobarCierre(id!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['arqueo', id] });
      qc.invalidateQueries({ queryKey: ['cajas-hoy'] });
    },
  });

  const reabrirMut = useMutation({
    mutationFn: () => cajasApi.reabrir(id!),
    onSuccess: () => {
      setConfirmarReapertura(false);
      qc.invalidateQueries({ queryKey: ['arqueo', id] });
      qc.invalidateQueries({ queryKey: ['cajas-hoy'] });
    },
  });

  const fmt = (n: number) => formatCurrency(n, user);

  const isAdmin = user?.rol === Rol.ADMIN_TENANT;

  if (isLoading) return <div className="p-6 text-gray-400">{t('cajas.cargando')}</div>;
  if (!caja) return <div className="p-6 text-red-500">{t('cajas.no_encontrada')}</div>;

  const neto = caja.monto_apertura + caja.total_cobros - caja.total_gastos;

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <Link to="/cajas" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
        <ArrowLeft size={16} />
        {t('cajas.volver')}
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{t('cajas.arqueo_titulo')}</h1>
            {caja.ruta_nombre && <p className="text-sm text-gray-500">{caja.ruta_nombre}</p>}
          </div>
          <Badge
            label={caja.estado === 'PendienteRevision' ? t('cajas.pendiente_revision') : caja.estado}
            variant={badgeEstado[caja.estado]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-gray-400 text-xs">{t('cajas.col_apertura')}</p>
            <p className="font-semibold text-gray-900">{fmt(caja.monto_apertura)}</p>
          </div>
          <div className="rounded-lg bg-emerald-50 p-3">
            <p className="text-gray-400 text-xs">{t('cajas.total_cobros')}</p>
            <p className="font-semibold text-emerald-600">{fmt(caja.total_cobros)}</p>
          </div>
          <div className="rounded-lg bg-red-50 p-3">
            <p className="text-gray-400 text-xs">{t('cajas.total_gastos')}</p>
            <p className="font-semibold text-red-500">{fmt(caja.total_gastos)}</p>
          </div>
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-gray-400 text-xs">{t('cajas.neto_esperado')}</p>
            <p className="font-semibold text-blue-600">{fmt(neto)}</p>
          </div>
        </div>

        {/* Diferencia y cuadre: solo visible para admin -- se calcula ya en
            el cierre del cobrador, antes de que el admin la apruebe, para
            que sea justo lo que tiene que revisar. */}
        {isAdmin && (caja.estado === 'Cerrada' || caja.estado === 'PendienteRevision') && caja.diferencia_cierre !== null && (
          <div
            className={`rounded-lg p-4 border ${
              caja.estado_cuadre === 'Cuadrado'
                ? 'bg-emerald-50 border-emerald-200'
                : caja.estado_cuadre === 'Sobrante'
                ? 'bg-blue-50 border-blue-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <p className="text-sm font-semibold">
              {caja.estado_cuadre} — {t('cajas.diferencia_label')} {fmt(Math.abs(caja.diferencia_cierre!))}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {t('cajas.declarado_por_cobrador', { monto: fmt(caja.monto_cierre_declarado ?? 0) })}
            </p>
          </div>
        )}

        {/* Revisión del cierre: solo admin, solo mientras esté pendiente */}
        {isAdmin && caja.estado === 'PendienteRevision' && (
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ShieldAlert size={14} />
              {t('cajas.revisar_cierre')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => aprobarMut.mutate()}
                disabled={aprobarMut.isPending}
                className="flex-1 justify-center flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {aprobarMut.isPending ? t('cajas.aprobando') : t('cajas.aprobar_cierre')}
              </button>
              <button
                onClick={() => setConfirmarReapertura(true)}
                className="flex-1 justify-center flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                {t('cajas.reabrir_caja')}
              </button>
            </div>
            {aprobarMut.isError && (
              <p className="text-xs text-red-500">{mensajeError(aprobarMut.error, t('cajas.error_aprobar_cierre'))}</p>
            )}
          </div>
        )}

        {/* Registrar gasto */}
        {caja.estado === 'Abierta' && (
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MinusCircle size={14} />
              {t('cajas.registrar_gasto')}
            </p>
            <div className="flex gap-3">
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={montoGasto}
                onChange={(e) => setMontoGasto(e.target.value)}
                placeholder={t('cajas.monto_gasto_placeholder', { simbolo: user?.tenant_simbolo_moneda ?? 'RD$' })}
                className="w-40 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                value={descGasto}
                onChange={(e) => setDescGasto(e.target.value)}
                placeholder={t('cajas.descripcion_gasto_placeholder')}
                maxLength={200}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                onClick={() => gastoMut.mutate()}
                disabled={!montoGasto || parseFloat(montoGasto) <= 0 || !descGasto.trim() || gastoMut.isPending}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 flex-shrink-0"
              >
                {gastoMut.isPending ? t('cajas.registrando') : t('cajas.registrar')}
              </button>
            </div>
            {gastoMut.isError && (
              <p className="text-xs text-red-500">
                {mensajeError(gastoMut.error, t('cajas.error_registrar_gasto'))}
              </p>
            )}
          </div>
        )}

        {/* Formulario de cierre */}
        {caja.estado === 'Abierta' && (
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Lock size={14} />
              {t('cajas.cerrar_caja')}
            </p>
            <p className="text-xs text-gray-500">
              {t('cajas.monto_fisico_hint')}
            </p>
            <div className="flex gap-3">
              <input
                type="number"
                step="0.01"
                value={montoCierre}
                onChange={(e) => setMontoCierre(e.target.value)}
                placeholder={t('cajas.monto_declarado_placeholder')}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                onClick={() => setConfirmarCierre(true)}
                disabled={!montoCierre || cerrarMut.isPending}
                className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-60"
              >
                {t('cajas.cerrar')}
              </button>
            </div>
            {!isAdmin && (
              <p className="text-xs text-gray-400 italic">
                {t('cajas.cuadre_revisado_admin')}
              </p>
            )}
            {cerrarMut.isError && (
              <p className="text-xs text-red-500">{mensajeError(cerrarMut.error, t('cajas.error_cerrar'))}</p>
            )}
          </div>
        )}
      </div>

      {/* Movimientos: cobros + gastos, orden cronológico */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-3">
        <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Receipt size={14} />
          {t('cajas.movimientos_titulo')}
        </p>
        {movimientos.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">{t('cajas.sin_movimientos')}</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {movimientos.map((m) => (
              <div key={m.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  {m.tipo === 'Cobro' ? (
                    <PiggyBank size={16} className="text-emerald-500 flex-shrink-0" />
                  ) : (
                    <MinusCircle size={16} className="text-red-500 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {m.tipo === 'Cobro'
                        ? (m.cliente_nombre ? `${m.cliente_nombre} ${m.cliente_apellido}` : t('cajas.cobro_generico'))
                        : (m.descripcion || t('cajas.gasto_generico'))}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(m.timestamp_dispositivo ?? m.created_at).toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-semibold mono-nums ${m.tipo === 'Cobro' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {m.tipo === 'Cobro' ? '+' : '-'}{fmt(m.monto)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmar cierre: genérico a propósito -- no puede mencionar la
          diferencia real, eso rompería el cierre ciego (el cobrador nunca
          ve el monto esperado). */}
      {confirmarCierre && (
        <ModalOverlay>
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 space-y-4 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900">{t('cajas.confirmar_cierre_titulo')}</h2>
            <p className="text-sm text-gray-600">
              {t('cajas.confirmar_cierre_texto', { monto: fmt(parseFloat(montoCierre) || 0) })}
            </p>
            {cerrarMut.isError && (
              <p className="text-xs text-red-500">{mensajeError(cerrarMut.error, t('cajas.error_cerrar'))}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => cerrarMut.mutate()}
                disabled={cerrarMut.isPending}
                className="flex-1 justify-center flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-60"
              >
                {cerrarMut.isPending ? t('cajas.cerrando') : t('cajas.confirmar_y_cerrar')}
              </button>
              <button onClick={() => setConfirmarCierre(false)} className="btn-secondary">
                {t('common.cancelar')}
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* Confirmar reapertura: la usa el admin, no el cobrador -- acá sí
          puede mencionar la diferencia, ya la está viendo en pantalla. */}
      {confirmarReapertura && (
        <ModalOverlay>
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 space-y-4 animate-fade-in">
            <h2 className="text-lg font-bold text-gray-900">{t('cajas.reabrir_caja')}</h2>
            <p className="text-sm text-gray-600">{t('cajas.confirmar_reapertura_texto')}</p>
            {reabrirMut.isError && (
              <p className="text-xs text-red-500">{mensajeError(reabrirMut.error, t('cajas.error_reabrir'))}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => reabrirMut.mutate()}
                disabled={reabrirMut.isPending}
                className="flex-1 justify-center flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {reabrirMut.isPending ? t('cajas.reabriendo') : t('cajas.confirmar_reapertura')}
              </button>
              <button onClick={() => setConfirmarReapertura(false)} className="btn-secondary">
                {t('common.cancelar')}
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}
