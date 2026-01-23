"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Clock,
  Video,
  Building2,
  Phone,
  Mail,
  Globe,
  Calendar,
  CheckCircle2,
  Shield,
  Award,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Share2,
  Heart,
  ExternalLink,
  BadgeCheck,
  Briefcase,
  GraduationCap,
  Languages,
  Car,
  CreditCard,
  Banknote,
  FileText,
  Users,
  ThumbsUp,
  Flag,
  MoreHorizontal,
  X,
  Send,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import {
  cn,
  formatPrecioARS,
  getEstrellas,
  formatFechaRelativa,
  pluralize,
  getInitials,
} from "@/lib/utils";

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
// TIPOS
// =============================================================================

interface Servicio {
  id: string;
  nombre: string;
  precio: number | null;
  descripcion: string;
}

interface Review {
  id: string;
  autor: string;
  foto: string | null;
  fecha: string;
  calificacion: number;
  servicio: string;
  comentario: string;
  util: number;
}

interface Disponibilidad {
  dia: string;
  horarios: string[];
}

interface Escribano {
  id: string;
  nombre: string;
  apellido: string;
  foto: string | null;
  matricula: string;
  colegioEscribanos: string;
  localidad: string;
  provincia: string;
  direccion: string;
  telefono: string;
  email: string;
  web: string | null;
  calificacion: number;
  totalReviews: number;
  experiencia: number;
  idiomas: string[];
  modalidades: ("presencial" | "virtual" | "domicilio")[];
  formasPago: string[];
  verificado: boolean;
  destacado: boolean;
  disponibilidadInmediata: boolean;
  bio: string;
  especialidades: string[];
  servicios: Servicio[];
  disponibilidad: Disponibilidad[];
  reviews: Review[];
}

// =============================================================================
// DATOS MOCK
// =============================================================================

