"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScrollText,
  Users,
  Stamp,
  FileText,
  Gift,
  Building2,
  FileCheck,
  Home,
  Scale,
  Landmark,
  ShieldCheck,
  FileSignature,
  ChevronRight,
  ChevronDown,
  Clock,
  CheckCircle2,
  FileWarning,
  ArrowRight,
  Search,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// =============================================================================
// ANIMACIONES
// =============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// =============================================================================
// TIPOS Y ESTRUCTURAS
// =============================================================================

interface ActoJuridico {
  id: string;
  nombre: string;
  descripcion: string;
}

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  precio: string;
  tiempo: string;
  documentos: string[];
  incluye: string[];
  popular?: boolean;
  actosJuridicos?: ActoJuridico[];
}

// =============================================================================
// DATOS DE ACTOS JURÍDICOS
// =============================================================================

const ACTOS_ESCRITURAS: ActoJuridico[] = [
  {
    id: "BOLETOS",
    nombre: "Boletos",
    descripcion: "Compromiso de compraventa de inmuebles",
  },
  {
    id: "COMPRAVENTA",
    nombre: "Compraventa",
    descripcion: "Transferencia de dominio de inmuebles",
  },
  {
    id: "DONACIONES_MUEBLES",
    nombre: "Donaciones - Bienes Muebles",
    descripcion: "Donación de bienes muebles",
  },
  {
    id: "DONACIONES_INMUEBLES",
    nombre: "Donaciones - Bienes Inmuebles",
    descripcion: "Donación de inmuebles",
  },
  {
    id: "CONJUNTO_INMOBILIARIO",
    nombre: "Conjunto Inmobiliario",
    descripcion: "Constitución de conjuntos inmobiliarios",
  },
  {
    id: "PROPIEDAD_HORIZONTAL",
    nombre: "Propiedad Horizontal",
    descripcion: "Régimen de propiedad horizontal",
  },
  {
    id: "HIPOTECA",
    nombre: "Hipoteca",
    descripcion: "Constitución de garantía hipotecaria",
  },
  {
    id: "SERVIDUMBRE",
    nombre: "Servidumbre",
    descripcion: "Constitución de servidumbres",
  },
  {
    id: "USUFRUCTO",
    nombre: "Usufructo",
    descripcion: "Constitución de usufructo y nuda propiedad",
  },
  {
    id: "TESTAMENTOS",
    nombre: "Testamentos",
    descripcion: "Testamentos públicos y cerrados",
  },
  {
    id: "FIDEICOMISO",
    nombre: "Fideicomiso",
    descripcion: "Constitución de fideicomisos",
  },
  {
    id: "OTROS_DERECHOS",
    nombre: "Otros",
    descripcion: "Otros derechos reales",
  },
];

const ACTOS_CERTIFICACIONES: ActoJuridico[] = [
  {
    id: "PERSONA_FISICA",
    nombre: "Persona Física",
    descripcion: "Certificación de firmas de personas físicas",
  },
  {
    id: "PERSONA_JURIDICA",
    nombre: "Persona Jurídica",
    descripcion: "Certificación de firmas de personas jurídicas",
  },
  {
    id: "FOTOCOPIAS",
    nombre: "Certificación de Fotocopias",
    descripcion: "Certificación de copias de documentos",
  },
  {
    id: "COPIAS_FIELES",
    nombre: "Copias Fieles",
    descripcion: "Copias fieles de documentos originales",
  },
];

const ACTOS_ACTAS: ActoJuridico[] = [
  {
    id: "CONSTATACION",
    nombre: "Acta de Constatación",
    descripcion: "Constatación de hechos",
  },
  {
    id: "NOTIFICACION",
    nombre: "Acta de Notificación",
    descripcion: "Notificación de actos",
  },
  {
    id: "INTIMACION",
    nombre: "Acta de Intimación",
    descripcion: "Intimación notarial",
  },
];

const ACTOS_PODERES: ActoJuridico[] = [
  {
    id: "GENERAL",
    nombre: "Poder General",
    descripcion: "Poder para múltiples actos",
  },
  {
    id: "ESPECIAL",
    nombre: "Poder Especial",
    descripcion: "Poder para un acto específico",
  },
];

