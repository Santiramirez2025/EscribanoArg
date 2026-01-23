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
// DATOS DE SERVICIOS
// =============================================================================

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
}

const SERVICIOS: Servicio[] = [
  {
    id: "ESCRITURAS",
    nombre: "Escrituras",
    descripcion: "Compraventa, hipotecas y transferencias de inmuebles",
    descripcionLarga:
      "Las escrituras públicas son documentos notariales que dan fe de actos jurídicos como compraventas, hipotecas, permutas y cesiones de derechos sobre inmuebles. El escribano garantiza la legalidad y autenticidad del acto.",
    icon: ScrollText,
    color: "text-blue-600",
    bgColor: "from-blue-500 to-blue-600",
    precio: "Desde $150.000",
    tiempo: "7-15 días hábiles",
    documentos: [
      "DNI de las partes",
      "Título de propiedad",
      "Informe de dominio",
      "Libre deuda municipal y provincial",
      "Certificado catastral",
    ],
    incluye: [
      "Estudio de títulos",
      "Redacción de escritura",
      "Inscripción en el Registro",
      "Certificaciones",
      "Copias autenticadas",
    ],
    popular: true,
  },
  {
    id: "DECLARATORIA",
    nombre: "Sucesiones",
    descripcion: "Declaratoria de herederos y trámites sucesorios",
    descripcionLarga:
      "El trámite sucesorio permite la transmisión legal de bienes de una persona fallecida a sus herederos. Incluye la declaratoria de herederos, inventario de bienes y adjudicación de la herencia.",
    icon: Users,
    color: "text-purple-600",
    bgColor: "from-purple-500 to-purple-600",
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
    id: "PODERES",
    nombre: "Poderes",
    descripcion: "Poderes generales, especiales y para juicios",
    descripcionLarga:
      "Los poderes son documentos que autorizan a una persona a actuar en nombre de otra. Pueden ser generales (para múltiples actos) o especiales (para un acto específico), incluyendo poderes para litigar.",
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
  },
  {
    id: "TESTAMENTOS",
    nombre: "Testamentos",
    descripcion: "Testamentos públicos, cerrados y ológrafos",
    descripcionLarga:
      "El testamento es el acto jurídico por el cual una persona dispone de sus bienes para después de su muerte. El escribano asegura que se cumplan todos los requisitos legales para su validez.",
    icon: FileText,
    color: "text-emerald-600",
    bgColor: "from-emerald-500 to-emerald-600",
    precio: "Desde $45.000",
    tiempo: "1-5 días hábiles",
    documentos: [
      "DNI del testador",
      "Datos de herederos",
      "Detalle de bienes",
      "Testigos (si corresponde)",
    ],
    incluye: [
      "Asesoramiento legal",
      "Redacción del testamento",
      "Firma ante escribano",
      "Protocolización",
      "Inscripción en Registro",
    ],
  },
  {
    id: "DONACIONES",
    nombre: "Donaciones",
    descripcion: "Donaciones de inmuebles y bienes entre vivos",
    descripcionLarga:
      "La donación es un contrato por el cual una persona transfiere gratuitamente bienes a otra. Cuando involucra inmuebles, requiere escritura pública e inscripción registral.",
    icon: Gift,
    color: "text-pink-600",
    bgColor: "from-pink-500 to-pink-600",
    precio: "Desde $120.000",
    tiempo: "7-15 días hábiles",
    documentos: [
      "DNI de donante y donatario",
      "Título de propiedad",
      "Libre deuda",
      "Valuación fiscal",
    ],
    incluye: [
      "Estudio de títulos",
      "Redacción de escritura",
      "Cálculo de impuestos",
      "Inscripción registral",
    ],
  },
  {
    id: "SOCIEDADES",
    nombre: "Sociedades",
    descripcion: "Constitución de sociedades, actas y modificaciones",
    descripcionLarga:
      "Asesoramiento y constitución de sociedades comerciales (SRL, SA, SAS), redacción de estatutos, actas de asamblea, modificaciones de contrato social y disoluciones.",
    icon: Building2,
    color: "text-cyan-600",
    bgColor: "from-cyan-500 to-cyan-600",
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
    id: "CERTIFICACIONES",
    nombre: "Certificaciones",
    descripcion: "Certificación de firmas, copias y documentos",
    descripcionLarga:
      "Servicios de certificación notarial que incluyen certificación de firmas, copias de documentos, constatación de hechos y actas de notoriedad para diversos trámites.",
    icon: FileCheck,
    color: "text-indigo-600",
    bgColor: "from-indigo-500 to-indigo-600",
    precio: "Desde $8.000",
    tiempo: "En el día",
    documentos: ["DNI", "Documento a certificar"],
    incluye: [
      "Verificación de identidad",
      "Certificación notarial",
      "Copias certificadas",
    ],
  },
  {
    id: "USUFRUCTO",
    nombre: "Usufructo",
    descripcion: "Constitución de usufructo y nuda propiedad",
    descripcionLarga:
      "El usufructo permite separar el uso y goce de un bien de su propiedad. Es común en planificación sucesoria para que los padres conserven el uso del inmueble mientras transfieren la propiedad.",
    icon: Home,
    color: "text-orange-600",
    bgColor: "from-orange-500 to-orange-600",
    precio: "Desde $100.000",
    tiempo: "7-15 días hábiles",
    documentos: [
      "DNI de las partes",
      "Título de propiedad",
      "Libre deuda",
      "Valuación",
    ],
    incluye: [
      "Asesoramiento",
      "Redacción de escritura",
      "Inscripción registral",
      "Copias autenticadas",
    ],
  },
  {
    id: "FIDEICOMISOS",
    nombre: "Fideicomisos",
    descripcion: "Constitución y administración de fideicomisos",
    descripcionLarga:
      "El fideicomiso es un contrato donde una persona transmite bienes a otra para que los administre en beneficio de un tercero. Usado en desarrollos inmobiliarios, garantías y planificación patrimonial.",
    icon: Scale,
    color: "text-violet-600",
    bgColor: "from-violet-500 to-violet-600",
    precio: "Desde $250.000",
    tiempo: "15-30 días hábiles",
    documentos: [
      "DNI de las partes",
      "Bienes a fideicomitir",
      "Objeto del fideicomiso",
      "Beneficiarios",
    ],
    incluye: [
      "Redacción del contrato",
      "Constitución del fideicomiso",
      "Inscripciones",
      "CUIT del fideicomiso",
    ],
  },
  {
    id: "PROTOCOLIZACIONES",
    nombre: "Protocolizaciones",
    descripcion: "Protocolización de documentos y actas",
    descripcionLarga:
      "La protocolización incorpora un documento al protocolo notarial, dándole fecha cierta y autenticidad. Se usa para documentos privados, actas judiciales y documentos extranjeros.",
    icon: FileSignature,
    color: "text-rose-600",
    bgColor: "from-rose-500 to-rose-600",
    precio: "Desde $20.000",
    tiempo: "1-5 días hábiles",
    documentos: ["Documento a protocolizar", "DNI del solicitante"],
    incluye: [
      "Incorporación al protocolo",
      "Escritura de protocolización",
      "Copias autenticadas",
    ],
  },
  {
    id: "AUTORIZACIONES",
    nombre: "Autorizaciones",
    descripcion: "Autorizaciones de viaje y actos para menores",
    descripcionLarga:
      "Autorizaciones notariales para que menores de edad puedan viajar al exterior, realizar actos jurídicos o trámites específicos con el consentimiento de sus padres o tutores.",
    icon: ShieldCheck,
    color: "text-teal-600",
    bgColor: "from-teal-500 to-teal-600",
    precio: "Desde $15.000",
    tiempo: "En el día",
    documentos: [
      "DNI de padres/tutores",
      "DNI o partida del menor",
      "Datos del viaje/acto",
    ],
    incluye: [
      "Redacción de autorización",
      "Firma ante escribano",
      "Copias certificadas",
      "Apostilla si corresponde",
    ],
  },
  {
    id: "ACTAS",
    nombre: "Actas Notariales",
    descripcion: "Constatación de hechos, notificaciones y requerimientos",
    descripcionLarga:
      "Las actas notariales documentan hechos que el escribano presencia o constata. Incluyen constataciones, notificaciones, protestos, sorteos y cualquier hecho que requiera fe pública.",
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
            "group relative bg-white rounded-2xl border border-gray-200",
            "shadow-sm hover:shadow-xl transition-all duration-300",
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
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center",
                "bg-gradient-to-br shadow-lg",
                servicio.bgColor,
                "group-hover:shadow-xl transition-shadow duration-300"
              )}
            >
              <servicio.icon className="w-7 h-7 text-white" />
            </motion.div>

            {/* Content */}
            <h3 className="mt-4 text-lg font-semibold text-primary-900 group-hover:text-amber-600 transition-colors">
              {servicio.nombre}
            </h3>
            <p className="mt-2 text-sm text-primary-600 line-clamp-2">
              {servicio.descripcion}
            </p>

            {/* Meta */}
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-primary-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {servicio.tiempo}
                </span>
              </div>
              <span className="text-sm font-semibold text-primary-900">
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

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
    >
      {/* Header - Clickeable */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors"
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
            <h3 className="text-lg font-semibold text-primary-900">
              {servicio.nombre}
            </h3>
            {servicio.popular && (
              <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                Popular
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-primary-600">{servicio.descripcion}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-primary-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {servicio.tiempo}
            </span>
            <span className="font-medium text-primary-900">{servicio.precio}</span>
          </div>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          className="flex-shrink-0 p-2"
        >
          <ChevronDown className="w-5 h-5 text-primary-400" />
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
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
              {/* Descripción larga */}
              <p className="text-sm text-primary-600 leading-relaxed">
                {servicio.descripcionLarga}
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                {/* Documentos necesarios */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-900 flex items-center gap-2 mb-3">
                    <FileWarning className="w-4 h-4 text-amber-500" />
                    Documentación necesaria
                  </h4>
                  <ul className="space-y-2">
                    {servicio.documentos.map((doc, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-primary-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-300 mt-2 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Qué incluye */}
                <div>
                  <h4 className="text-sm font-semibold text-primary-900 flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    El servicio incluye
                  </h4>
                  <ul className="space-y-2">
                    {servicio.incluye.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-primary-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <Link href={`/buscar?servicio=${servicio.id}`} className="flex-1">
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
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-start gap-4 text-left"
      >
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-sm font-semibold text-primary-600">
          {index + 1}
        </span>
        <div className="flex-1">
          <h3 className="font-semibold text-primary-900 pr-8">{faq.pregunta}</h3>
          <AnimatePresence>
            {open && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 text-sm text-primary-600 leading-relaxed"
              >
                {faq.respuesta}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="flex-shrink-0">
          <ChevronDown className="w-5 h-5 text-primary-400" />
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
    <section className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-950 text-white overflow-hidden">
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />

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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
              necesitás
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 text-lg text-primary-200 max-w-2xl mx-auto"
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
              className="text-white hover:bg-white/10"
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
    <section className="py-16 sm:py-24 bg-gray-50">
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
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold font-serif text-primary-900">
              Servicios populares
            </h2>
            <p className="mt-3 text-primary-600">
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
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-primary-900">
              Todos los servicios
            </h2>
            <p className="mt-3 text-primary-600">
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
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800">
              <HelpCircle className="w-3.5 h-3.5" />
              Preguntas frecuentes
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold font-serif text-primary-900">
              Dudas comunes sobre servicios notariales
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-200 overflow-hidden"
          >
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 text-center">
            <p className="text-primary-600 mb-4">
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
    <section className="py-16 sm:py-24 bg-primary-950 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />

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
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-primary-200">
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
                className="text-white hover:bg-white/10"
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