const MOCK_ESCRIBANO: Escribano = {
  id: "1",
  nombre: "María Laura",
  apellido: "González",
  foto: null,
  matricula: "MAT-1234",
  colegioEscribanos: "Colegio de Escribanos de Córdoba",
  localidad: "Villa María",
  provincia: "Córdoba",
  direccion: "Av. Sabattini 456, Piso 2, Of. 4",
  telefono: "+54 9 353 412-3456",
  email: "mlgonzalez@escribania.com",
  web: "www.escribaniagonzalez.com",
  calificacion: 4.9,
  totalReviews: 127,
  experiencia: 15,
  idiomas: ["Español", "Inglés"],
  modalidades: ["presencial", "virtual", "domicilio"],
  formasPago: ["Efectivo", "Transferencia", "Tarjeta de crédito", "Tarjeta de débito"],
  verificado: true,
  destacado: true,
  disponibilidadInmediata: true,
  bio: "Escribana pública con más de 15 años de experiencia en derecho notarial. Especializada en operaciones inmobiliarias, planificación sucesoria y derecho societario. Mi compromiso es brindar un servicio personalizado, ágil y transparente a cada cliente.",
  especialidades: ["Escrituras", "Sucesiones", "Sociedades", "Poderes"],
  servicios: [
    {
      id: "ESCRITURAS",
      nombre: "Escrituras",
      precio: 150000,
      descripcion: "Compraventa, hipotecas, permutas y cesiones de inmuebles",
    },
    {
      id: "DECLARATORIA",
      nombre: "Sucesiones",
      precio: 200000,
      descripcion: "Declaratoria de herederos, inventario y adjudicación",
    },
    {
      id: "PODERES",
      nombre: "Poderes",
      precio: 25000,
      descripcion: "Poderes generales, especiales y para juicios",
    },
    {
      id: "TESTAMENTOS",
      nombre: "Testamentos",
      precio: 45000,
      descripcion: "Testamentos públicos y cerrados",
    },
    {
      id: "CERTIFICACIONES",
      nombre: "Certificaciones",
      precio: 8000,
      descripcion: "Certificación de firmas, copias y documentos",
    },
    {
      id: "SOCIEDADES",
      nombre: "Sociedades",
      precio: 120000,
      descripcion: "Constitución de SRL, SA, SAS y modificaciones",
    },
  ],
  disponibilidad: [
    { dia: "Lunes", horarios: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"] },
    { dia: "Martes", horarios: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"] },
    { dia: "Miércoles", horarios: ["09:00", "10:00", "11:00"] },
    { dia: "Jueves", horarios: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"] },
    { dia: "Viernes", horarios: ["09:00", "10:00", "11:00", "15:00"] },
  ],
  reviews: [
    {
      id: "1",
      autor: "Juan Carlos Pérez",
      foto: null,
      fecha: "2025-01-15",
      calificacion: 5,
      servicio: "Escritura de compraventa",
      comentario:
        "Excelente profesional. Muy clara en las explicaciones y todo el proceso fue rápido y sin complicaciones. La recomiendo totalmente para cualquier trámite inmobiliario.",
      util: 12,
    },
    {
      id: "2",
      autor: "María Fernanda López",
      foto: null,
      fecha: "2025-01-10",
      calificacion: 5,
      servicio: "Sucesión",
      comentario:
        "Nos acompañó en todo el proceso sucesorio de mi padre. Muy profesional y humana en un momento difícil. El trámite se resolvió más rápido de lo esperado.",
      util: 8,
    },
    {
      id: "3",
      autor: "Roberto Sánchez",
      foto: null,
      fecha: "2025-01-05",
      calificacion: 4,
      servicio: "Poder general",
      comentario:
        "Buen servicio, rápido y eficiente. El precio fue razonable. Solo tuve que esperar un poco para la cita inicial.",
      util: 5,
    },
    {
      id: "4",
      autor: "Carolina Martínez",
      foto: null,
      fecha: "2024-12-20",
      calificacion: 5,
      servicio: "Constitución de SRL",
      comentario:
        "Constituyó nuestra sociedad de forma impecable. Nos asesoró sobre la mejor estructura y todo quedó perfecto. Muy recomendable.",
      util: 15,
    },
  ],
};

// =============================================================================
// COMPONENTES
// =============================================================================

function ProfileHeader({ escribano }: { escribano: Escribano }) {
  const [liked, setLiked] = useState(false);
  const initials = getInitials(`${escribano.nombre} ${escribano.apellido}`);
  const estrellas = getEstrellas(escribano.calificacion);

  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 h-48 sm:h-56 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />
      
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 h-48 sm:h-56 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="pt-4 sm:pt-6">
          <Link
            href="/buscar"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a resultados
          </Link>
        </div>

        {/* Profile card */}
        <div className="mt-8 sm:mt-12 pb-6">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-5 sm:p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <div className="relative">
                    {escribano.foto ? (
                      <img
                        src={escribano.foto}
                        alt={`${escribano.nombre} ${escribano.apellido}`}
                        className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center border-4 border-white shadow-lg">
                        <span className="text-4xl font-bold text-primary-600">{initials}</span>
                      </div>
                    )}
                    {/* Verified badge */}
                    {escribano.verificado && (
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-md">
                        <BadgeCheck className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      {/* Name & badges */}
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-primary-900">
                          {escribano.nombre} {escribano.apellido}
                        </h1>
                        {escribano.destacado && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                            <Award className="w-3 h-3" />
                            Destacado
                          </span>
                        )}
                      </div>

                      {/* Location */}
                      <p className="mt-2 text-primary-600 flex items-center justify-center sm:justify-start gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {escribano.localidad}, {escribano.provincia}
                      </p>

                      {/* Rating */}
                      <div className="mt-3 flex items-center justify-center sm:justify-start gap-3">
                        <div className="flex items-center gap-1">
                          {estrellas.map((tipo, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-5 h-5",
                                tipo === "full"
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-gray-200 text-gray-200"
                              )}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-primary-900">
                          {escribano.calificacion.toFixed(1)}
                        </span>
                        <span className="text-primary-500">
                          ({pluralize(escribano.totalReviews, "opinión", "opiniones")})
                        </span>
                      </div>

                      {/* Quick badges */}
                      <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                        {escribano.disponibilidadInmediata && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Clock className="w-3.5 h-3.5" />
                            Disponible hoy
                          </span>
                        )}
                        {escribano.modalidades.includes("virtual") && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                            <Video className="w-3.5 h-3.5" />
                            Consultas virtuales
                          </span>
                        )}
                        {escribano.modalidades.includes("domicilio") && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <Car className="w-3.5 h-3.5" />
                            A domicilio
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center sm:justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setLiked(!liked)}
                        className={cn(
                          "p-3 rounded-xl border-2 transition-all",
                          liked
                            ? "bg-red-50 border-red-200 text-red-500"
                            : "bg-white border-gray-200 text-primary-400 hover:border-gray-300"
                        )}
                      >
                        <Heart className={cn("w-5 h-5", liked && "fill-red-500")} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 rounded-xl border-2 border-gray-200 bg-white text-primary-400 hover:border-gray-300 transition-all"
                      >
                        <Share2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickContactBar({ escribano }: { escribano: Escribano }) {
  return (
    <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-3 flex items-center justify-between gap-4">
          {/* Mini profile */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <span className="text-sm font-bold text-primary-600">
                {getInitials(`${escribano.nombre} ${escribano.apellido}`)}
              </span>
            </div>
            <div>
              <p className="font-semibold text-primary-900 text-sm">
                {escribano.nombre} {escribano.apellido}
              </p>
              <p className="text-xs text-primary-500">
                {escribano.localidad} · {escribano.calificacion}★
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-2 flex-1 sm:flex-none justify-end">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              <MessageSquare className="w-4 h-4 mr-2" />
              Consultar
            </Button>
            <Link href={`/agendar/${escribano.id}`}>
              <Button variant="accent" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar turno
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutSection({ escribano }: { escribano: Escribano }) {
  return (
    <motion.section variants={fadeInUp} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-amber-500" />
          Sobre mí
        </h2>
        <p className="mt-4 text-primary-600 leading-relaxed">{escribano.bio}</p>

        {/* Info grid */}
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
            <Briefcase className="w-5 h-5 text-primary-500 mt-0.5" />
            <div>
              <p className="text-sm text-primary-500">Experiencia</p>
              <p className="font-semibold text-primary-900">{escribano.experiencia} años</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
            <GraduationCap className="w-5 h-5 text-primary-500 mt-0.5" />
            <div>
              <p className="text-sm text-primary-500">Matrícula</p>
              <p className="font-semibold text-primary-900">{escribano.matricula}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
            <Shield className="w-5 h-5 text-primary-500 mt-0.5" />
            <div>
              <p className="text-sm text-primary-500">Colegio</p>
              <p className="font-semibold text-primary-900">{escribano.colegioEscribanos}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
            <Languages className="w-5 h-5 text-primary-500 mt-0.5" />
            <div>
              <p className="text-sm text-primary-500">Idiomas</p>
              <p className="font-semibold text-primary-900">{escribano.idiomas.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Especialidades */}
        <div className="mt-6">
          <p className="text-sm font-medium text-primary-700 mb-3">Especialidades</p>
          <div className="flex flex-wrap gap-2">
            {escribano.especialidades.map((esp) => (
              <span
                key={esp}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200"
              >
                {esp}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ServiciosSection({ escribano }: { escribano: Escribano }) {
  return (
    <motion.section variants={fadeInUp} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-500" />
          Servicios y precios
        </h2>

        <div className="mt-4 divide-y divide-gray-100">
          {escribano.servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-primary-900">{servicio.nombre}</h3>
                <p className="mt-0.5 text-sm text-primary-500 line-clamp-1">
                  {servicio.descripcion}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-lg font-bold text-primary-900">
                  {formatPrecioARS(servicio.precio, { fallback: "Consultar" })}
                </p>
                <p className="text-xs text-primary-400">desde</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Nota:</strong> Los precios son orientativos y pueden variar según la complejidad
            del trámite. Solicitá un presupuesto personalizado sin compromiso.
          </p>
        </div>
      </div>
    </motion.section>
  );
}

function ContactSection({ escribano }: { escribano: Escribano }) {
  return (
    <motion.section variants={fadeInUp} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-500" />
          Ubicación y contacto
        </h2>

        {/* Map placeholder */}
        <div className="mt-4 h-40 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary-300 mx-auto" />
            <p className="mt-2 text-sm text-primary-500">Mapa interactivo</p>
          </div>
        </div>

        {/* Address */}
        <div className="mt-4 p-4 rounded-xl bg-gray-50">
          <p className="font-medium text-primary-900">{escribano.direccion}</p>
          <p className="text-sm text-primary-500 mt-1">
            {escribano.localidad}, {escribano.provincia}
          </p>
        </div>

        {/* Contact info */}
        <div className="mt-4 space-y-3">
          <a
            href={`tel:${escribano.telefono}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Phone className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-primary-500">Teléfono</p>
              <p className="font-medium text-primary-900 group-hover:text-amber-600 transition-colors">
                {escribano.telefono}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary-300" />
          </a>

          <a
            href={`mailto:${escribano.email}`}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-primary-500">Email</p>
              <p className="font-medium text-primary-900 group-hover:text-amber-600 transition-colors">
                {escribano.email}
              </p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary-300" />
          </a>

          {escribano.web && (
            <a
              href={`https://${escribano.web}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-primary-500">Sitio web</p>
                <p className="font-medium text-primary-900 group-hover:text-amber-600 transition-colors">
                  {escribano.web}
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-primary-300" />
            </a>
          )}
        </div>

        {/* Formas de pago */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm font-medium text-primary-700 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Formas de pago
          </p>
          <div className="flex flex-wrap gap-2">
            {escribano.formasPago.map((forma) => (
              <span
                key={forma}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-primary-700"
              >
                {forma}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function DisponibilidadSection({ escribano }: { escribano: Escribano }) {
  const [selectedDay, setSelectedDay] = useState(escribano.disponibilidad[0]?.dia);

  const selectedDayData = escribano.disponibilidad.find((d) => d.dia === selectedDay);

  return (
    <motion.section variants={fadeInUp} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-500" />
            Disponibilidad
          </h2>
          {escribano.disponibilidadInmediata && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Disponible hoy
            </span>
          )}
        </div>

        {/* Days selector */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {escribano.disponibilidad.map((dia) => (
            <button
              key={dia.dia}
              onClick={() => setSelectedDay(dia.dia)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                selectedDay === dia.dia
                  ? "bg-amber-500 text-white shadow-md"
                  : "bg-gray-100 text-primary-700 hover:bg-gray-200"
              )}
            >
              {dia.dia}
            </button>
          ))}
        </div>

        {/* Time slots */}
        {selectedDayData && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-2">
            {selectedDayData.horarios.map((hora) => (
              <button
                key={hora}
                className="py-3 px-4 rounded-xl text-sm font-medium bg-gray-50 text-primary-700 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200 border-2 border-transparent transition-all"
              >
                {hora}
              </button>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-6">
          <Link href={`/agendar/${escribano.id}`}>
            <Button variant="accent" size="lg" className="w-full">
              <Calendar className="w-5 h-5 mr-2" />
              Ver agenda completa y agendar
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const initials = getInitials(review.autor);
  const estrellas = getEstrellas(review.calificacion);
  const isLong = review.comentario.length > 200;

  return (
    <div className="py-5 border-b border-gray-100 last:border-0">
      {/* Header */}
      <div className="flex items-start gap-3">
        {review.foto ? (
          <img
            src={review.foto}
            alt={review.autor}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <span className="text-sm font-bold text-primary-600">{initials}</span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-primary-900">{review.autor}</p>
              <p className="text-xs text-primary-500">{review.servicio}</p>
            </div>
            <div className="flex items-center gap-1">
              {estrellas.map((tipo, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    tipo === "full" ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3">
        <p className={cn("text-primary-600 text-sm leading-relaxed", !expanded && isLong && "line-clamp-3")}>
          {review.comentario}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            {expanded ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between text-xs text-primary-400">
        <span>{formatFechaRelativa(review.fecha)}</span>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
            <ThumbsUp className="w-3.5 h-3.5" />
            Útil ({review.util})
          </button>
          <button className="flex items-center gap-1 hover:text-primary-600 transition-colors">
            <Flag className="w-3.5 h-3.5" />
            Reportar
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewsSection({ escribano }: { escribano: Escribano }) {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? escribano.reviews : escribano.reviews.slice(0, 3);

  // Stats
  const avgRating = escribano.calificacion;
  const totalReviews = escribano.totalReviews;
  const ratingDistribution = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <motion.section variants={fadeInUp} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-primary-900 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-500" />
          Opiniones
        </h2>

        {/* Stats */}
        <div className="mt-4 grid sm:grid-cols-2 gap-6">
          {/* Overall rating */}
          <div className="text-center p-6 rounded-xl bg-gray-50">
            <p className="text-5xl font-bold text-primary-900">{avgRating.toFixed(1)}</p>
            <div className="mt-2 flex items-center justify-center gap-1">
              {getEstrellas(avgRating).map((tipo, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-5 h-5",
                    tipo === "full" ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-primary-500">
              {pluralize(totalReviews, "opinión", "opiniones")}
            </p>
          </div>

          {/* Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-2">
                <span className="text-sm text-primary-600 w-3">{item.stars}</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-primary-500 w-8">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews list */}
        <div className="mt-6 divide-y divide-gray-100">
          {displayedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Show more */}
        {escribano.reviews.length > 3 && (
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
              {showAll
                ? "Ver menos"
                : `Ver todas las ${escribano.reviews.length} opiniones`}
              <ChevronDown className={cn("w-4 h-4 ml-2 transition-transform", showAll && "rotate-180")} />
            </Button>
          </div>
        )}
      </div>
    </motion.section>
  );
}

function CTASidebar({ escribano }: { escribano: Escribano }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="sticky top-32 space-y-4"
    >
      {/* Main CTA Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="text-center">
          <p className="text-sm text-primary-500">Consulta desde</p>
          <p className="text-3xl font-bold text-primary-900">
            {formatPrecioARS(
              Math.min(...escribano.servicios.map((s) => s.precio || Infinity))
            )}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <Link href={`/agendar/${escribano.id}`} className="block">
            <Button variant="accent" size="lg" className="w-full">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar turno
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full">
            <MessageSquare className="w-5 h-5 mr-2" />
            Enviar consulta
          </Button>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm text-primary-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Respuesta en menos de 24hs
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Presupuesto sin compromiso
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Cancelación gratuita
          </div>
        </div>
      </div>

      {/* Quick contact */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Phone className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-emerald-700">¿Preferís llamar?</p>
            <a
              href={`tel:${escribano.telefono}`}
              className="font-semibold text-emerald-800 hover:underline"
            >
              {escribano.telefono}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// PÁGINA PRINCIPAL
// =============================================================================

export default function PerfilEscribanoPage() {
  const params = useParams();
  // En producción: fetch del escribano por ID
  const escribano = MOCK_ESCRIBANO;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Profile Header */}
        <ProfileHeader escribano={escribano} />

        {/* Quick Contact Bar (sticky) */}
        <QuickContactBar escribano={escribano} />

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <AboutSection escribano={escribano} />
              <ServiciosSection escribano={escribano} />
              <DisponibilidadSection escribano={escribano} />
              <ReviewsSection escribano={escribano} />
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <CTASidebar escribano={escribano} />
            </div>
          </motion.div>
        </div>

        {/* Mobile CTA Fixed */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Consultar
            </Button>
            <Link href={`/agendar/${escribano.id}`} className="flex-1">
              <Button variant="accent" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar
              </Button>
            </Link>
          </div>
        </div>

        {/* Spacer for mobile CTA */}
        <div className="lg:hidden h-24" />
      </main>

      <Footer />
    </div>
  );
}