const ACTOS_AUTORIZACIONES: ActoJuridico[] = [
  {
    id: "TIEMPO_LIMITADO",
    nombre: "Tiempo Limitado",
    descripcion: "Autorización con fecha de vencimiento",
  },
  {
    id: "TIEMPO_ILIMITADO",
    nombre: "Tiempo Ilimitado",
    descripcion: "Autorización sin fecha de vencimiento",
  },
];

const ACTOS_CESIONES: ActoJuridico[] = [
  {
    id: "BOLETOS",
    nombre: "Cesión de Boletos",
    descripcion: "Cesión de boletos de compraventa",
  },
  {
    id: "DERECHOS_HEREDITARIOS",
    nombre: "Derechos Hereditarios",
    descripcion: "Cesión de derechos hereditarios",
  },
  {
    id: "DERECHOS_LITIGIOSOS",
    nombre: "Derechos Litigiosos",
    descripcion: "Cesión de derechos en litigio",
  },
  {
    id: "POSESION",
    nombre: "Posesión",
    descripcion: "Cesión de derechos posesorios",
  },
  {
    id: "FONDO_COMERCIO",
    nombre: "Transferencia de Fondo de Comercio",
    descripcion: "Transferencia de fondos de comercio",
  },
];

const ACTOS_OTROS: ActoJuridico[] = [
  {
    id: "CONTRATOS_LOCACION",
    nombre: "Contratos de Locación",
    descripcion: "Redacción de contratos de alquiler",
  },
  {
    id: "CONTRATOS_COMODATO",
    nombre: "Contratos de Comodato",
    descripcion: "Préstamo gratuito de bienes",
  },
  {
    id: "CONTRATOS_MUTUO",
    nombre: "Contratos de Mutuo",
    descripcion: "Préstamo de dinero",
  },
  {
    id: "ESTUDIO_TITULOS",
    nombre: "Estudio de Títulos",
    descripcion: "Análisis de antecedentes dominiales",
  },
  {
    id: "SEGURIDAD_JURIDICA",
    nombre: "Seguridad Jurídica Previa",
    descripcion: "Asesoramiento jurídico notarial",
  },
  {
    id: "OTROS_CONTRATOS",
    nombre: "Otros Contratos",
    descripcion: "Redacción de otros contratos",
  },
];

// =============================================================================
// DATOS DE SERVICIOS
// =============================================================================

