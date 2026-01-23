export const SERVICIOS_NOTARIALES = {
  ESCRITURAS: { id: "ESCRITURAS", nombre: "Escrituras Públicas", descripcion: "Compraventa, hipotecas, donaciones" },
  DECLARATORIA: { id: "DECLARATORIA", nombre: "Declaratoria de Herederos", descripcion: "Sucesiones y herencias" },
  PODERES: { id: "PODERES", nombre: "Poderes", descripcion: "Generales, especiales y para trámites" },
  CERTIFICACIONES: { id: "CERTIFICACIONES", nombre: "Certificación de Firmas", descripcion: "Firmas y copias" },
  TESTAMENTOS: { id: "TESTAMENTOS", nombre: "Testamentos", descripcion: "Redacción y protocolización" },
  DONACIONES: { id: "DONACIONES", nombre: "Donaciones", descripcion: "Anticipo de herencia" },
  USUFRUCTO: { id: "USUFRUCTO", nombre: "Usufructo", descripcion: "Constitución y extinción" },
  LOTEOS: { id: "LOTEOS", nombre: "Loteos", descripcion: "División de propiedades" },
  REGIMEN_PH: { id: "REGIMEN_PH", nombre: "Propiedad Horizontal", descripcion: "Constitución y reglamentos" },
  FIDEICOMISOS: { id: "FIDEICOMISOS", nombre: "Fideicomisos", descripcion: "Constitución y administración" },
  AUTORIZACIONES: { id: "AUTORIZACIONES", nombre: "Autorizaciones", descripcion: "Viaje y otras" },
} as const;

export const MODALIDADES = {
  PRESENCIAL: { id: "PRESENCIAL", nombre: "Presencial", descripcion: "En oficina" },
  VIRTUAL_ZOOM: { id: "VIRTUAL_ZOOM", nombre: "Virtual (Zoom)", descripcion: "Videollamada" },
  VIRTUAL_WHATSAPP: { id: "VIRTUAL_WHATSAPP", nombre: "Virtual (WhatsApp)", descripcion: "Por WhatsApp" },
} as const;

export const UBICACIONES_AÑO_1 = [
  "Villa María", "Villa Nueva", "Tío Pujio", "Arroyo Cabral", "Ausonia",
  "Chazón", "Etruria", "La Playosa", "Luca", "Pasco", "Sanabria", "Ticino",
] as const;

export type TipoServicioKey = keyof typeof SERVICIOS_NOTARIALES;
export type ModalidadKey = keyof typeof MODALIDADES;
