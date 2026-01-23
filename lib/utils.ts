import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// =============================================================================
// CLASSNAMES
// =============================================================================

/**
 * Combina clases de Tailwind de forma inteligente
 * Usa clsx para condicionales y twMerge para resolver conflictos
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// =============================================================================
// FORMATEO DE MONEDA
// =============================================================================

const arsFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const arsCompactFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  notation: "compact",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

/**
 * Formatea un número como precio en ARS
 * @example formatPrecioARS(150000) // "$150.000"
 */
export function formatPrecioARS(
  precio: number | string | null | undefined,
  options?: { fallback?: string; compact?: boolean }
): string {
  const { fallback = "Consultar", compact = false } = options ?? {};
  
  if (precio === null || precio === undefined || precio === "") return fallback;
  
  const numero = typeof precio === "string" ? parseFloat(precio) : precio;
  
  if (isNaN(numero)) return fallback;
  
  return compact ? arsCompactFormatter.format(numero) : arsFormatter.format(numero);
}

/**
 * Formatea un rango de precios
 * @example formatRangoPrecio(50000, 150000) // "$50.000 - $150.000"
 */
export function formatRangoPrecio(
  min: number | null | undefined,
  max: number | null | undefined
): string {
  if (!min && !max) return "Consultar";
  if (min && !max) return `Desde ${formatPrecioARS(min)}`;
  if (!min && max) return `Hasta ${formatPrecioARS(max)}`;
  if (min === max) return formatPrecioARS(min);
  return `${formatPrecioARS(min)} - ${formatPrecioARS(max)}`;
}

// =============================================================================
// FORMATEO DE FECHAS
// =============================================================================

const dateFormatters = {
  full: new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  short: new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }),
  medium: new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  monthYear: new Intl.DateTimeFormat("es-AR", {
    month: "long",
    year: "numeric",
  }),
  dayMonth: new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
  }),
  time: new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  }),
  dateTime: new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }),
};

type DateFormat = keyof typeof dateFormatters;

/**
 * Formatea una fecha con diferentes estilos
 * @example formatFecha(new Date(), "full") // "viernes, 24 de enero de 2025"
 * @example formatFecha("2025-01-24", "short") // "24/01/2025"
 */
export function formatFecha(
  fecha: Date | string | null | undefined,
  format: DateFormat = "full"
): string {
  if (!fecha) return "";
  
  const date = typeof fecha === "string" ? new Date(fecha) : fecha;
  
  if (isNaN(date.getTime())) return "";
  
  return dateFormatters[format].format(date);
}

/**
 * Formatea una fecha de forma relativa (hace X tiempo)
 * @example formatFechaRelativa(new Date(Date.now() - 3600000)) // "hace 1 hora"
 */
export function formatFechaRelativa(fecha: Date | string): string {
  const date = typeof fecha === "string" ? new Date(fecha) : fecha;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) return "hace un momento";
  if (diffMins < 60) return `hace ${diffMins} ${diffMins === 1 ? "minuto" : "minutos"}`;
  if (diffHours < 24) return `hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`;
  if (diffDays < 7) return `hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`;
  if (diffWeeks < 4) return `hace ${diffWeeks} ${diffWeeks === 1 ? "semana" : "semanas"}`;
  if (diffMonths < 12) return `hace ${diffMonths} ${diffMonths === 1 ? "mes" : "meses"}`;
  
  return formatFecha(date, "medium");
}

/**
 * Verifica si una fecha es hoy
 */