const SERVICIOS: Servicio[] = [
  {
    id: "ESCRITURAS",
    nombre: "Escrituras Públicas",
    descripcion: "Actos jurídicos con validez legal: compraventas, donaciones, hipotecas y más",
    descripcionLarga:
      "Las escrituras públicas son instrumentos notariales que dan fe y autenticidad a los actos jurídicos. El escribano garantiza la legalidad del acto, verifica la identidad de las partes, y asegura que se cumplan todos los requisitos legales para su validez.",
    icon: ScrollText,
    color: "text-slate-600",
    bgColor: "from-slate-500 to-slate-600",
    precio: "Desde $150.000",
    tiempo: "7-15 días hábiles",
    documentos: [
      "DNI de las partes",
      "Título de propiedad",
      "Informe de dominio",
      "Libre deuda municipal y provincial",
      "Certificado catastral",
      "Cedulón de rentas de la Provincia de Córdoba",
    ],
    incluye: [
      "Estudio de títulos",
      "Redacción de escritura",
      "Inscripción en el Registro",
      "Certificaciones",
      "Copias autenticadas",
      "Testimonios",
    ],
    popular: true,
    actosJuridicos: ACTOS_ESCRITURAS,
  },
  {
    id: "CERTIFICACIONES",
    nombre: "Certificaciones de Firmas",
    descripcion: "Certificación de firmas para personas físicas y jurídicas, fotocopias y copias fieles",
    descripcionLarga:
      "Las certificaciones notariales garantizan la autenticidad de firmas y documentos. El escribano verifica la identidad del firmante y certifica que la firma fue puesta en su presencia, otorgando validez legal al documento.",
    icon: FileCheck,
    color: "text-indigo-500",
    bgColor: "from-indigo-400 to-indigo-500",
    precio: "Desde $8.000",
    tiempo: "En el día",
    documentos: ["DNI", "Documento a certificar"],
    incluye: [
      "Verificación de identidad",
      "Certificación notarial",
      "Copias certificadas",
    ],
    popular: true,
    actosJuridicos: ACTOS_CERTIFICACIONES,
  },
  {
    id: "ACTAS",
    nombre: "Actas Notariales",
    descripcion: "Constatación de hechos, notificaciones e intimaciones",
    descripcionLarga:
      "Las actas notariales son instrumentos públicos mediante los cuales el escribano documenta hechos que presencia o constata. Tienen plena validez probatoria y son utilizadas para preservar situaciones de hecho, notificar o intimar actos.",
    icon: Landmark,
    color: "text-slate-600",
    bgColor: "from-slate-500 to-slate-600",
    precio: "Desde $30.000",
    tiempo: "1-3 días hábiles",
    documentos: ["DNI del requirente", "Datos del hecho a constatar"],
    incluye: [
      "Constatación del hecho",
      "Redacción del acta",
      "Protocolo notarial",
      "Copias certificadas",
    ],
    popular: true,
    actosJuridicos: ACTOS_ACTAS,
  },
  {
    id: "PODERES",
    nombre: "Poderes",
    descripcion: "Poderes generales y especiales para representación legal",
    descripcionLarga:
      "Los poderes son documentos notariales que autorizan a una persona a actuar en nombre de otra. Pueden ser generales (para múltiples actos) o especiales (para un acto específico determinado).",
    icon: Stamp,
    color: "text-amber-600",
    bgColor: "from-amber-500 to-amber-600",
    precio: "Desde $25.000",
    tiempo: "1-3 días hábiles",
    documentos: [
      "DNI del poderdante",
      "DNI del apoderado",
      "Datos del acto a realizar",
    ],
    incluye: [
      "Redacción del poder",
      "Firma ante escribano",
      "Copias certificadas",
      "Legalización si corresponde",
    ],
    popular: true,
    actosJuridicos: ACTOS_PODERES,
  },
  {
    id: "AUTORIZACIONES",
    nombre: "Autorizaciones (Menores)",
    descripcion: "Autorizaciones de viaje para menores de edad",
    descripcionLarga:
      "Autorizaciones notariales para que menores de edad puedan viajar al exterior o dentro del país con el consentimiento de sus padres o tutores. Pueden ser por tiempo limitado o ilimitado según las necesidades.",
    icon: ShieldCheck,
    color: "text-teal-500",
    bgColor: "from-teal-400 to-teal-500",
    precio: "Desde $15.000",
    tiempo: "En el día",
    documentos: [
      "DNI de padres/tutores",
      "DNI o partida del menor",
      "Datos del viaje",
    ],
    incluye: [
      "Redacción de autorización",
      "Firma ante escribano",
      "Copias certificadas",
      "Apostilla si corresponde",
    ],
    actosJuridicos: ACTOS_AUTORIZACIONES,
  },
  {
    id: "CESIONES",
    nombre: "Cesiones",
    descripcion: "Cesión de boletos, derechos hereditarios, litigiosos y fondos de comercio",
    descripcionLarga:
      "Las cesiones son actos jurídicos mediante los cuales se transfieren derechos de una persona a otra. Incluyen cesión de boletos de compraventa, derechos hereditarios, derechos litigiosos, posesión y transferencias de fondos de comercio.",
    icon: FileSignature,
    color: "text-violet-500",
    bgColor: "from-violet-400 to-violet-500",
    precio: "Desde $80.000",
    tiempo: "7-15 días hábiles",
    documentos: [
      "DNI de cedente y cesionario",
      "Documentación del derecho a ceder",
      "Títulos o contratos originales",
    ],
    incluye: [
      "Estudio de antecedentes",
      "Redacción del instrumento",
      "Inscripciones registrales",
      "Copias autenticadas",
    ],
    actosJuridicos: ACTOS_CESIONES,
  },
  {
    id: "OTROS",
    nombre: "Otros Servicios",
    descripcion: "Contratos, estudio de títulos y asesoramiento jurídico notarial",
    descripcionLarga:
      "Servicios complementarios que incluyen redacción de contratos de locación, comodato, mutuo y otros; estudio de títulos para verificar la situación dominial; y asesoramiento jurídico notarial previo para garantizar la seguridad jurídica de los actos.",
    icon: FileText,
    color: "text-emerald-600",
    bgColor: "from-emerald-500 to-emerald-600",
    precio: "Desde $20.000",
    tiempo: "3-10 días hábiles",
    documentos: [
      "DNI de las partes",
      "Documentación según el trámite",
      "Títulos si corresponde",
    ],
    incluye: [
      "Asesoramiento profesional",
      "Redacción de documentos",
      "Verificaciones necesarias",
      "Copias certificadas",
    ],
    actosJuridicos: ACTOS_OTROS,
  },
  {
    id: "DECLARATORIA",
    nombre: "Sucesiones",
    descripcion: "Declaratoria de herederos y trámites sucesorios",
    descripcionLarga:
      "El trámite sucesorio permite la transmisión legal de bienes de una persona fallecida a sus herederos. Incluye la declaratoria de herederos, inventario de bienes y adjudicación de la herencia.",
    icon: Users,
    color: "text-stone-600",
    bgColor: "from-stone-500 to-stone-600",
    precio: "Desde $200.000",
    tiempo: "3-6 meses",
    documentos: [
      "Partida de defunción",
      "Partidas de nacimiento de herederos",
      "Libreta de matrimonio",
      "Títulos de propiedad",
      "Documentación de vehículos",
    ],
    incluye: [
      "Inicio de sucesorio",
      "Declaratoria de herederos",
      "Inventario y avalúo",
      "Inscripciones registrales",
      "Adjudicación de bienes",
    ],
    popular: true,
  },
  {
    id: "SOCIEDADES",
    nombre: "Sociedades",
    descripcion: "Constitución de sociedades, actas y modificaciones",
    descripcionLarga:
      "Asesoramiento y constitución de sociedades comerciales (SRL, SA, SAS), redacción de estatutos, actas de asamblea, modificaciones de contrato social y disoluciones.",
    icon: Building2,
    color: "text-sky-600",
    bgColor: "from-sky-500 to-sky-600",
    precio: "Desde $80.000",
    tiempo: "15-30 días hábiles",
    documentos: [
      "DNI de socios",
      "Datos de la sociedad",
      "Capital social",
      "Objeto social",
    ],
    incluye: [
      "Redacción de estatuto",
      "Constitución societaria",
      "Inscripción en IGJ/DPPJ",
      "Libros societarios",
      "CUIT de la sociedad",
    ],
  },
  {
    id: "PROTOCOLIZACIONES",
    nombre: "Protocolizaciones, Legalizaciones y Apostillas",
    descripcion: "Protocolización de documentos, legalizaciones y apostillas",
    descripcionLarga:
      "La protocolización incorpora un documento al protocolo notarial, dándole fecha cierta y autenticidad. Las legalizaciones certifican la autenticidad de firmas de funcionarios públicos. La apostilla permite que documentos públicos sean reconocidos en países firmantes del Convenio de La Haya.",
    icon: FileSignature,
    color: "text-rose-500",
    bgColor: "from-rose-400 to-rose-500",
    precio: "Desde $20.000",
    tiempo: "1-5 días hábiles",
    documentos: ["Documento a protocolizar/legalizar", "DNI del solicitante"],
    incluye: [
      "Incorporación al protocolo",
      "Escritura de protocolización",
      "Copias autenticadas",
      "Apostilla si corresponde",
    ],
  },
];

// =============================================================================
// FAQ DATA
// =============================================================================

interface FAQ {
  pregunta: string;
  respuesta: string;
}

const FAQS: FAQ[] = [
  {
    pregunta: "¿Cuánto cuesta una escritura?",
    respuesta:
      "El costo de una escritura varía según el valor del inmueble y la complejidad del trámite. Incluye honorarios del escribano (regulados por ley), impuestos (sellos, ITI, ganancias si aplica), tasas registrales y certificados. Te recomendamos solicitar un presupuesto detallado al escribano.",
  },
  {
    pregunta: "¿Cuánto tiempo demora un trámite sucesorio?",
    respuesta:
      "Un trámite sucesorio puede demorar entre 3 y 6 meses dependiendo de la complejidad. Si hay testamento, acuerdo entre herederos y documentación completa, puede ser más rápido. Sucesiones con conflictos o bienes en distintas jurisdicciones pueden extenderse más.",
  },
  {
    pregunta: "¿Puedo hacer un poder a distancia?",
    respuesta:
      "Sí, se pueden realizar poderes mediante videollamada certificada en algunas jurisdicciones. El escribano verifica la identidad mediante sistemas seguros y la firma se realiza digitalmente. Consultá con el escribano si ofrece esta modalidad.",
  },
  {
    pregunta: "¿Qué diferencia hay entre donación y testamento?",
    respuesta:
      "La donación transfiere bienes en vida del donante, tiene efectos inmediatos y puede tener implicancias fiscales. El testamento es una disposición para después del fallecimiento, puede modificarse libremente en vida y los bienes siguen siendo del testador hasta su muerte.",
  },
  {
    pregunta: "¿Necesito escribano para vender un auto?",
    respuesta:
      "Para vehículos, la transferencia se realiza ante el Registro del Automotor y no requiere intervención de escribano. Sin embargo, si el vendedor no puede concurrir personalmente, puede otorgar un poder especial ante escribano para que otra persona realice el trámite.",
  },
  {
    pregunta: "¿Qué es la apostilla de La Haya?",
    respuesta:
      "La apostilla es una certificación que permite que documentos públicos de un país sean reconocidos en otros países firmantes del Convenio de La Haya. Para documentos notariales, se tramita en el Colegio de Escribanos correspondiente.",
  },
];

// =============================================================================
// COMPONENTES
// =============================================================================

function ServicioCard({ servicio }: { servicio: Servicio }) {
  return (
    <motion.div variants={scaleIn}>
      <Link href={`/buscar?servicio=${servicio.id}`}>
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          className={cn(
            "group relative bg-white rounded-2xl border border-slate-200",
            "shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300",
            "overflow-hidden h-full"
          )}
        >
          {/* Popular badge */}
          {servicio.popular && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                <Sparkles className="w-3 h-3" />
                Popular
              </span>
            </div>
          )}

          <div className="p-6">
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center",
                "bg-gradient-to-br shadow-md",
                servicio.bgColor,
                "group-hover:shadow-lg transition-shadow duration-300"
              )}
            >
              <servicio.icon className="w-7 h-7 text-white" />
            </motion.div>

            {/* Content */}
            <h3 className="mt-4 text-lg font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">
              {servicio.nombre}
            </h3>
            <p className="mt-2 text-sm text-slate-600 line-clamp-2">
              {servicio.descripcion}
            </p>

            {/* Meta */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {servicio.tiempo}
                </span>
              </div>
              <span className="text-sm font-semibold text-slate-800">
                {servicio.precio}
              </span>
            </div>

            {/* Hover CTA */}
            <div className="mt-4 flex items-center text-sm font-medium text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
              Ver escribanos
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

function ServicioDetalle({ servicio }: { servicio: Servicio }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedActo, setSelectedActo] = useState<string>("");

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Header - Clickeable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-start gap-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
            "bg-gradient-to-br",
            servicio.bgColor
          )}
        >
          <servicio.icon className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-800">
              {servicio.nombre}
            </h3>
            {servicio.popular && (
              <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                Popular
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-600">{servicio.descripcion}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {servicio.tiempo}
            </span>
            <span className="font-medium text-slate-800">{servicio.precio}</span>
          </div>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          className="flex-shrink-0 p-2"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-slate-100">
              {/* Descripción larga */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {servicio.descripcionLarga}
              </p>

              {/* Dropdown de Actos Jurídicos (si aplica) */}
              {servicio.actosJuridicos && servicio.actosJuridicos.length > 0 && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Acto jurídico a realizar
                  </label>
                  <select
                    value={selectedActo}
                    onChange={(e) => setSelectedActo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="">Seleccione el tipo de acto</option>
                    {servicio.actosJuridicos.map((acto) => (
                      <option key={acto.id} value={acto.id}>
                        {acto.nombre} - {acto.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                {/* Documentos necesarios */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
                    <FileWarning className="w-4 h-4 text-amber-500" />
                    Documentación necesaria
                  </h4>
                  <ul className="space-y-2">
                    {servicio.documentos.map((doc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Qué incluye */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    El servicio incluye
                  </h4>
                  <ul className="space-y-2">
                    {servicio.incluye.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/buscar?servicio=${servicio.id}${
                    selectedActo ? `&acto=${selectedActo}` : ""
                  }`}
                  className="flex-1"
                >
                  <Button variant="accent" className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Buscar escribanos
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  Solicitar presupuesto
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="border-b border-slate-200 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-start gap-4 text-left"
      >
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">
          {index + 1}
        </span>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 pr-8">{faq.pregunta}</h3>
          <AnimatePresence>
            {open && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 text-sm text-slate-600 leading-relaxed"
              >
                {faq.respuesta}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="flex-shrink-0">
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
    </motion.div>
  );
}

// =============================================================================
// SECCIONES
// =============================================================================

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 text-white overflow-hidden">
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-200/15 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-sky-200/10 rounded-full blur-[128px]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/10 border border-white/20"
          >
            <Scale className="w-4 h-4" />
            Servicios Notariales
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold font-serif"
          >
            Todos los trámites que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-300">
              necesitás
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg text-slate-200 max-w-2xl mx-auto"
          >
            Desde escrituras y sucesiones hasta poderes y certificaciones. 
            Encontrá el escribano ideal para cada trámite notarial.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/buscar">
              <Button variant="accent" size="lg">
                <Search className="w-5 h-5 mr-2" />
                Buscar escribano
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 border border-white/20"
              onClick={() => {
                document.getElementById("servicios-lista")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Ver todos los servicios
              <ChevronDown className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ServiciosPopularesSection() {
  const serviciosPopulares = SERVICIOS.filter((s) => s.popular);

  return (
    <section className="py-16 sm:py-24 bg-[#faf9f7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
              Más solicitados
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold font-serif text-slate-800">
              Servicios populares
            </h2>
            <p className="mt-3 text-slate-600">
              Los trámites notariales más comunes que realizan nuestros escribanos
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {serviciosPopulares.map((servicio) => (
              <ServicioCard key={servicio.id} servicio={servicio} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TodosLosServiciosSection() {
  return (
    <section id="servicios-lista" className="py-16 sm:py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-800">
              Todos los servicios
            </h2>
            <p className="mt-3 text-slate-600">
              Explorá en detalle cada servicio notarial disponible
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 space-y-4 max-w-4xl mx-auto"
          >
            {SERVICIOS.map((servicio) => (
              <ServicioDetalle key={servicio.id} servicio={servicio} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              <HelpCircle className="w-3.5 h-3.5" />
              Preguntas frecuentes
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold font-serif text-slate-800">
              Dudas comunes sobre servicios notariales
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-200 overflow-hidden"
          >
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 text-center">
            <p className="text-slate-600 mb-4">
              ¿Tenés otra consulta? Contactá directamente a un escribano.
            </p>
            <Link href="/buscar">
              <Button variant="accent">
                Buscar escribano
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-800 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-300/10 rounded-full blur-[128px]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white"
          >
            ¿Listo para comenzar tu trámite?
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-slate-300">
            Encontrá el escribano ideal en minutos. Compará precios, leé opiniones 
            y agendá tu consulta presencial o virtual.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/buscar">
              <Button variant="accent" size="lg">
                <Search className="w-5 h-5 mr-2" />
                Buscar escribano
              </Button>
            </Link>
            <Link href="/para-escribanos">
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 border border-white/20"
              >
                Soy escribano
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// PÁGINA PRINCIPAL
// =============================================================================

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HeroSection />
        <ServiciosPopularesSection />
        <TodosLosServiciosSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}