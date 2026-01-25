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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// =============================================================================
// DATOS - Colores pastel profesionales para escribanía
// =============================================================================

const SERVICIOS = [
  {
    id: "ESCRITURAS",
    nombre: "Escrituras",
    descripcion: "Compraventa, hipotecas",
    icon: ScrollText,
    color: "from-slate-500 to-slate-600",
    bgLight: "bg-slate-50",
  },
  {
    id: "DECLARATORIA",
    nombre: "Sucesiones",
    descripcion: "Declaratoria de herederos",
    icon: Users,
    color: "from-stone-500 to-stone-600",
    bgLight: "bg-stone-50",
  },
  {
    id: "PODERES",
    nombre: "Poderes",
    descripcion: "Generales y especiales",
    icon: Stamp,
    color: "from-amber-600 to-amber-700",
    bgLight: "bg-amber-50",
  },
  {
    id: "TESTAMENTOS",
    nombre: "Testamentos",
    descripcion: "Públicos y cerrados",
    icon: FileText,
    color: "from-emerald-600 to-emerald-700",
    bgLight: "bg-emerald-50",
  },
  {
    id: "DONACIONES",
    nombre: "Donaciones",
    descripcion: "Entre vivos",
    icon: Gift,
    color: "from-rose-400 to-rose-500",
    bgLight: "bg-rose-50",
  },
  {
    id: "SOCIEDADES",
    nombre: "Sociedades",
    descripcion: "Constitución y actas",
    icon: Building2,
    color: "from-sky-500 to-sky-600",
    bgLight: "bg-sky-50",
  },
];

const BENEFICIOS = [
  {
    icon: Shield,
    title: "Escribanos verificados",
    description: "Todos matriculados y con identidad comprobada",
    gradient: "from-slate-100 to-slate-200",
    iconColor: "text-slate-600",
  },
  {
    icon: Video,
    title: "Presencial o virtual",
    description: "En persona, por Zoom o WhatsApp",
    gradient: "from-sky-100 to-sky-200",
    iconColor: "text-sky-600",
  },
  {
    icon: Calendar,
    title: "Agenda 24/7",
    description: "Reservá cuando quieras, sin llamar",
    gradient: "from-amber-100 to-amber-200",
    iconColor: "text-amber-700",
  },
  {
    icon: Star,
    title: "Opiniones reales",
    description: "Leé experiencias de otros clientes",
    gradient: "from-emerald-100 to-emerald-200",
    iconColor: "text-emerald-600",
  },
];

const PASOS = [
  { numero: "1", titulo: "Buscá", descripcion: "Elegí servicio y zona", emoji: "🔍" },
  { numero: "2", titulo: "Compará", descripcion: "Perfiles, precios y opiniones", emoji: "⚖️" },
  { numero: "3", titulo: "Agendá", descripcion: "Confirmación por WhatsApp", emoji: "✅" },
];

const STATS = [
  { value: "50+", label: "Escribanos" },
  { value: "1,000+", label: "Consultas" },
  { value: "4.8★", label: "Calificación" },
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

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background - Gradiente suave crema/azul grisáceo */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700" />

      {/* Pattern sutil */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Glows suaves */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-200/20 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sky-200/10 rounded-full blur-[128px]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/90 text-slate-700 border border-slate-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Ahora en Villa María y alrededores
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            variants={fadeInUp}
            className="text-center font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
          >
            Encontrá el escribano{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-300">
                ideal
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-2 left-0 h-3 bg-amber-300/30 rounded"
              />
            </span>{" "}
            para tu trámite
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeInUp}
            className="mt-6 text-center text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto"
          >
            Compará precios, leé opiniones y agendá tu consulta presencial o virtual.
            Así de simple.
          </motion.p>

          {/* Buscador */}
          <motion.div variants={fadeInUp} className="mt-10 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-2 border border-white/20">
              <div className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-lg">
                {/* Select servicio */}
                <div className="flex-1 relative">
                  <select
                    value={selectedServicio}
                    onChange={(e) => setSelectedServicio(e.target.value)}
                    className="w-full appearance-none bg-slate-50 rounded-xl px-5 py-4 pr-10 text-slate-800 font-medium border-2 border-transparent focus:border-amber-400 focus:outline-none transition-colors"
                  >
                    <option value="">¿Qué trámite necesitás?</option>
                    {SERVICIOS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.nombre}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>

                {/* Input ubicación */}
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="¿Dónde?"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-slate-50 rounded-xl pl-12 pr-5 py-4 text-slate-800 placeholder:text-slate-400 border-2 border-transparent focus:border-amber-400 focus:outline-none transition-colors"
                  />
                </div>

                {/* Botón - Champagne/Dorado suave */}
                <Link href={`/buscar${selectedServicio ? `?servicio=${selectedServicio}` : ""}`}>
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto whitespace-nowrap h-14 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <Search className="w-5 h-5" />
                    <span className="ml-2">Buscar</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl font-bold text-amber-200">{stat.value}</p>
                <p className="text-sm text-slate-300 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto" preserveAspectRatio="none">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0V120Z"
            fill="#faf9f7"
          />
        </svg>
      </div>
    </section>
  );
}

function ServiciosSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#faf9f7]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800">
              ¿Qué trámite necesitás hacer?
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              Encontrá escribanos especializados en cada servicio
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {SERVICIOS.map((servicio) => (
              <motion.div key={servicio.id} variants={scaleIn}>
                <Link href={`/buscar?servicio=${servicio.id}`}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="card-hover h-full cursor-pointer group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all"
                  >
                    <div className="p-5 text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 3 }}
                        className={cn(
                          "w-14 h-14 mx-auto rounded-2xl",
                          "bg-gradient-to-br",
                          servicio.color,
                          "flex items-center justify-center",
                          "shadow-md group-hover:shadow-lg transition-shadow duration-300"
                        )}
                      >
                        <servicio.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="mt-4 font-semibold text-slate-800 group-hover:text-amber-700 transition-colors">
                        {servicio.nombre}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">{servicio.descripcion}</p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-10 text-center">
            <Link href="/servicios">
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
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
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              Por qué EscribanosARG
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold text-slate-800">
              La forma más simple de encontrar un escribano
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {BENEFICIOS.map((beneficio) => (
              <motion.div key={beneficio.title} variants={fadeInUp}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="h-full bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
                >
                  <div className="p-6">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl",
                        "bg-gradient-to-br",
                        beneficio.gradient,
                        "flex items-center justify-center"
                      )}
                    >
                      <beneficio.icon className={cn("w-6 h-6", beneficio.iconColor)} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-800">
                      {beneficio.title}
                    </h3>
                    <p className="mt-2 text-slate-600">{beneficio.description}</p>
                  </div>
                </motion.div>
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
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800">
              Tan simple como pedir un Uber
            </h2>
            <p className="mt-4 text-slate-600 text-lg">
              En 3 pasos tenés tu consulta agendada
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="mt-16 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Línea conectora - tono más suave */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300" />

              {PASOS.map((paso, index) => (
                <motion.div key={paso.numero} variants={scaleIn} className="relative text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    className="relative z-10 mx-auto w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 rounded-3xl shadow-md flex items-center justify-center text-4xl"
                  >
                    {paso.emoji}
                  </motion.div>
                  <h3 className="mt-6 text-xl font-bold text-slate-800">{paso.titulo}</h3>
                  <p className="mt-2 text-slate-600">{paso.descripcion}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-14 text-center">
            <Link href="/buscar">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-md hover:shadow-lg"
              >
                Buscar escribano ahora
                <ArrowRight className="w-5 h-5 ml-2" />
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
    <section className="py-20 sm:py-28 bg-slate-800 relative overflow-hidden">
      {/* Glows suaves */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-300/10 rounded-full blur-[128px]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/90 text-slate-700 border border-slate-200">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Para Escribanos
            </span>

            <h2 className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Hacé crecer tu estudio con nosotros
            </h2>

            <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
              Aumentá tu visibilidad, conseguí más clientes y gestioná tu agenda de forma
              eficiente. Los primeros 30 días son gratis.
            </p>
          </motion.div>

          {/* Features grid */}
          <motion.div
            variants={staggerContainer}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {CTA_FEATURES.map((feature) => (
              <motion.div
                key={feature}
                variants={fadeInUp}
                className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-5 py-4 border border-white/10"
              >
                <div className="w-6 h-6 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                </div>
                <span className="text-white font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/register?role=escribano">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-semibold shadow-md hover:shadow-lg"
              >
                Registrarme gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/precios">
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-white hover:bg-white/10 border border-white/20"
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
// PÁGINA PRINCIPAL
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