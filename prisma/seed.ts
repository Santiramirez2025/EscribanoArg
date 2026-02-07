// prisma/seed.ts
import { PrismaClient, PlanType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// =============================================================================
// SEED MASIVO - CIUDADES GRANDES DE ARGENTINA
// Investigación basada en: Colegios de Escribanos, zonas comerciales,
// barrios premium, y distribución geográfica real
// =============================================================================

interface EscribanoSeed {
  name: string;
  email: string;
  matricula: string;
  provincia: string;
  ciudad: string;
  zona?: string; // Barrio o zona específica
  direccion: string;
  experiencia: number;
  calificacion: number;
  totalReviews: number;
  verificado: boolean;
  plan: PlanType;
  whatsapp?: string;
  bio?: string;
  precioEscrituras?: number;
  precioPoderes?: number;
  precioDeclaratoria?: number;
  precioCertificaciones?: number;
  precioTestamentos?: number;
  precioDonaciones?: number;
  precioUsufructo?: number;
  precioLoteos?: number;
  precioRegimenPH?: number;
  precioFideicomisos?: number;
  precioAutorizaciones?: number;
  atencionVirtual?: boolean;
  especialidad?: string;
}

// =============================================================================
// CABA - 15 ESCRIBANOS (Mayor concentración)
// Distribuidos por barrios premium y zonas comerciales
// =============================================================================

const ESCRIBANOS_CABA: EscribanoSeed[] = [
  // ZONA NORTE - RECOLETA / BARRIO NORTE
  {
    name: "María Eugenia Alvarez Rodríguez",
    email: "mealvarez@escribaniarecoleta.com.ar",
    matricula: "CABA-1001",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Recoleta",
    direccion: "Av. Santa Fe 2450, Piso 5°, Recoleta, CABA",
    experiencia: 25,
    calificacion: 4.9,
    totalReviews: 245,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+541145678901",
    bio: "Escribana de primera matrícula. Ex presidenta del Colegio de Escribanos CABA. Especialista en fideicomisos y operaciones de alta complejidad.",
    precioEscrituras: 380000,
    precioPoderes: 130000,
    precioDeclaratoria: 620000,
    precioCertificaciones: 48000,
    precioTestamentos: 220000,
    precioDonaciones: 310000,
    precioUsufructo: 280000,
    precioRegimenPH: 420000,
    precioFideicomisos: 580000,
    precioAutorizaciones: 105000,
    atencionVirtual: true,
    especialidad: "Fideicomisos y Alta Complejidad",
  },
  {
    name: "Eduardo Martín Sánchez Paz",
    email: "esanchez@notariabarronorte.com.ar",
    matricula: "CABA-1002",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Barrio Norte",
    direccion: "Av. Callao 1890, Barrio Norte, CABA",
    experiencia: 22,
    calificacion: 4.8,
    totalReviews: 198,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+541156789012",
    bio: "Especialista en operaciones inmobiliarias premium. Docente en UBA - Derecho Notarial.",
    precioEscrituras: 360000,
    precioPoderes: 125000,
    precioDeclaratoria: 590000,
    precioCertificaciones: 46000,
    precioTestamentos: 210000,
    precioDonaciones: 295000,
    precioRegimenPH: 400000,
    atencionVirtual: true,
    especialidad: "Inmobiliario Premium",
  },

  // ZONA MICROCENTRO / TRIBUNALES
  {
    name: "Alejandra Beatriz Fernández",
    email: "afernandez@escribaniamicrocentro.com.ar",
    matricula: "CABA-1003",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Microcentro",
    direccion: "Av. Corrientes 456, Piso 12, Microcentro, CABA",
    experiencia: 28,
    calificacion: 4.9,
    totalReviews: 312,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+541167890123",
    bio: "Trayectoria destacada en derecho corporativo. Especialista en M&A, fusiones y adquisiciones.",
    precioEscrituras: 370000,
    precioPoderes: 135000,
    precioDeclaratoria: 610000,
    precioCertificaciones: 50000,
    precioTestamentos: 215000,
    precioFideicomisos: 600000,
    precioAutorizaciones: 110000,
    atencionVirtual: true,
    especialidad: "Derecho Corporativo - M&A",
  },
  {
    name: "Carlos Alberto Martínez Paz",
    email: "cmartinez@notariatribunales.com.ar",
    matricula: "CABA-1004",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Tribunales",
    direccion: "Talcahuano 567, Tribunales, CABA",
    experiencia: 24,
    calificacion: 4.8,
    totalReviews: 187,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+541178901234",
    bio: "Especialista en startups y sociedades tecnológicas. Asesor de inversiones extranjeras.",
    precioEscrituras: 340000,
    precioPoderes: 120000,
    precioDeclaratoria: 570000,
    precioCertificaciones: 45000,
    precioFideicomisos: 520000,
    atencionVirtual: true,
    especialidad: "Startups y Tech",
  },

  // PALERMO
  {
    name: "Daniela Soledad Ramírez",
    email: "dramirez@escribaniapalermo.com.ar",
    matricula: "CABA-1005",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Palermo",
    direccion: "Av. Santa Fe 4120, Palermo, CABA",
    experiencia: 18,
    calificacion: 4.9,
    totalReviews: 223,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+541189012345",
    bio: "Escribana digital. Pionera en trámites remotos y firma digital. Especialista en desarrollos inmobiliarios.",
    precioEscrituras: 350000,
    precioPoderes: 122000,
    precioDeclaratoria: 580000,
    precioCertificaciones: 44000,
    precioTestamentos: 205000,
    precioDonaciones: 285000,
    precioLoteos: 480000,
    precioRegimenPH: 390000,
    atencionVirtual: true,
    especialidad: "Desarrollos Inmobiliarios",
  },
  {
    name: "Martín Alejandro Lagos",
    email: "mlagos@notariasoho.com.ar",
    matricula: "CABA-1006",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Palermo Soho",
    direccion: "Honduras 4890, Palermo Soho, CABA",
    experiencia: 15,
    calificacion: 4.7,
    totalReviews: 167,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+541190123456",
    bio: "Escribano joven con enfoque moderno. Atención personalizada para emprendedores y profesionales.",
    precioEscrituras: 320000,
    precioPoderes: 110000,
    precioDeclaratoria: 540000,
    precioCertificaciones: 40000,
    precioTestamentos: 185000,
    atencionVirtual: true,
    especialidad: "Emprendedores",
  },

  // BELGRANO
  {
    name: "Roberto Daniel Sánchez",
    email: "rsanchez@notariabelgrano.com.ar",
    matricula: "CABA-1007",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Belgrano",
    direccion: "Av. Cabildo 2890, Belgrano, CABA",
    experiencia: 20,
    calificacion: 4.8,
    totalReviews: 176,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+541101234567",
    bio: "Especialista en planificación patrimonial familiar y sucesiones complejas.",
    precioEscrituras: 330000,
    precioPoderes: 115000,
    precioDeclaratoria: 560000,
    precioCertificaciones: 43000,
    precioTestamentos: 200000,
    precioDonaciones: 275000,
    precioUsufructo: 260000,
    atencionVirtual: true,
    especialidad: "Planificación Patrimonial",
  },
  {
    name: "Patricia Elena Giménez",
    email: "pgimenez@escribaniabelgrano.com.ar",
    matricula: "CABA-1008",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Belgrano R",
    direccion: "Juramento 2345, Belgrano, CABA",
    experiencia: 19,
    calificacion: 4.8,
    totalReviews: 154,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+541112345678",
    bio: "Atención familiar y cercana. Especialista en compraventa residencial.",
    precioEscrituras: 315000,
    precioPoderes: 108000,
    precioDeclaratoria: 530000,
    precioCertificaciones: 39000,
    precioTestamentos: 180000,
    atencionVirtual: true,
    especialidad: "Compraventa Residencial",
  },

  // CABALLITO / VILLA CRESPO
  {
    name: "Claudia Patricia Morales",
    email: "cmorales@escribaniacaballito.com.ar",
    matricula: "CABA-1009",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Caballito",
    direccion: "Av. Rivadavia 5670, Caballito, CABA",
    experiencia: 18,
    calificacion: 4.7,
    totalReviews: 143,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+541123456789",
    bio: "Escribana de barrio con amplia experiencia. Precios accesibles y atención personalizada.",
    precioEscrituras: 295000,
    precioPoderes: 102000,
    precioDeclaratoria: 510000,
    precioCertificaciones: 38000,
    precioTestamentos: 175000,
    precioDonaciones: 245000,
    atencionVirtual: true,
    especialidad: "General - Barrio",
  },
  {
    name: "Jorge Luis Peralta",
    email: "jperalta@notariavcresto.com.ar",
    matricula: "CABA-1010",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Villa Crespo",
    direccion: "Av. Corrientes 6789, Villa Crespo, CABA",
    experiencia: 16,
    calificacion: 4.6,
    totalReviews: 128,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+541134567890",
    bio: "Atención ágil y profesional. Horarios extendidos para profesionales.",
    precioEscrituras: 285000,
    precioPoderes: 98000,
    precioDeclaratoria: 495000,
    precioCertificaciones: 36000,
    precioTestamentos: 168000,
    atencionVirtual: true,
    especialidad: "General",
  },

  // PUERTO MADERO / SAN TELMO
  {
    name: "Florencia Victoria Russo",
    email: "frusso@escribaniapuertomadero.com.ar",
    matricula: "CABA-1011",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Puerto Madero",
    direccion: "Av. Alicia Moreau de Justo 1050, Puerto Madero, CABA",
    experiencia: 17,
    calificacion: 4.9,
    totalReviews: 203,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+541145678902",
    bio: "Especialista en torres de lujo y emprendimientos premium. Inglés fluido para inversores extranjeros.",
    precioEscrituras: 390000,
    precioPoderes: 138000,
    precioDeclaratoria: 630000,
    precioCertificaciones: 52000,
    precioTestamentos: 225000,
    precioRegimenPH: 450000,
    precioFideicomisos: 610000,
    atencionVirtual: true,
    especialidad: "Lujo e Inversores Extranjeros",
  },

  // NÚÑEZ / SAAVEDRA
  {
    name: "Gustavo Adrián Torres",
    email: "gtorres@notarianunez.com.ar",
    matricula: "CABA-1012",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Núñez",
    direccion: "Av. Cabildo 4567, Núñez, CABA",
    experiencia: 21,
    calificacion: 4.7,
    totalReviews: 165,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+541156789013",
    bio: "Escribano de zona norte. Especialista en propiedad horizontal y desarrollos en altura.",
    precioEscrituras: 310000,
    precioPoderes: 106000,
    precioDeclaratoria: 525000,
    precioCertificaciones: 39000,
    precioRegimenPH: 370000,
    atencionVirtual: true,
    especialidad: "Propiedad Horizontal",
  },

  // ALMAGRO
  {
    name: "Silvia Beatriz Domínguez",
    email: "sdominguez@escribaniaalmagro.com.ar",
    matricula: "CABA-1013",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Almagro",
    direccion: "Av. Corrientes 3456, Almagro, CABA",
    experiencia: 23,
    calificacion: 4.8,
    totalReviews: 189,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+541167890124",
    bio: "Más de 20 años en Almagro. Referente en la zona. Especialista en sucesiones.",
    precioEscrituras: 300000,
    precioPoderes: 104000,
    precioDeclaratoria: 515000,
    precioCertificaciones: 38000,
    precioTestamentos: 178000,
    precioDonaciones: 250000,
    atencionVirtual: false,
    especialidad: "Sucesiones",
  },

  // COLEGIALES / CHACARITA
  {
    name: "Hernán Sebastián Vega",
    email: "hvega@notariacolegiales.com.ar",
    matricula: "CABA-1014",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Colegiales",
    direccion: "Av. Federico Lacroze 2890, Colegiales, CABA",
    experiencia: 14,
    calificacion: 4.6,
    totalReviews: 112,
    verificado: true,
    plan: "BASICO",
    whatsapp: "+541178901235",
    bio: "Escribano joven con visión moderna. Precios competitivos.",
    precioEscrituras: 275000,
    precioPoderes: 95000,
    precioDeclaratoria: 480000,
    precioCertificaciones: 35000,
    precioTestamentos: 165000,
    atencionVirtual: true,
    especialidad: "General - Competitivo",
  },

  // FLORES
  {
    name: "Mónica Alejandra Castro",
    email: "mcastro@escribaniaflores.com.ar",
    matricula: "CABA-1015",
    provincia: "CABA",
    ciudad: "CABA",
    zona: "Flores",
    direccion: "Av. Rivadavia 7890, Flores, CABA",
    experiencia: 19,
    calificacion: 4.7,
    totalReviews: 147,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+541189012346",
    bio: "Atención familiar en Flores. Amplia trayectoria en la zona oeste.",
    precioEscrituras: 280000,
    precioPoderes: 96000,
    precioDeclaratoria: 490000,
    precioCertificaciones: 36000,
    precioTestamentos: 170000,
    precioDonaciones: 240000,
    atencionVirtual: true,
    especialidad: "Zona Oeste - Familiar",
  },
];

// =============================================================================
// CÓRDOBA CAPITAL - 10 ESCRIBANOS
// =============================================================================

const ESCRIBANOS_CORDOBA: EscribanoSeed[] = [
  // CENTRO
  {
    name: "Pablo Gustavo Pérez",
    email: "pperez@notariacordobacentro.com.ar",
    matricula: "CBA-2001",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "Centro",
    direccion: "Av. Colón 450, Centro, Córdoba Capital",
    experiencia: 26,
    calificacion: 4.9,
    totalReviews: 234,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493514123456",
    bio: "Escribano de referencia en Córdoba. Ex vocal del Colegio de Escribanos. Especialista en sociedades y fideicomisos.",
    precioEscrituras: 300000,
    precioPoderes: 105000,
    precioDeclaratoria: 520000,
    precioCertificaciones: 40000,
    precioTestamentos: 185000,
    precioDonaciones: 255000,
    precioRegimenPH: 370000,
    precioFideicomisos: 490000,
    atencionVirtual: true,
    especialidad: "Sociedades y Fideicomisos",
  },
  {
    name: "Andrea Valeria Gómez",
    email: "agomez@escribaniacentrocba.com.ar",
    matricula: "CBA-2002",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "Centro",
    direccion: "27 de Abril 234, Centro, Córdoba Capital",
    experiencia: 22,
    calificacion: 4.8,
    totalReviews: 198,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493514234567",
    bio: "Especialista en trámites corporativos y comerciales. Atención a empresas.",
    precioEscrituras: 290000,
    precioPoderes: 102000,
    precioDeclaratoria: 510000,
    precioCertificaciones: 39000,
    precioFideicomisos: 475000,
    atencionVirtual: true,
    especialidad: "Corporativo",
  },

  // NUEVA CÓRDOBA
  {
    name: "Laura Silvina González",
    email: "lgonzalez@notarianvacba.com.ar",
    matricula: "CBA-2003",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "Nueva Córdoba",
    direccion: "Av. Hipólito Yrigoyen 567, Nueva Córdoba, Córdoba Capital",
    experiencia: 19,
    calificacion: 4.9,
    totalReviews: 212,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493514345678",
    bio: "Escribana digital. Pionera en firma electrónica en Córdoba. Especialista en emprendimientos inmobiliarios.",
    precioEscrituras: 285000,
    precioPoderes: 100000,
    precioDeclaratoria: 505000,
    precioCertificaciones: 38000,
    precioTestamentos: 180000,
    precioLoteos: 450000,
    precioRegimenPH: 360000,
    atencionVirtual: true,
    especialidad: "Desarrollos Inmobiliarios",
  },
  {
    name: "Diego Martín Navarro",
    email: "dnavarro@escribanianuevacba.com.ar",
    matricula: "CBA-2004",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "Nueva Córdoba",
    direccion: "Bv. Illia 890, Nueva Córdoba, Córdoba Capital",
    experiencia: 17,
    calificacion: 4.7,
    totalReviews: 165,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493514456789",
    bio: "Atención personalizada para jóvenes profesionales. Horarios flexibles.",
    precioEscrituras: 275000,
    precioPoderes: 96000,
    precioDeclaratoria: 490000,
    precioCertificaciones: 36000,
    precioTestamentos: 172000,
    atencionVirtual: true,
    especialidad: "Jóvenes Profesionales",
  },

  // GENERAL PAZ
  {
    name: "Marcelo Fabián Rodríguez",
    email: "mrodriguez@notariageneralpaz.com.ar",
    matricula: "CBA-2005",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "General Paz",
    direccion: "Av. Colón 5678, Barrio General Paz, Córdoba Capital",
    experiencia: 24,
    calificacion: 4.8,
    totalReviews: 187,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493514567890",
    bio: "Referente en zona sur de Córdoba. Especialista en sucesiones complejas.",
    precioEscrituras: 280000,
    precioPoderes: 98000,
    precioDeclaratoria: 500000,
    precioCertificaciones: 37000,
    precioTestamentos: 178000,
    precioDonaciones: 248000,
    precioUsufructo: 240000,
    atencionVirtual: true,
    especialidad: "Sucesiones",
  },

  // CERRO DE LAS ROSAS
  {
    name: "Gabriela Susana Pereyra",
    email: "gpereyra@escribaniacerrorosas.com.ar",
    matricula: "CBA-2006",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "Cerro de las Rosas",
    direccion: "Rafael Núñez 4567, Cerro de las Rosas, Córdoba Capital",
    experiencia: 21,
    calificacion: 4.9,
    totalReviews: 223,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493514678901",
    bio: "Especialista en barrios residenciales premium. Atención personalizada a familias.",
    precioEscrituras: 295000,
    precioPoderes: 103000,
    precioDeclaratoria: 515000,
    precioCertificaciones: 39000,
    precioTestamentos: 183000,
    precioDonaciones: 252000,
    atencionVirtual: true,
    especialidad: "Residencial Premium",
  },

  // ALTA CÓRDOBA
  {
    name: "Roberto Carlos Díaz",
    email: "rdiaz@notariaaltacordoba.com.ar",
    matricula: "CBA-2007",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "Alta Córdoba",
    direccion: "Av. Colón 1234, Alta Córdoba, Córdoba Capital",
    experiencia: 18,
    calificacion: 4.7,
    totalReviews: 143,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493514789012",
    bio: "Escribano de barrio con enfoque comunitario. Precios accesibles.",
    precioEscrituras: 265000,
    precioPoderes: 92000,
    precioDeclaratoria: 475000,
    precioCertificaciones: 35000,
    precioTestamentos: 168000,
    atencionVirtual: true,
    especialidad: "Barrio - Accesible",
  },

  // ARGÜELLO
  {
    name: "Carolina Beatriz Molina",
    email: "cmolina@escribaniaargüello.com.ar",
    matricula: "CBA-2008",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "Argüello",
    direccion: "Recta Martinolli 8900, Argüello, Córdoba Capital",
    experiencia: 15,
    calificacion: 4.6,
    totalReviews: 118,
    verificado: true,
    plan: "BASICO",
    whatsapp: "+5493514890123",
    bio: "Atención en zona noroeste. Especialista en loteos y countries.",
    precioEscrituras: 270000,
    precioPoderes: 94000,
    precioDeclaratoria: 485000,
    precioCertificaciones: 36000,
    precioLoteos: 440000,
    atencionVirtual: true,
    especialidad: "Loteos y Countries",
  },

  // GÜEMES
  {
    name: "Florencia Victoria Acosta",
    email: "facosta@notariaguemes.com.ar",
    matricula: "CBA-2009",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "Güemes",
    direccion: "Belgrano 567, Güemes, Córdoba Capital",
    experiencia: 14,
    calificacion: 4.8,
    totalReviews: 156,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493514901234",
    bio: "Escribana joven especializada en comercios y locales gastronómicos.",
    precioEscrituras: 272000,
    precioPoderes: 95000,
    precioDeclaratoria: 488000,
    precioCertificaciones: 36000,
    atencionVirtual: true,
    especialidad: "Comercial - Gastronomía",
  },

  // SAN VICENTE
  {
    name: "Héctor Luis Ramírez",
    email: "hramirez@escribaniasanvicente.com.ar",
    matricula: "CBA-2010",
    provincia: "Córdoba",
    ciudad: "Córdoba Capital",
    zona: "San Vicente",
    direccion: "Duarte Quirós 2345, San Vicente, Córdoba Capital",
    experiencia: 20,
    calificacion: 4.7,
    totalReviews: 172,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493515012345",
    bio: "Amplia experiencia en zona oeste. Atención familiar y cercana.",
    precioEscrituras: 268000,
    precioPoderes: 93000,
    precioDeclaratoria: 482000,
    precioCertificaciones: 36000,
    precioTestamentos: 175000,
    precioDonaciones: 245000,
    atencionVirtual: true,
    especialidad: "Zona Oeste - Familiar",
  },
];

// =============================================================================
// ROSARIO - 10 ESCRIBANOS
// =============================================================================

const ESCRIBANOS_ROSARIO: EscribanoSeed[] = [
  // CENTRO
  {
    name: "Fernando Luis Torres",
    email: "ftorres@notariarosariocentro.com.ar",
    matricula: "SF-3001",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Centro",
    direccion: "Córdoba 1250, Centro, Rosario, Santa Fe",
    experiencia: 27,
    calificacion: 4.9,
    totalReviews: 267,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493414567890",
    bio: "Escribano referente en Rosario. Especialista en comercio exterior, operaciones portuarias y agronegocios.",
    precioEscrituras: 295000,
    precioPoderes: 103000,
    precioDeclaratoria: 515000,
    precioCertificaciones: 40000,
    precioTestamentos: 183000,
    precioDonaciones: 252000,
    precioFideicomisos: 480000,
    atencionVirtual: true,
    especialidad: "Comercio Exterior y Agronegocios",
  },
  {
    name: "Gabriela Susana Pereyra",
    email: "gpereyra@escribaniarosario.com.ar",
    matricula: "SF-3002",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Centro",
    direccion: "San Martín 890, Rosario, Santa Fe",
    experiencia: 23,
    calificacion: 4.8,
    totalReviews: 198,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493414678901",
    bio: "Especialista en derecho de familia y mediación. Amplia experiencia en sucesiones.",
    precioEscrituras: 285000,
    precioPoderes: 100000,
    precioDeclaratoria: 505000,
    precioCertificaciones: 38000,
    precioTestamentos: 178000,
    precioDonaciones: 248000,
    precioUsufructo: 245000,
    atencionVirtual: true,
    especialidad: "Familia y Sucesiones",
  },

  // PICHINCHA
  {
    name: "Diego Martín Castro",
    email: "dcastro@notariapichincha.com.ar",
    matricula: "SF-3003",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Pichincha",
    direccion: "Av. Pellegrini 1456, Pichincha, Rosario, Santa Fe",
    experiencia: 19,
    calificacion: 4.8,
    totalReviews: 176,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493414789012",
    bio: "Especialista en emprendimientos inmobiliarios y desarrollos en altura.",
    precioEscrituras: 280000,
    precioPoderes: 98000,
    precioDeclaratoria: 500000,
    precioCertificaciones: 37000,
    precioRegimenPH: 375000,
    precioLoteos: 460000,
    atencionVirtual: true,
    especialidad: "Desarrollos Inmobiliarios",
  },

  // FISHERTON
  {
    name: "Patricia Elena Rossi",
    email: "prossi@escribaniafisherton.com.ar",
    matricula: "SF-3004",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Fisherton",
    direccion: "Av. Eva Perón 8900, Fisherton, Rosario, Santa Fe",
    experiencia: 21,
    calificacion: 4.7,
    totalReviews: 154,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493414890123",
    bio: "Atención en zona oeste de Rosario. Especialista en barrios cerrados.",
    precioEscrituras: 272000,
    precioPoderes: 95000,
    precioDeclaratoria: 490000,
    precioCertificaciones: 36000,
    precioTestamentos: 175000,
    atencionVirtual: true,
    especialidad: "Barrios Cerrados",
  },

  // ECHESORTU
  {
    name: "Marcela Beatriz Navarro",
    email: "mnavarro@notariaechesortu.com.ar",
    matricula: "SF-3005",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Echesortu",
    direccion: "Bv. Oroño 567, Echesortu, Rosario, Santa Fe",
    experiencia: 18,
    calificacion: 4.9,
    totalReviews: 189,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493414901234",
    bio: "Escribana especializada en propiedad horizontal y edificios de categoría.",
    precioEscrituras: 288000,
    precioPoderes: 101000,
    precioDeclaratoria: 508000,
    precioCertificaciones: 38000,
    precioRegimenPH: 380000,
    atencionVirtual: true,
    especialidad: "Propiedad Horizontal",
  },

  // ALBERDI
  {
    name: "Ricardo Fabián Mendoza",
    email: "rmendoza@escribaniaalberdi.com.ar",
    matricula: "SF-3006",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Alberdi",
    direccion: "Av. Alberdi 2345, Alberdi, Rosario, Santa Fe",
    experiencia: 22,
    calificacion: 4.7,
    totalReviews: 167,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493415012345",
    bio: "Más de 20 años en Rosario. Atención familiar y cercana.",
    precioEscrituras: 270000,
    precioPoderes: 94000,
    precioDeclaratoria: 485000,
    precioCertificaciones: 36000,
    precioTestamentos: 173000,
    precioDonaciones: 243000,
    atencionVirtual: true,
    especialidad: "Familiar",
  },

  // CENTRO NORTE
  {
    name: "Claudia Soledad Vega",
    email: "cvega@notariacentronorte.com.ar",
    matricula: "SF-3007",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Centro Norte",
    direccion: "Entre Ríos 890, Centro Norte, Rosario, Santa Fe",
    experiencia: 16,
    calificacion: 4.6,
    totalReviews: 134,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493415123456",
    bio: "Escribana con enfoque moderno. Atención ágil y eficiente.",
    precioEscrituras: 268000,
    precioPoderes: 93000,
    precioDeclaratoria: 482000,
    precioCertificaciones: 36000,
    atencionVirtual: true,
    especialidad: "General - Ágil",
  },

  // LISANDRO DE LA TORRE
  {
    name: "Martín Alejandro Giménez",
    email: "mgimenez@escribanialisandro.com.ar",
    matricula: "SF-3008",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Lisandro de la Torre",
    direccion: "Av. Provincias Unidas 1234, Lisandro de la Torre, Rosario, Santa Fe",
    experiencia: 15,
    calificacion: 4.7,
    totalReviews: 143,
    verificado: true,
    plan: "BASICO",
    whatsapp: "+5493415234567",
    bio: "Precios competitivos. Atención a jóvenes compradores.",
    precioEscrituras: 262000,
    precioPoderes: 91000,
    precioDeclaratoria: 475000,
    precioCertificaciones: 35000,
    precioTestamentos: 168000,
    atencionVirtual: true,
    especialidad: "Primeros Compradores",
  },

  // MACROCENTRO
  {
    name: "Verónica Soledad Díaz",
    email: "vdiaz@notariamacrocentro.com.ar",
    matricula: "SF-3009",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Macrocentro",
    direccion: "Santa Fe 1567, Macrocentro, Rosario, Santa Fe",
    experiencia: 20,
    calificacion: 4.8,
    totalReviews: 178,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493415345678",
    bio: "Especialista en comercios y locales comerciales.",
    precioEscrituras: 275000,
    precioPoderes: 96000,
    precioDeclaratoria: 492000,
    precioCertificaciones: 37000,
    atencionVirtual: true,
    especialidad: "Locales Comerciales",
  },

  // PARQUE INDEPENDENCIA
  {
    name: "Hernán Sebastián Ortiz",
    email: "hortiz@escribaniaparque.com.ar",
    matricula: "SF-3010",
    provincia: "Santa Fe",
    ciudad: "Rosario",
    zona: "Parque Independencia",
    direccion: "Bv. Oroño 1890, Parque Independencia, Rosario, Santa Fe",
    experiencia: 17,
    calificacion: 4.7,
    totalReviews: 161,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493415456789",
    bio: "Atención personalizada en zona residencial premium.",
    precioEscrituras: 278000,
    precioPoderes: 97000,
    precioDeclaratoria: 495000,
    precioCertificaciones: 37000,
    precioTestamentos: 176000,
    atencionVirtual: true,
    especialidad: "Residencial",
  },
];

// =============================================================================
// MENDOZA - 6 ESCRIBANOS
// =============================================================================

const ESCRIBANOS_MENDOZA: EscribanoSeed[] = [
  {
    name: "Ricardo Alejandro Navarro",
    email: "rnavarro@escribaniamendozacentro.com.ar",
    matricula: "MZA-4001",
    provincia: "Mendoza",
    ciudad: "Mendoza Capital",
    zona: "Centro",
    direccion: "San Martín 1145, Ciudad, Mendoza Capital",
    experiencia: 28,
    calificacion: 4.9,
    totalReviews: 245,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5492614890123",
    bio: "Referente en Mendoza. Especialista en derecho vitivinícola, fincas, bodegas y turismo enológico.",
    precioEscrituras: 290000,
    precioPoderes: 102000,
    precioDeclaratoria: 510000,
    precioCertificaciones: 39000,
    precioTestamentos: 182000,
    precioDonaciones: 250000,
    precioFideicomisos: 475000,
    atencionVirtual: true,
    especialidad: "Vitivinícola y Turismo",
  },
  {
    name: "Andrea Valeria Suárez",
    email: "asuarez@notariamendoza.com.ar",
    matricula: "MZA-4002",
    provincia: "Mendoza",
    ciudad: "Mendoza Capital",
    zona: "Quinta Sección",
    direccion: "Av. Las Heras 234, Mendoza Capital",
    experiencia: 21,
    calificacion: 4.8,
    totalReviews: 189,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5492614901234",
    bio: "Especialista en desarrollos inmobiliarios de montaña y loteos cordilleranos.",
    precioEscrituras: 282000,
    precioPoderes: 99000,
    precioDeclaratoria: 502000,
    precioCertificaciones: 38000,
    precioTestamentos: 178000,
    precioLoteos: 455000,
    atencionVirtual: true,
    especialidad: "Desarrollos de Montaña",
  },
  {
    name: "Miguel Ángel Fernández",
    email: "mfernandez@escribaniachacras.com.ar",
    matricula: "MZA-4003",
    provincia: "Mendoza",
    ciudad: "Mendoza Capital",
    zona: "Chacras de Coria",
    direccion: "Urquiza 567, Chacras de Coria, Mendoza",
    experiencia: 19,
    calificacion: 4.7,
    totalReviews: 156,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5492615012345",
    bio: "Especialista en zona de Chacras. Atención a inversores en bodegas boutique.",
    precioEscrituras: 275000,
    precioPoderes: 96000,
    precioDeclaratoria: 495000,
    precioCertificaciones: 37000,
    precioTestamentos: 175000,
    atencionVirtual: true,
    especialidad: "Bodegas Boutique",
  },
  {
    name: "Silvia Beatriz Romero",
    email: "sromero@notariagodoycruz.com.ar",
    matricula: "MZA-4004",
    provincia: "Mendoza",
    ciudad: "Godoy Cruz",
    zona: "Godoy Cruz Centro",
    direccion: "San Martín 890, Godoy Cruz, Mendoza",
    experiencia: 17,
    calificacion: 4.8,
    totalReviews: 167,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5492615123456",
    bio: "Atención familiar en Godoy Cruz. Especialista en propiedad horizontal.",
    precioEscrituras: 270000,
    precioPoderes: 94000,
    precioDeclaratoria: 488000,
    precioCertificaciones: 36000,
    precioRegimenPH: 365000,
    atencionVirtual: true,
    especialidad: "Propiedad Horizontal",
  },
  {
    name: "Gustavo Adrián Torres",
    email: "gtorres@escribanialujan.com.ar",
    matricula: "MZA-4005",
    provincia: "Mendoza",
    ciudad: "Luján de Cuyo",
    zona: "Luján Centro",
    direccion: "Belgrano 234, Luján de Cuyo, Mendoza",
    experiencia: 16,
    calificacion: 4.6,
    totalReviews: 134,
    verificado: true,
    plan: "BASICO",
    whatsapp: "+5492615234567",
    bio: "Escribano en zona de viñedos. Precios competitivos.",
    precioEscrituras: 265000,
    precioPoderes: 92000,
    precioDeclaratoria: 480000,
    precioCertificaciones: 35000,
    atencionVirtual: true,
    especialidad: "General - Competitivo",
  },
  {
    name: "Carolina Beatriz Molina",
    email: "cmolina@notariamaipu.com.ar",
    matricula: "MZA-4006",
    provincia: "Mendoza",
    ciudad: "Maipú",
    zona: "Maipú Centro",
    direccion: "Maza 456, Maipú, Mendoza",
    experiencia: 14,
    calificacion: 4.7,
    totalReviews: 123,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5492615345678",
    bio: "Atención en Maipú. Especialista en comercios y pequeños productores.",
    precioEscrituras: 268000,
    precioPoderes: 93000,
    precioDeclaratoria: 485000,
    precioCertificaciones: 36000,
    precioTestamentos: 173000,
    atencionVirtual: true,
    especialidad: "Comercios Locales",
  },
];

// =============================================================================
// LA PLATA - 5 ESCRIBANOS
// =============================================================================

const ESCRIBANOS_LA_PLATA: EscribanoSeed[] = [
  {
    name: "Mónica Alejandra Díaz",
    email: "mdiaz@escribanialaplatacentro.com.ar",
    matricula: "BA-5001",
    provincia: "Buenos Aires",
    ciudad: "La Plata",
    zona: "Centro",
    direccion: "Calle 7 N° 890, La Plata, Buenos Aires",
    experiencia: 25,
    calificacion: 4.9,
    totalReviews: 223,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+542214123456",
    bio: "Escribana de La Plata con trayectoria destacada. Docente universitaria en UNLP.",
    precioEscrituras: 288000,
    precioPoderes: 101000,
    precioDeclaratoria: 505000,
    precioCertificaciones: 39000,
    precioTestamentos: 180000,
    precioDonaciones: 248000,
    precioFideicomisos: 470000,
    atencionVirtual: true,
    especialidad: "Académico - Universitario",
  },
  {
    name: "Jorge Alberto Méndez",
    email: "jmendez@notarialaplata.com.ar",
    matricula: "BA-5002",
    provincia: "Buenos Aires",
    ciudad: "La Plata",
    zona: "Centro",
    direccion: "Av. 51 N° 567, La Plata, Buenos Aires",
    experiencia: 22,
    calificacion: 4.8,
    totalReviews: 198,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+542214234567",
    bio: "Especialista en propiedad horizontal y edificios de la zona céntrica.",
    precioEscrituras: 280000,
    precioPoderes: 98000,
    precioDeclaratoria: 498000,
    precioCertificaciones: 38000,
    precioRegimenPH: 370000,
    atencionVirtual: true,
    especialidad: "Propiedad Horizontal",
  },
  {
    name: "Patricia Elena Giménez",
    email: "pgimenez@escribaniacitybellberisso.com.ar",
    matricula: "BA-5003",
    provincia: "Buenos Aires",
    ciudad: "La Plata",
    zona: "City Bell",
    direccion: "Cantilo 234, City Bell, Buenos Aires",
    experiencia: 18,
    calificacion: 4.7,
    totalReviews: 167,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+542214345678",
    bio: "Atención en City Bell y alrededores. Especialista en barrios residenciales.",
    precioEscrituras: 275000,
    precioPoderes: 96000,
    precioDeclaratoria: 492000,
    precioCertificaciones: 37000,
    precioTestamentos: 176000,
    atencionVirtual: true,
    especialidad: "Barrios Residenciales",
  },
  {
    name: "Hernán Sebastián Vega",
    email: "hvega@notariagonnet.com.ar",
    matricula: "BA-5004",
    provincia: "Buenos Aires",
    ciudad: "La Plata",
    zona: "Gonnet",
    direccion: "Camino Centenario 890, Gonnet, Buenos Aires",
    experiencia: 16,
    calificacion: 4.6,
    totalReviews: 145,
    verificado: true,
    plan: "BASICO",
    whatsapp: "+542214456789",
    bio: "Escribano joven con precios competitivos. Zona de Gonnet.",
    precioEscrituras: 268000,
    precioPoderes: 93000,
    precioDeclaratoria: 485000,
    precioCertificaciones: 36000,
    atencionVirtual: true,
    especialidad: "Competitivo",
  },
  {
    name: "Claudia Soledad Morales",
    email: "cmorales@escribaniatolosa.com.ar",
    matricula: "BA-5005",
    provincia: "Buenos Aires",
    ciudad: "La Plata",
    zona: "Tolosa",
    direccion: "Calle 2 N° 1234, Tolosa, La Plata, Buenos Aires",
    experiencia: 19,
    calificacion: 4.7,
    totalReviews: 154,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+542214567890",
    bio: "Atención familiar en Tolosa. Amplia experiencia en sucesiones.",
    precioEscrituras: 272000,
    precioPoderes: 95000,
    precioDeclaratoria: 488000,
    precioCertificaciones: 37000,
    precioTestamentos: 175000,
    precioDonaciones: 245000,
    atencionVirtual: true,
    especialidad: "Sucesiones Familiares",
  },
];

// =============================================================================
// MAR DEL PLATA - 5 ESCRIBANOS
// =============================================================================

const ESCRIBANOS_MAR_DEL_PLATA: EscribanoSeed[] = [
  {
    name: "Silvia Cristina Romero",
    email: "sromero@escribaniamdpcentro.com.ar",
    matricula: "BA-6001",
    provincia: "Buenos Aires",
    ciudad: "Mar del Plata",
    zona: "Centro",
    direccion: "San Martín 2890, Mar del Plata, Buenos Aires",
    experiencia: 24,
    calificacion: 4.9,
    totalReviews: 234,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+542234567890",
    bio: "Referente en Mar del Plata. Especialista en inversiones turísticas y hotelería.",
    precioEscrituras: 285000,
    precioPoderes: 100000,
    precioDeclaratoria: 502000,
    precioCertificaciones: 39000,
    precioTestamentos: 178000,
    precioDonaciones: 248000,
    atencionVirtual: true,
    especialidad: "Turismo y Hotelería",
  },
  {
    name: "Ricardo Fabián Navarro",
    email: "rnavarro@notariamdq.com.ar",
    matricula: "BA-6002",
    provincia: "Buenos Aires",
    ciudad: "Mar del Plata",
    zona: "La Perla",
    direccion: "Av. Constitución 5678, La Perla, Mar del Plata, Buenos Aires",
    experiencia: 21,
    calificacion: 4.8,
    totalReviews: 198,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+542234678901",
    bio: "Especialista en propiedades costeras y edificios frente al mar.",
    precioEscrituras: 278000,
    precioPoderes: 97000,
    precioDeclaratoria: 495000,
    precioCertificaciones: 38000,
    precioRegimenPH: 380000,
    atencionVirtual: true,
    especialidad: "Propiedades Costeras",
  },
  {
    name: "Hernán Sebastián Ortiz",
    email: "hortiz@escribanialuro.com.ar",
    matricula: "BA-6003",
    provincia: "Buenos Aires",
    ciudad: "Mar del Plata",
    zona: "Centro",
    direccion: "Av. Luro 1456, Mar del Plata, Buenos Aires",
    experiencia: 18,
    calificacion: 4.7,
    totalReviews: 167,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+542234789012",
    bio: "Atención moderna y digital. Especialista en compradores jóvenes.",
    precioEscrituras: 270000,
    precioPoderes: 94000,
    precioDeclaratoria: 488000,
    precioCertificaciones: 37000,
    precioTestamentos: 173000,
    atencionVirtual: true,
    especialidad: "Compradores Jóvenes",
  },
  {
    name: "Gabriela Susana Pereyra",
    email: "gpereyra@notariapuntamogotes.com.ar",
    matricula: "BA-6004",
    provincia: "Buenos Aires",
    ciudad: "Mar del Plata",
    zona: "Punta Mogotes",
    direccion: "Av. Martínez de Hoz 6789, Punta Mogotes, Mar del Plata, Buenos Aires",
    experiencia: 17,
    calificacion: 4.8,
    totalReviews: 176,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+542234890123",
    bio: "Especialista en zona sur. Atención en Punta Mogotes y alrededores.",
    precioEscrituras: 275000,
    precioPoderes: 96000,
    precioDeclaratoria: 492000,
    precioCertificaciones: 37000,
    precioTestamentos: 175000,
    atencionVirtual: true,
    especialidad: "Zona Sur",
  },
  {
    name: "Diego Martín Castro",
    email: "dcastro@escribaniastelmo.com.ar",
    matricula: "BA-6005",
    provincia: "Buenos Aires",
    ciudad: "Mar del Plata",
    zona: "Stella Maris",
    direccion: "Av. Libertad 3456, Stella Maris, Mar del Plata, Buenos Aires",
    experiencia: 15,
    calificacion: 4.6,
    totalReviews: 143,
    verificado: true,
    plan: "BASICO",
    whatsapp: "+542234901234",
    bio: "Atención en zona de Stella Maris. Precios accesibles.",
    precioEscrituras: 265000,
    precioPoderes: 92000,
    precioDeclaratoria: 480000,
    precioCertificaciones: 36000,
    atencionVirtual: true,
    especialidad: "Zona Balnearia",
  },
];

// =============================================================================
// SALTA - 3 ESCRIBANOS
// =============================================================================

const ESCRIBANOS_SALTA: EscribanoSeed[] = [
  {
    name: "Miguel Ángel Vargas",
    email: "mvargas@escribaniasaltacentro.com.ar",
    matricula: "SAL-7001",
    provincia: "Salta",
    ciudad: "Salta Capital",
    zona: "Centro",
    direccion: "España 456, Salta Capital, Salta",
    experiencia: 23,
    calificacion: 4.9,
    totalReviews: 203,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493874567890",
    bio: "Escribano referente en el NOA. Especialista en derecho minero, energético y turismo.",
    precioEscrituras: 282000,
    precioPoderes: 99000,
    precioDeclaratoria: 500000,
    precioCertificaciones: 38000,
    precioTestamentos: 178000,
    precioDonaciones: 248000,
    precioFideicomisos: 475000,
    atencionVirtual: true,
    especialidad: "Minería y Energía",
  },
  {
    name: "Luciana Beatriz Paz",
    email: "lpaz@notariasalta.com.ar",
    matricula: "SAL-7002",
    provincia: "Salta",
    ciudad: "Salta Capital",
    zona: "Centro",
    direccion: "Buenos Aires 789, Salta Capital, Salta",
    experiencia: 19,
    calificacion: 4.8,
    totalReviews: 178,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493874678901",
    bio: "Especialista en turismo rural y fincas. Amplia experiencia en valles calchaquíes.",
    precioEscrituras: 275000,
    precioPoderes: 96000,
    precioDeclaratoria: 492000,
    precioCertificaciones: 37000,
    precioTestamentos: 175000,
    atencionVirtual: true,
    especialidad: "Turismo Rural",
  },
  {
    name: "Roberto Carlos Díaz",
    email: "rdiaz@escribaniasalta.com.ar",
    matricula: "SAL-7003",
    provincia: "Salta",
    ciudad: "Salta Capital",
    zona: "Tres Cerritos",
    direccion: "Av. Paraguay 1234, Tres Cerritos, Salta Capital, Salta",
    experiencia: 17,
    calificacion: 4.7,
    totalReviews: 156,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493874789012",
    bio: "Atención familiar. Especialista en barrios residenciales.",
    precioEscrituras: 268000,
    precioPoderes: 93000,
    precioDeclaratoria: 485000,
    precioCertificaciones: 36000,
    precioTestamentos: 173000,
    atencionVirtual: true,
    especialidad: "Residencial",
  },
];

// =============================================================================
// TUCUMÁN - 3 ESCRIBANOS
// =============================================================================

const ESCRIBANOS_TUCUMAN: EscribanoSeed[] = [
  {
    name: "Luciana Beatriz Paz",
    email: "lpaz@notariatucumancentro.com.ar",
    matricula: "TUC-8001",
    provincia: "Tucumán",
    ciudad: "San Miguel de Tucumán",
    zona: "Centro",
    direccion: "San Martín 678, San Miguel de Tucumán, Tucumán",
    experiencia: 21,
    calificacion: 4.8,
    totalReviews: 198,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493814567890",
    bio: "Especialista en agroindustria azucarera y citrícola del NOA.",
    precioEscrituras: 280000,
    precioPoderes: 98000,
    precioDeclaratoria: 498000,
    precioCertificaciones: 38000,
    precioTestamentos: 177000,
    precioDonaciones: 247000,
    atencionVirtual: true,
    especialidad: "Agroindustria",
  },
  {
    name: "Fernando Luis Torres",
    email: "ftorres@escribaniatucuman.com.ar",
    matricula: "TUC-8002",
    provincia: "Tucumán",
    ciudad: "San Miguel de Tucumán",
    zona: "Yerba Buena",
    direccion: "Av. Aconquija 1234, Yerba Buena, Tucumán",
    experiencia: 18,
    calificacion: 4.7,
    totalReviews: 167,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493814678901",
    bio: "Atención en Yerba Buena. Especialista en countries y barrios cerrados.",
    precioEscrituras: 272000,
    precioPoderes: 95000,
    precioDeclaratoria: 490000,
    precioCertificaciones: 37000,
    precioTestamentos: 174000,
    atencionVirtual: true,
    especialidad: "Countries",
  },
  {
    name: "Carolina Beatriz Molina",
    email: "cmolina@notariatucuman.com.ar",
    matricula: "TUC-8003",
    provincia: "Tucumán",
    ciudad: "San Miguel de Tucumán",
    zona: "Centro",
    direccion: "25 de Mayo 890, San Miguel de Tucumán, Tucumán",
    experiencia: 16,
    calificacion: 4.6,
    totalReviews: 145,
    verificado: true,
    plan: "BASICO",
    whatsapp: "+5493814789012",
    bio: "Precios accesibles. Atención a jóvenes profesionales.",
    precioEscrituras: 265000,
    precioPoderes: 92000,
    precioDeclaratoria: 482000,
    precioCertificaciones: 36000,
    atencionVirtual: true,
    especialidad: "Jóvenes Profesionales",
  },
];

// =============================================================================
// SANTA FE CAPITAL - 3 ESCRIBANOS (Ciudad importante agregada)
// =============================================================================

const ESCRIBANOS_SANTA_FE: EscribanoSeed[] = [
  {
    name: "Marcelo Fabián Acosta",
    email: "macosta@escribaniasantafecentro.com.ar",
    matricula: "SF-9001",
    provincia: "Santa Fe",
    ciudad: "Santa Fe Capital",
    zona: "Centro",
    direccion: "San Martín 2345, Santa Fe Capital, Santa Fe",
    experiencia: 22,
    calificacion: 4.8,
    totalReviews: 187,
    verificado: true,
    plan: "NOTARIO_PRO",
    whatsapp: "+5493424567890",
    bio: "Escribano referente en la capital provincial. Especialista en administración pública.",
    precioEscrituras: 278000,
    precioPoderes: 97000,
    precioDeclaratoria: 495000,
    precioCertificaciones: 38000,
    precioTestamentos: 176000,
    precioDonaciones: 246000,
    atencionVirtual: true,
    especialidad: "Administración Pública",
  },
  {
    name: "Andrea Valeria Gómez",
    email: "agomez@notariasantafe.com.ar",
    matricula: "SF-9002",
    provincia: "Santa Fe",
    ciudad: "Santa Fe Capital",
    zona: "Recoleta",
    direccion: "Bv. Gálvez 890, Recoleta, Santa Fe Capital, Santa Fe",
    experiencia: 18,
    calificacion: 4.7,
    totalReviews: 165,
    verificado: true,
    plan: "NOTARIO",
    whatsapp: "+5493424678901",
    bio: "Atención familiar en zona residencial. Especialista en propiedad horizontal.",
    precioEscrituras: 270000,
    precioPoderes: 94000,
    precioDeclaratoria: 488000,
    precioCertificaciones: 37000,
    precioRegimenPH: 365000,
    atencionVirtual: true,
    especialidad: "Propiedad Horizontal",
  },
  {
    name: "Jorge Luis Peralta",
    email: "jperalta@escribaniasantafe.com.ar",
    matricula: "SF-9003",
    provincia: "Santa Fe",
    ciudad: "Santa Fe Capital",
    zona: "Candioti",
    direccion: "25 de Mayo 1234, Candioti, Santa Fe Capital, Santa Fe",
    experiencia: 16,
    calificacion: 4.6,
    totalReviews: 143,
    verificado: true,
    plan: "BASICO",
    whatsapp: "+5493424789012",
    bio: "Precios competitivos en Santa Fe Capital.",
    precioEscrituras: 262000,
    precioPoderes: 91000,
    precioDeclaratoria: 478000,
    precioCertificaciones: 36000,
    atencionVirtual: true,
    especialidad: "Competitivo",
  },
];

// =============================================================================
// FUNCIÓN PRINCIPAL DE SEED
// =============================================================================

async function main() {
  console.log("🌱 Iniciando SEED MASIVO de base de datos...\n");
  console.log("🎯 60+ ESCRIBANOS EN CIUDADES GRANDES DE ARGENTINA\n");

  // =========================================================================
  // ADMIN
  // =========================================================================
  console.log("👤 Creando usuario administrador...");
  const adminPass = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@escribanosarg.com.ar" },
    update: {},
    create: {
      email: "admin@escribanosarg.com.ar",
      name: "Admin EscribanosARG",
      password: adminPass,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin creado\n");

  // =========================================================================
  // CLIENTES DE PRUEBA
  // =========================================================================
  console.log("👥 Creando clientes de prueba...");
  const clientPass = await bcrypt.hash("cliente123", 12);
  
  const clientes = [
    { name: "Juan Pérez", email: "juan.perez@test.com" },
    { name: "María González", email: "maria.gonzalez@test.com" },
    { name: "Carlos López", email: "carlos.lopez@test.com" },
    { name: "Ana Martínez", email: "ana.martinez@test.com" },
    { name: "Luis Rodríguez", email: "luis.rodriguez@test.com" },
  ];

  for (const cliente of clientes) {
    await prisma.user.upsert({
      where: { email: cliente.email },
      update: {},
      create: {
        email: cliente.email,
        name: cliente.name,
        password: clientPass,
        role: "CLIENTE",
        emailVerified: new Date(),
      },
    });
  }
  console.log(`✅ ${clientes.length} clientes creados\n`);

  // =========================================================================
  // ESCRIBANOS
  // =========================================================================
  const todosLosEscribanos = [
    ...ESCRIBANOS_CABA,
    ...ESCRIBANOS_CORDOBA,
    ...ESCRIBANOS_ROSARIO,
    ...ESCRIBANOS_MENDOZA,
    ...ESCRIBANOS_LA_PLATA,
    ...ESCRIBANOS_MAR_DEL_PLATA,
    ...ESCRIBANOS_SALTA,
    ...ESCRIBANOS_TUCUMAN,
    ...ESCRIBANOS_SANTA_FE,
  ];

  console.log(`📝 Creando ${todosLosEscribanos.length} escribanos...\n`);

  const escribanoPass = await bcrypt.hash("escribano123", 12);

  let count = 0;
  for (const e of todosLosEscribanos) {
    count++;

    // Crear usuario
    const user = await prisma.user.upsert({
      where: { email: e.email },
      update: {},
      create: {
        email: e.email,
        name: e.name,
        password: escribanoPass,
        role: "ESCRIBANO",
        emailVerified: new Date(),
      },
    });

    // Crear perfil de escribano
    await prisma.escribano.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        matricula: e.matricula,
        ubicacion: e.ciudad,
        direccion: e.direccion,
        experiencia: e.experiencia,
        calificacion: e.calificacion,
        totalReviews: e.totalReviews,
        verificado: e.verificado,
        activo: true,
        plan: e.plan,
        whatsappNumber: e.whatsapp,
        bio: e.bio,
        atencionPresencial: true,
        atencionVirtual: e.atencionVirtual ?? true,
        // Precios
        precioEscrituras: e.precioEscrituras,
        precioPoderes: e.precioPoderes,
        precioDeclaratoria: e.precioDeclaratoria,
        precioCertificaciones: e.precioCertificaciones,
        precioTestamentos: e.precioTestamentos,
        precioDonaciones: e.precioDonaciones,
        precioUsufructo: e.precioUsufructo,
        precioLoteos: e.precioLoteos,
        precioRegimenPH: e.precioRegimenPH,
        precioFideicomisos: e.precioFideicomisos,
        precioAutorizaciones: e.precioAutorizaciones,
      },
    });

    console.log(`  ${count}. ✅ ${e.name} - ${e.zona || e.ciudad} (${e.plan}) - ${e.especialidad || "General"}`);
  }

  // =========================================================================
  // RESUMEN FINAL
  // =========================================================================
  console.log("\n" + "=".repeat(80));
  console.log("📊 RESUMEN DEL SEED MASIVO");
  console.log("=".repeat(80));
  console.log(`✅ Total escribanos creados: ${todosLosEscribanos.length}`);
  console.log("\n🏙️ Distribución por ciudad:");
  console.log(`   • CABA: ${ESCRIBANOS_CABA.length} escribanos (mayor concentración)`);
  console.log(`   • Córdoba Capital: ${ESCRIBANOS_CORDOBA.length} escribanos`);
  console.log(`   • Rosario: ${ESCRIBANOS_ROSARIO.length} escribanos`);
  console.log(`   • Mendoza Capital: ${ESCRIBANOS_MENDOZA.length} escribanos`);
  console.log(`   • La Plata: ${ESCRIBANOS_LA_PLATA.length} escribanos`);
  console.log(`   • Mar del Plata: ${ESCRIBANOS_MAR_DEL_PLATA.length} escribanos`);
  console.log(`   • Salta Capital: ${ESCRIBANOS_SALTA.length} escribanos`);
  console.log(`   • Tucumán Capital: ${ESCRIBANOS_TUCUMAN.length} escribanos`);
  console.log(`   • Santa Fe Capital: ${ESCRIBANOS_SANTA_FE.length} escribanos`);
  
  const proCount = todosLosEscribanos.filter(e => e.plan === "NOTARIO_PRO").length;
  const notarioCount = todosLosEscribanos.filter(e => e.plan === "NOTARIO").length;
  const basicoCount = todosLosEscribanos.filter(e => e.plan === "BASICO").length;
  
  console.log("\n💳 Distribución por plan:");
  console.log(`   • NOTARIO_PRO: ${proCount} (${Math.round(proCount/todosLosEscribanos.length*100)}%)`);
  console.log(`   • NOTARIO: ${notarioCount} (${Math.round(notarioCount/todosLosEscribanos.length*100)}%)`);
  console.log(`   • BASICO: ${basicoCount} (${Math.round(basicoCount/todosLosEscribanos.length*100)}%)`);
  
  console.log("\n💰 Rangos de precios (Escrituras):");
  console.log("   • CABA: $275.000 - $390.000");
  console.log("   • Córdoba: $265.000 - $300.000");
  console.log("   • Rosario: $262.000 - $295.000");
  console.log("   • Mendoza: $265.000 - $290.000");
  console.log("   • Otras ciudades: $262.000 - $288.000");
  
  console.log("\n🎯 ESPECIALIDADES CUBIERTAS:");
  const especialidades = todosLosEscribanos
    .map(e => e.especialidad)
    .filter((v, i, a) => a.indexOf(v) === i)
    .filter(Boolean);
  especialidades.forEach(esp => {
    const count = todosLosEscribanos.filter(e => e.especialidad === esp).length;
    console.log(`   • ${esp}: ${count}`);
  });
  
  console.log("\n📍 COBERTURA GEOGRÁFICA:");
  console.log("   • Total de zonas/barrios: 40+");
  console.log("   • Población cubierta: +15.000.000 habitantes");
  console.log("   • Diversidad de especialidades: " + especialidades.length);
  
  console.log("\n🔐 CREDENCIALES:");
  console.log("   • Admin: admin@escribanosarg.com.ar / admin123");
  console.log("   • Clientes: {email} / cliente123");
  console.log("   • Escribanos: {email del seed} / escribano123");
  
  console.log("\n📊 DATOS ESTADÍSTICOS:");
  console.log(`   • Experiencia promedio: ${Math.round(todosLosEscribanos.reduce((acc, e) => acc + e.experiencia, 0) / todosLosEscribanos.length)} años`);
  console.log(`   • Calificación promedio: ${(todosLosEscribanos.reduce((acc, e) => acc + e.calificacion, 0) / todosLosEscribanos.length).toFixed(2)}`);
  console.log(`   • Reviews totales: ${todosLosEscribanos.reduce((acc, e) => acc + e.totalReviews, 0).toLocaleString()}`);
  console.log(`   • Atención virtual: ${todosLosEscribanos.filter(e => e.atencionVirtual).length} (${Math.round(todosLosEscribanos.filter(e => e.atencionVirtual).length/todosLosEscribanos.length*100)}%)`);
  
  console.log("\n✅ Seed masivo completado exitosamente!");
  console.log("=".repeat(80) + "\n");
}

// =============================================================================
// EJECUCIÓN
// =============================================================================

main()
  .catch((e) => {
    console.error("\n❌ Error en seed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });