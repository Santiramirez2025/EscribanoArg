"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Video,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle2,
  MapPin,
  ChevronDown,
  Sparkles,
  Users,
  Building2,
  ScrollText,
  Scale,
  Stamp,
  FileText,
  Gift,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// =============================================================================
// ANIMACIONES OPTIMIZADAS (más profesionales, menos "bouncy")
// =============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// =============================================================================
// DATOS
// =============================================================================

const SERVICIOS = [
  {
    id: "ESCRITURAS",
    nombre: "Escrituras",
    descripcion: "Compraventa, hipotecas",
    icon: ScrollText,
    color: "from-primary-600 to-primary-700",
    bgLight: "bg-primary-50",
    borderColor: "border-primary-200",
  },
  {
    id: "DECLARATORIA",
    nombre: "Sucesiones",
    descripcion: "Declaratoria de herederos",
    icon: Users,
    color: "from-primary-500 to-primary-600",
    bgLight: "bg-primary-50",
    borderColor: "border-primary-200",
  },
  {
    id: "PODERES",
    nombre: "Poderes",
    descripcion: "Generales y especiales",
    icon: Stamp,
    color: "from-accent-600 to-accent-700",
    bgLight: "bg-accent-50",
    borderColor: "border-accent-200",
  },
  {
    id: "TESTAMENTOS",
    nombre: "Testamentos",
    descripcion: "Públicos y cerrados",
    icon: FileText,
    color: "from-success to-success-dark",
    bgLight: "bg-success-light",
    borderColor: "border-green-200",
  },
  {
    id: "DONACIONES",
    nombre: "Donaciones",
    descripcion: "Entre vivos",
    icon: Gift,
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
    borderColor: "border-rose-200",
  },
  {
    id: "SOCIEDADES",
    nombre: "Sociedades",
    descripcion: "Constitución y actas",
    icon: Building2,
    color: "from-sky-500 to-sky-600",
    bgLight: "bg-sky-50",
    borderColor: "border-sky-200",
  },
];

const BENEFICIOS = [
  {
    icon: Shield,
    title: "Escribanos verificados",
    description: "Todos matriculados y con identidad comprobada",
    gradient: "from-primary-50 to-primary-100",
    iconColor: "text-primary-700",
    borderColor: "border-primary-200/60",
  },
  {
    icon: Video,
    title: "Presencial o virtual",
    description: "En persona, por Zoom o WhatsApp",
    gradient: "from-sky-50 to-sky-100",
    iconColor: "text-sky-600",
    borderColor: "border-sky-200/60",
  },
  {
    icon: Calendar,
    title: "Agenda 24/7",
    description: "Reservá cuando quieras, sin llamar",
    gradient: "from-accent-50 to-accent-100",
    iconColor: "text-accent-700",
    borderColor: "border-accent-200/60",
  },
  {
    icon: Star,
    title: "Opiniones reales",
    description: "Leé experiencias de otros clientes",
    gradient: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200/60",
  },
];

const PASOS = [
  {
    numero: "1",
    titulo: "Buscá",
    descripcion: "Elegí servicio y zona",
    icon: Search,
  },
  {
    numero: "2",
    titulo: "Compará",
    descripcion: "Perfiles, precios y opiniones",
    icon: Scale,
  },
  {
    numero: "3",
    titulo: "Agendá",
    descripcion: "Confirmación por WhatsApp",
    icon: CheckCircle2,
  },
];

const STATS = [
  { value: "50+", label: "Escribanos", icon: Users },
  { value: "1,000+", label: "Consultas", icon: TrendingUp },
  { value: "4.8★", label: "Calificación", icon: Star },
];

const CTA_FEATURES = [
  "Perfil profesional destacado",
  "Agenda online integrada",
  "Consultas virtuales",
  "Estadísticas en tiempo real",
  "Notificaciones automáticas",
  "Sin comisiones",
];

// =============================================================================
// COMPONENTES DE SECCIÓN
// =============================================================================

function HeroSection() {
  const [selectedServicio, setSelectedServicio] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [error, setError] = useState("");

  const handleSearch = (e: React.MouseEvent) => {
    if (!selectedServicio && !selectedLocation) {
      e.preventDefault();
      setError("Por favor seleccioná al menos el tipo de servicio o la ubicación");
      return;
    }
    setError("");

    // Analytics tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "search_escribano", {
        servicio: selectedServicio,
        ubicacion: selectedLocation,
      });
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center overflow-hidden">
      {/* Background profesional - azul marino institucional */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900" />

      {/* Pattern más sutil y profesional */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glows más sutiles y profesionales */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-300/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/10 rounded-full blur-[140px]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Badge más profesional */}
          <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/95 text-primary-800 border border-primary-200/50 shadow-lg backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-600" />
              Argentina 🇦🇷 
            </span>
          </motion.div>

          {/* Título más profesional - optimizado mobile */}
          <motion.h1
            variants={fadeInUp}
            className="text-center font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.15] sm:leading-[1.1] tracking-tight px-2"
          >
            Encontrá el escribano{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-accent-400">
                ideal
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
                className="absolute bottom-1 sm:bottom-2 left-0 h-2 sm:h-3 bg-accent-400/25 rounded"
              />
            </span>{" "}
            para tu trámite
          </motion.h1>

          {/* Subtítulo optimizado */}
          <motion.p
            variants={fadeInUp}
            className="mt-4 sm:mt-6 text-center text-base sm:text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Compará precios, leé opiniones y agendá tu consulta presencial o
            virtual. Así de simple.
          </motion.p>

          {/* Buscador rediseñado profesional - optimizado mobile */}
          <motion.div variants={fadeInUp} className="mt-8 sm:mt-12 max-w-3xl mx-auto px-2">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 border border-white/40 shadow-2xl">
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {/* Select servicio */}
                <div className="relative">
                  <label htmlFor="servicio-select" className="sr-only">
                    Tipo de servicio
                  </label>
                  <select
                    id="servicio-select"
                    value={selectedServicio}
                    onChange={(e) => {
                      setSelectedServicio(e.target.value);
                      setError("");
                    }}
                    aria-label="Seleccionar tipo de servicio"
                    className="w-full appearance-none bg-gray-50 rounded-xl px-4 sm:px-5 py-3.5 sm:py-4 pr-10 sm:pr-12 text-primary-900 font-medium text-sm sm:text-[15px] border-2 border-gray-200 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20 transition-all"
                  >
                    <option value="">¿Qué trámite necesitás?</option>
                    {SERVICIOS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nombre}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Input ubicación */}
                <div className="relative">
                  <label htmlFor="ubicacion-input" className="sr-only">
                    Ubicación
                  </label>
                  <MapPin
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <input
                    id="ubicacion-input"
                    type="text"
                    placeholder="¿Dónde?"
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      setError("");
                    }}
                    aria-label="Ingresar ubicación"
                    className="w-full bg-gray-50 rounded-xl pl-10 sm:pl-12 pr-4 sm:pr-5 py-3.5 sm:py-4 text-primary-900 placeholder:text-gray-400 font-medium text-sm sm:text-[15px] border-2 border-gray-200 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20 transition-all"
                  />
                </div>

                {/* Botón CTA profesional */}
                <Link
                  href={`/buscar${selectedServicio ? `?servicio=${selectedServicio}` : ""}`}
                  onClick={handleSearch}
                  className="w-full"
                >
                  <Button
                    size="lg"
                    className="w-full h-12 sm:h-14 px-6 sm:px-8 bg-primary-900 hover:bg-primary-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all border border-primary-800/20 text-sm sm:text-base"
                  >
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="ml-2">Buscar</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 sm:mt-4 p-3 sm:p-4 bg-white/95 backdrop-blur-sm border border-error-light rounded-xl text-error font-medium text-xs sm:text-sm text-center shadow-lg"
              >
                {error}
              </motion.div>
            )}
          </motion.div>

          {/* Stats rediseñados profesionales - optimizado mobile */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto px-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-2 sm:mb-3">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-300" />
                </div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm md:text-base text-primary-200 mt-0.5 sm:mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Wave más suave y profesional */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0V120Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}

function ServiciosSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto px-4">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-200/60 mb-3 sm:mb-4">
              Servicios Notariales
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight">
              ¿Qué trámite necesitás hacer?
            </h2>
            <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
              Encontrá escribanos especializados en cada servicio
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5"
          >
            {SERVICIOS.map((servicio) => (
              <motion.div key={servicio.id} variants={scaleIn}>
                <Link href={`/buscar?servicio=${servicio.id}`}>
                  <div className="card-professional h-full cursor-pointer group transition-all duration-300 hover:-translate-y-1">
                    <div className="p-4 sm:p-6 text-center">
                      <div
                        className={cn(
                          "w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-xl sm:rounded-2xl",
                          "bg-gradient-to-br",
                          servicio.color,
                          "flex items-center justify-center",
                          "shadow-md group-hover:shadow-lg transition-all duration-300",
                          "border border-white/20"
                        )}
                      >
                        <servicio.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
                      </div>
                      <h3 className="mt-3 sm:mt-5 font-semibold text-primary-900 group-hover:text-primary-700 transition-colors text-sm sm:text-[15px]">
                        {servicio.nombre}
                      </h3>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 leading-snug">
                        {servicio.descripcion}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 sm:mt-12 text-center">
            <Link href="/servicios">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-primary-600 hover:text-primary-700 font-semibold px-6 sm:px-8 text-sm sm:text-base"
              >
                Ver todos los servicios
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BeneficiosSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto px-4">
            <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-200/60">
              Por qué EscribanosARG
            </span>
            <h2 className="mt-4 sm:mt-6 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight">
              La forma más simple de encontrar un escribano
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {BENEFICIOS.map((beneficio) => (
              <motion.div key={beneficio.title} variants={fadeInUp}>
                <div className="h-full bg-white rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-lg hover:border-primary-300 transition-all duration-300 p-6 sm:p-8 group">
                  <div
                    className={cn(
                      "w-12 h-12 sm:w-14 sm:h-14 rounded-xl",
                      "bg-gradient-to-br",
                      beneficio.gradient,
                      "flex items-center justify-center",
                      "border",
                      beneficio.borderColor,
                      "group-hover:scale-110 transition-transform duration-300"
                    )}
                  >
                    <beneficio.icon className={cn("w-6 h-6 sm:w-7 sm:h-7", beneficio.iconColor)} strokeWidth={2.5} />
                  </div>
                  <h3 className="mt-4 sm:mt-6 text-base sm:text-lg font-bold text-primary-900">
                    {beneficio.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">{beneficio.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ComoFuncionaSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto px-4">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-900 tracking-tight">
              Tan simple como pedir un Uber
            </h2>
            <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed">
              En 3 pasos tenés tu consulta agendada
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="mt-12 sm:mt-20 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 sm:gap-10 relative">
              {/* Línea conectora más profesional - oculta en mobile */}
              <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

              {PASOS.map((paso, index) => (
                <motion.div key={paso.numero} variants={scaleIn} className="relative text-center">
                  {/* Círculo de número más profesional */}
                  <div className="relative z-10 mx-auto w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-primary-700 to-primary-800 border-4 border-primary-200 rounded-2xl sm:rounded-3xl shadow-lg flex items-center justify-center group hover:scale-105 transition-transform duration-300">
                    <paso.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Badge de número */}
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-accent-500 text-white font-bold rounded-full flex items-center justify-center text-base sm:text-lg shadow-lg border-2 border-white">
                    {paso.numero}
                  </div>

                  <h3 className="mt-6 sm:mt-8 text-lg sm:text-xl font-bold text-primary-900">{paso.titulo}</h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 leading-relaxed px-2">{paso.descripcion}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 sm:mt-16 text-center">
            <Link href="/buscar">
              <Button
                size="lg"
                className="bg-primary-900 hover:bg-primary-800 text-white font-semibold shadow-lg hover:shadow-xl px-6 sm:px-8 border border-primary-800/20 text-sm sm:text-base"
              >
                Buscar escribano ahora
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CTAEscribanosSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      {/* Glows profesionales */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-400/8 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-[140px]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center px-4">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-white/95 text-primary-800 border border-primary-200/50 shadow-lg backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-600" />
              Para Escribanos
            </span>

            <h2 className="mt-6 sm:mt-8 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Hacé crecer tu estudio con nosotros
            </h2>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
              Aumentá tu visibilidad, conseguí más clientes y gestioná tu agenda de
              forma eficiente. Los primeros 30 días son gratis.
            </p>
          </motion.div>

          {/* Features grid más profesional */}
          <motion.div
            variants={staggerContainer}
            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {CTA_FEATURES.map((feature) => (
              <motion.div
                key={feature}
                variants={fadeInUp}
                className="flex items-center gap-2.5 sm:gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-white/20 hover:bg-white/15 transition-colors duration-300"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent-400/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-accent-300" strokeWidth={2.5} />
                </div>
                <span className="text-white font-medium text-sm sm:text-[15px]">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs profesionales */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <Link href="/register?role=escribano" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-primary-900 font-bold shadow-xl hover:shadow-2xl px-6 sm:px-8 border-2 border-white/20 text-sm sm:text-base"
              >
                Registrarme gratis
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/precios" className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-white hover:bg-white/10 border-2 border-white/30 hover:border-white/50 font-semibold px-6 sm:px-8 text-sm sm:text-base"
              >
                Ver planes y precios
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// COMPONENTE PRINCIPAL EXPORTADO
// =============================================================================

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HeroSection />
        <ServiciosSection />
        <BeneficiosSection />
        <ComoFuncionaSection />
        <CTAEscribanosSection />
      </main>

      <Footer />
    </div>
  );
}