export function isToday(fecha: Date | string): boolean {
  const date = typeof fecha === "string" ? new Date(fecha) : fecha;
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Verifica si una fecha es mañana
 */
export function isTomorrow(fecha: Date | string): boolean {
  const date = typeof fecha === "string" ? new Date(fecha) : fecha;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
}

// =============================================================================
// STRINGS
// =============================================================================

/**
 * Convierte texto a slug URL-friendly
 * @example slugify("Escrituras Públicas") // "escrituras-publicas"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Obtiene las iniciales de un nombre (máximo 2)
 * @example getInitials("Juan Carlos Pérez") // "JP"
 */
export function getInitials(name: string | null | undefined): string {
  if (!name) return "??";
  
  return name
    .split(" ")
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Capitaliza la primera letra de cada palabra
 * @example capitalize("juan carlos") // "Juan Carlos"
 */
export function capitalize(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Trunca texto con elipsis
 * @example truncate("Texto muy largo", 10) // "Texto muy..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Pluraliza una palabra basado en cantidad
 * @example pluralize(1, "escribano", "escribanos") // "1 escribano"
 * @example pluralize(5, "escribano", "escribanos") // "5 escribanos"
 */
export function pluralize(
  count: number,
  singular: string,
  plural: string
): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

// =============================================================================
// CALIFICACIONES / ESTRELLAS
// =============================================================================

export type StarType = "full" | "half" | "empty";

/**
 * Convierte una calificación numérica a array de estrellas
 * @example getEstrellas(3.5) // ["full", "full", "full", "half", "empty"]
 */
export function getEstrellas(calificacion: number, maxEstrellas: number = 5): StarType[] {
  const estrellas: StarType[] = [];
  const clampedRating = Math.max(0, Math.min(calificacion, maxEstrellas));
  const entero = Math.floor(clampedRating);
  const decimal = clampedRating - entero;

  for (let i = 0; i < maxEstrellas; i++) {
    if (i < entero) {
      estrellas.push("full");
    } else if (i === entero && decimal >= 0.5) {
      estrellas.push("half");
    } else {
      estrellas.push("empty");
    }
  }
  
  return estrellas;
}

/**
 * Formatea calificación con una cifra decimal
 * @example formatCalificacion(4.567) // "4.6"
 */
export function formatCalificacion(calificacion: number): string {
  return calificacion.toFixed(1);
}

// =============================================================================
// ESCRIBANOS / PRECIOS
// =============================================================================

const CAMPOS_PRECIO = [
  "precioEscrituras",
  "precioDeclaratoria",
  "precioPoderes",
  "precioCertificaciones",
  "precioTestamentos",
  "precioDonaciones",
  "precioUsufructo",
  "precioLoteos",
  "precioRegimenPH",
  "precioFideicomisos",
  "precioAutorizaciones",
  "precioConsulta",
] as const;

type CamposPrecio = (typeof CAMPOS_PRECIO)[number];

interface EscribanoPrecios extends Partial<Record<CamposPrecio, number | string | null>> {
  [key: string]: unknown;
}

/**
 * Obtiene el precio mínimo de un escribano
 */
export function getPrecioMinimo(escribano: EscribanoPrecios): number | null {
  const precios = CAMPOS_PRECIO
    .map((campo) => escribano[campo])
    .filter((p): p is number | string => p !== null && p !== undefined && p !== "")
    .map((p) => (typeof p === "string" ? parseFloat(p) : p))
    .filter((p) => !isNaN(p) && p > 0);

  if (precios.length === 0) return null;
  return Math.min(...precios);
}

/**
 * Obtiene el precio máximo de un escribano
 */
export function getPrecioMaximo(escribano: EscribanoPrecios): number | null {
  const precios = CAMPOS_PRECIO
    .map((campo) => escribano[campo])
    .filter((p): p is number | string => p !== null && p !== undefined && p !== "")
    .map((p) => (typeof p === "string" ? parseFloat(p) : p))
    .filter((p) => !isNaN(p) && p > 0);

  if (precios.length === 0) return null;
  return Math.max(...precios);
}

// =============================================================================
// TELÉFONO / WHATSAPP
// =============================================================================

/**
 * Formatea número de teléfono argentino
 * @example formatTelefono("3512345678") // "+54 9 351 234-5678"
 */
export function formatTelefono(telefono: string | null | undefined): string {
  if (!telefono) return "";
  
  // Limpiar caracteres no numéricos
  const limpio = telefono.replace(/\D/g, "");
  
  // Si ya tiene código de país, formatearlo
  if (limpio.startsWith("54")) {
    const sinPais = limpio.slice(2);
    const conNueve = sinPais.startsWith("9") ? sinPais : `9${sinPais}`;
    return formatearNumeroLocal(conNueve);
  }
  
  // Si empieza con 9, ya está bien
  if (limpio.startsWith("9")) {
    return formatearNumeroLocal(limpio);
  }
  
  // Agregar 9 para móvil argentino
  return formatearNumeroLocal(`9${limpio}`);
}

function formatearNumeroLocal(numero: string): string {
  // Formato: +54 9 XXX XXX-XXXX
  if (numero.length >= 10) {
    const area = numero.slice(1, 4);
    const parte1 = numero.slice(4, 7);
    const parte2 = numero.slice(7, 11);
    return `+54 ${numero[0]} ${area} ${parte1}-${parte2}`;
  }
  return `+54 ${numero}`;
}

/**
 * Genera link de WhatsApp con mensaje predefinido
 */
export function getWhatsAppLink(
  telefono: string,
  mensaje?: string
): string {
  const limpio = telefono.replace(/\D/g, "");
  const conPais = limpio.startsWith("54") ? limpio : `54${limpio}`;
  const baseUrl = `https://wa.me/${conPais}`;
  
  if (mensaje) {
    return `${baseUrl}?text=${encodeURIComponent(mensaje)}`;
  }
  
  return baseUrl;
}

// =============================================================================
// VALIDACIONES
// =============================================================================

/**
 * Valida email
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida CUIT/CUIL argentino
 */
export function isValidCUIT(cuit: string): boolean {
  const limpio = cuit.replace(/\D/g, "");
  
  if (limpio.length !== 11) return false;
  
  const multiplicadores = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let suma = 0;
  
  for (let i = 0; i < 10; i++) {
    suma += parseInt(limpio[i]) * multiplicadores[i];
  }
  
  const resto = suma % 11;
  const digitoVerificador = resto === 0 ? 0 : resto === 1 ? 9 : 11 - resto;
  
  return parseInt(limpio[10]) === digitoVerificador;
}

/**
 * Formatea CUIT/CUIL
 * @example formatCUIT("20123456789") // "20-12345678-9"
 */
export function formatCUIT(cuit: string | null | undefined): string {
  if (!cuit) return "";
  
  const limpio = cuit.replace(/\D/g, "");
  
  if (limpio.length !== 11) return cuit;
  
  return `${limpio.slice(0, 2)}-${limpio.slice(2, 10)}-${limpio.slice(10)}`;
}

// =============================================================================
// ARRAYS / OBJETOS
// =============================================================================

/**
 * Agrupa un array por una propiedad
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const keyValue = String(item[key]);
    (result[keyValue] = result[keyValue] || []).push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Elimina duplicados de un array por una propiedad
 */
export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const keyValue = item[key];
    if (seen.has(keyValue)) return false;
    seen.add(keyValue);
    return true;
  });
}

/**
 * Ordena un array por múltiples propiedades
 */
export function sortBy<T>(
  array: T[],
  ...keys: (keyof T | `-${string & keyof T}`)[]
): T[] {
  return [...array].sort((a, b) => {
    for (const key of keys) {
      const desc = typeof key === "string" && key.startsWith("-");
      const actualKey = (desc ? key.slice(1) : key) as keyof T;
      
      const aVal = a[actualKey];
      const bVal = b[actualKey];
      
      if (aVal < bVal) return desc ? 1 : -1;
      if (aVal > bVal) return desc ? -1 : 1;
    }
    return 0;
  });
}

// =============================================================================
// ASYNC / DEBOUNCE
// =============================================================================

/**
 * Crea una versión debounced de una función
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Espera un tiempo determinado
 * @example await sleep(1000) // espera 1 segundo
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =============================================================================
// URL / QUERY PARAMS
// =============================================================================

/**
 * Construye query string desde un objeto
 * @example buildQueryString({ servicio: "ESCRITURAS", zona: "villa-maria" })
 * // "servicio=ESCRITURAS&zona=villa-maria"
 */
export function buildQueryString(
  params: Record<string, string | number | boolean | null | undefined>
): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
}

/**
 * Parsea query string a objeto
 */
export function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
}