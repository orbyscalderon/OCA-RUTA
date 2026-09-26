/**
 * El backend (HttpExceptionFilter) responde los errores como
 * { statusCode, timestamp, error, details } -- el texto legible va en
 * `.error`, NUNCA en `.message` (ese es el shape crudo de Nest, que el
 * filtro reemplaza). Leer `.message` directo devuelve siempre undefined y
 * el usuario nunca ve la razón real del fallo (cédula duplicada, permiso
 * denegado, etc.), solo el texto genérico de fallback.
 */
export function mensajeError(err: unknown, fallback: string): string {
  const data = (err as { response?: { data?: { error?: string; message?: string } } })?.response?.data;
  return data?.error ?? data?.message ?? fallback;
}
