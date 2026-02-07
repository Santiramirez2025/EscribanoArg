// app/buscar/types.ts

export type ViewMode = "grid" | "list";

export type Modalidad = "presencial" | "virtual";

export type TipoServicio =
  | "ESCRITURAS"
  | "DECLARATORIA"
  | "PODERES"
  | "CERTIFICACIONES"
  | "TESTAMENTOS"
  | "DONACIONES"
  | "USUFRUCTO"
  | "LOTEOS"
  | "REGIMEN_PH"
  | "FIDEICOMISOS"
  | "AUTORIZACIONES"
  | "OTROS";

export interface Escribano {
  id: string;
  nombre: string;
  apellido: string;
  foto: string | null;
  matricula: string;
  localidad: string;
  provincia: string;
  calificacion: number;
  totalReviews: number;
  precioConsulta: number | null;
  modalidades: Modalidad[];
  servicios: TipoServicio[];
  verificado: boolean;
  destacado: boolean;
  disponibilidadInmediata: boolean;
}

export interface Filtros {
  servicio: string;
  ubicacion: string;
  modalidad: string;
  calificacionMin: string;
  disponibilidad: string;
  ordenar: string;
}

export interface BusquedaResponse {
  escribanos: Escribano[];
  total: number;
  page: number;
  totalPages: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export const SERVICIOS_OPTIONS: SelectOption[] = [
  { value: "", label: "Todos los servicios" },
  { value: "ESCRITURAS", label: "Escrituras" },
  { value: "DECLARATORIA", label: "Sucesiones" },
  { value: "PODERES", label: "Poderes" },
  { value: "TESTAMENTOS", label: "Testamentos" },
  { value: "DONACIONES", label: "Donaciones" },
  { value: "USUFRUCTO", label: "Usufructo" },
  { value: "CERTIFICACIONES", label: "Certificaciones" },
  { value: "LOTEOS", label: "Loteos y Subdivisiones" },
  { value: "REGIMEN_PH", label: "Régimen de Propiedad Horizontal" },
  { value: "FIDEICOMISOS", label: "Fideicomisos" },
  { value: "AUTORIZACIONES", label: "Autorizaciones" },
];

export const MODALIDAD_OPTIONS: SelectOption[] = [
  { value: "", label: "Todas las modalidades" },
  { value: "presencial", label: "Presencial" },
  { value: "virtual", label: "Virtual (Zoom/Meet)" },
];

export const ORDENAR_OPTIONS: SelectOption[] = [
  { value: "relevancia", label: "Más relevantes" },
  { value: "calificacion", label: "Mejor calificados" },
  { value: "cercania", label: "Más cercanos" },
  { value: "reviews", label: "Más opiniones" },
];

export const CALIFICACION_OPTIONS: SelectOption[] = [
  { value: "", label: "Todas" },
  { value: "4", label: "4+ estrellas" },
  { value: "4.5", label: "4.5+ estrellas" },
];