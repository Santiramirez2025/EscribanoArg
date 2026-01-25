"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  TrendingUp,
  Shield,
  Clock,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Zap,
  BarChart3,
  Bell,
  MessageSquare,
  CreditCard,
  Globe,
  Smartphone,
  HeadphonesIcon,
  Award,
  Target,
  Sparkles,
  Play,
  Quote,
  Building2,
  MapPin,
  BadgeCheck,
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
// DATOS
// =============================================================================

const BENEFICIOS = [
  {
    icon: Users,
    title: "Más clientes",
    description: "Accedé a miles de personas buscando servicios notariales en tu zona.",
    stat: "+150%",
    statLabel: "consultas promedio",
  },
  {
    icon: Calendar,
    title: "Agenda inteligente",
    description: "Sistema de reservas online 24/7. Tus clientes agendan sin llamadas.",
    stat: "24/7",
    statLabel: "disponibilidad",
  },
  {
    icon: TrendingUp,
    title: "Crecé tu estudio",
    description: "Herramientas de marketing y visibilidad para destacar tu perfil.",
    stat: "3x",
    statLabel: "más visibilidad",
  },
  {
    icon: Shield,
    title: "Perfil verificado",
    description: "Badge de verificación que genera confianza en potenciales clientes.",
    stat: "100%",
    statLabel: "confianza",
  },
];

const FUNCIONALIDADES = [
  {
    icon: Globe,
    title: "Perfil profesional",
    description: "Página personalizada con tus servicios, precios, horarios y ubicación. Aparecés en Google.",
    color: "from-slate-500 to-slate-600",
  },
  {
    icon: Calendar,
    title: "Agenda online",
    description: "Calendario sincronizable con Google Calendar. Bloqueo de horarios y recordatorios automáticos.",
    color: "from-stone-500 to-stone-600",
  },
  {
    icon: MessageSquare,
    title: "Chat integrado",
    description: "Comunicación directa con clientes. Respuestas rápidas y seguimiento de consultas.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    description: "Alertas de nuevas reservas, mensajes y recordatorios por email, WhatsApp y app.",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: BarChart3,
    title: "Estadísticas",
    description: "Dashboard con métricas de visitas, conversión, calificaciones y rendimiento.",
    color: "from-rose-400 to-rose-500",
  },
  {
    icon: Smartphone,
    title: "App móvil",
    description: "Gestioná tu agenda y respondé consultas desde cualquier lugar con la app.",
    color: "from-sky-500 to-sky-600",
  },
];

const PLANES = [
  {
    id: "starter",
    nombre: "Starter",
    precio: "Gratis",
    precioAnual: "Gratis",
    descripcion: "Ideal para comenzar y probar la plataforma",
    popular: false,
    features: [
      "Perfil básico",
      "Hasta 10 reservas/mes",
      "Agenda online",
      "Notificaciones por email",
      "Soporte por email",
    ],
    limitaciones: [
      "Sin badge verificado",
      "Sin estadísticas",
      "Sin posicionamiento destacado",
    ],
    cta: "Comenzar gratis",
    ctaVariant: "outline" as const,
  },
  {
    id: "profesional",
    nombre: "Profesional",
    precio: "$29.900",
    precioAnual: "$24.900",
    periodo: "/mes",
    descripcion: "Todo lo que necesitás para crecer",
    popular: true,
    features: [
      "Perfil completo y verificado",
      "Reservas ilimitadas",
      "Agenda avanzada con sync",
      "Notificaciones WhatsApp + email",
      "Chat con clientes",
      "Estadísticas completas",
      "Posicionamiento prioritario",
      "Soporte prioritario",
    ],
    limitaciones: [],
    cta: "Empezar prueba gratis",
    ctaVariant: "accent" as const,
  },
  {
    id: "estudio",
    nombre: "Estudio",
    precio: "$49.900",
    precioAnual: "$41.900",
    periodo: "/mes",
    descripcion: "Para estudios con múltiples escribanos",
    popular: false,
    features: [
      "Todo lo de Profesional",
      "Hasta 5 escribanos",
      "Gestión centralizada",
      "Reportes por escribano",
      "Marca personalizada",
      "API de integración",
      "Account manager dedicado",
      "Onboarding personalizado",
    ],
    limitaciones: [],
    cta: "Contactar ventas",
    ctaVariant: "secondary" as const,
  },
];

const TESTIMONIOS = [
  {
    nombre: "María Laura González",
    cargo: "Escribana - Villa María",
    foto: null,
    texto: "Desde que me uní a EscribanosARG, mis consultas aumentaron un 200%. La agenda online me ahorra horas de trabajo administrativo.",
    rating: 5,
    metricas: { consultas: "+200%", tiempo: "-5hs/semana" },
  },
  {
    nombre: "Carlos Rodríguez",
    cargo: "Escribano - Córdoba Capital",
    foto: null,
    texto: "La plataforma es muy profesional. Mis clientes valoran poder agendar turnos online y ver mis servicios y precios de forma transparente.",
    rating: 5,
    metricas: { consultas: "+150%", conversión: "85%" },
  },
  {
    nombre: "Ana Martínez",
    cargo: "Estudio Notarial - Rosario",
    foto: null,
    texto: "Gestionamos 3 escribanos con el plan Estudio. Las estadísticas nos ayudan a entender mejor a nuestros clientes y optimizar nuestros servicios.",
    rating: 5,
    metricas: { escribanos: 3, eficiencia: "+40%" },
  },
];

const PASOS = [
  {
    numero: "01",
    titulo: "Registrate",
    descripcion: "Creá tu cuenta en menos de 2 minutos. Solo necesitás tu matrícula y datos básicos.",
    icon: Users,
  },
  {
    numero: "02",
    titulo: "Completá tu perfil",
    descripcion: "Agregá tus servicios, precios, horarios y zona de cobertura. Subí tu foto profesional.",
    icon: BadgeCheck,
  },
  {
    numero: "03",
    titulo: "Verificación",
    descripcion: "Verificamos tu matrícula con el Colegio de Escribanos. Proceso automático en 24-48hs.",
    icon: Shield,
  },
  {
    numero: "04",
    titulo: "¡Comenzá a recibir clientes!",
    descripcion: "Tu perfil queda activo y visible. Empezá a recibir consultas y reservas.",
    icon: Zap,
  },
];

const FAQS = [
  {
    pregunta: "¿Cuánto cuesta registrarse?",
    respuesta: "El registro es 100% gratuito. Podés usar el plan Starter sin costo para probar la plataforma. Los planes pagos tienen 30 días de prueba gratis sin compromiso.",
  },
  {
    pregunta: "¿Cómo verifican mi matrícula?",
    respuesta: "Verificamos tu matrícula automáticamente con los registros públicos del Colegio de Escribanos de tu jurisdicción. El proceso toma entre 24 y 48 horas hábiles.",
  },
  {
    pregunta: "¿Puedo cancelar en cualquier momento?",
    respuesta: "Sí, podés cancelar tu suscripción en cualquier momento sin penalidades. Tu perfil seguirá activo con las funcionalidades del plan gratuito.",
  },
  {
    pregunta: "¿Cobran comisión por cada cliente?",
    respuesta: "No cobramos comisiones por transacción. Pagás una suscripción mensual fija y todos los clientes que conseguís son 100% tuyos.",
  },
  {
    pregunta: "¿Qué pasa con los clientes que ya tengo?",
    respuesta: "Podés invitar a tus clientes actuales a agendar por la plataforma. Ellos tienen una mejor experiencia y vos tenés todo centralizado.",
  },
  {
    pregunta: "¿Funciona en mi ciudad?",
    respuesta: "Actualmente operamos en Córdoba, Santa Fe, Buenos Aires y Mendoza. Estamos expandiéndonos a nuevas provincias constantemente.",
  },
];

const STATS = [
  { value: "500+", label: "Escribanos activos" },
  { value: "10,000+", label: "Consultas mensuales" },
  { value: "4.9", label: "Satisfacción promedio" },
  { value: "98%", label: "Tasa de retención" },
];

// =============================================================================
// COMPONENTES
// =============================================================================

function BeneficioCard({ beneficio, index }: { beneficio: typeof BENEFICIOS[0]; index: number }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4 }}
      className="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <beneficio.icon className="w-6 h-6 text-amber-600" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-600">{beneficio.stat}</p>
            <p className="text-xs text-slate-500">{beneficio.statLabel}</p>
          </div>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-800">{beneficio.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{beneficio.description}</p>
      </div>
    </motion.div>
  );
}

function FuncionalidadCard({ func }: { func: typeof FUNCIONALIDADES[0] }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -2 }}
      className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
    >
      <div className={cn(
        "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
        "bg-gradient-to-br",
        func.color
      )}>
        <func.icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-slate-800">{func.title}</h3>
        <p className="mt-1 text-sm text-slate-600">{func.description}</p>
      </div>
    </motion.div>
  );
}

function PlanCard({ plan, anual }: { plan: typeof PLANES[0]; anual: boolean }) {
  const precio = anual ? plan.precioAnual : plan.precio;

  return (
    <motion.div
      variants={scaleIn}
      className={cn(
        "relative rounded-2xl border-2 overflow-hidden transition-all duration-300",
        plan.popular
          ? "border-amber-400 shadow-xl shadow-amber-400/10 scale-105"
          : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
      )}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 text-center py-2 text-sm font-semibold">
          <Sparkles className="w-4 h-4 inline mr-1" />
          Más popular
        </div>
      )}

      <div className={cn("p-6", plan.popular && "pt-12")}>
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-slate-800">{plan.nombre}</h3>
          <p className="mt-1 text-sm text-slate-500">{plan.descripcion}</p>
        </div>

        {/* Precio */}
        <div className="mt-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-slate-800">{precio}</span>
            {plan.periodo && (
              <span className="text-slate-500">{plan.periodo}</span>
            )}
          </div>
          {anual && plan.precio !== "Gratis" && (
            <p className="mt-1 text-sm text-emerald-600">
              Ahorrás 2 meses al año
            </p>
          )}
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="text-slate-700">{feature}</span>
            </li>
          ))}
          {plan.limitaciones.map((limit, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">—</span>
              <span>{limit}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-8">
          <Link href={`/register?role=escribano&plan=${plan.id}`}>
            <Button variant={plan.ctaVariant} size="lg" className="w-full">
              {plan.cta}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonioCard({ testimonio }: { testimonio: typeof TESTIMONIOS[0] }) {
  const initials = testimonio.nombre.split(" ").map(n => n[0]).join("");

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col"
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-amber-200 mb-4" />

      {/* Texto */}
      <p className="text-slate-700 leading-relaxed flex-1">
        "{testimonio.texto}"
      </p>

      {/* Métricas */}
      <div className="mt-4 flex gap-4">
        {Object.entries(testimonio.metricas).map(([key, value]) => (
          <div key={key} className="text-center">
            <p className="text-lg font-bold text-amber-600">{value}</p>
            <p className="text-xs text-slate-500 capitalize">{key}</p>
          </div>
        ))}
      </div>

      {/* Author */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
        {testimonio.foto ? (
          <img src={testimonio.foto} alt={testimonio.nombre} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
            <span className="text-sm font-bold text-slate-500">{initials}</span>
          </div>
        )}
        <div>
          <p className="font-semibold text-slate-800">{testimonio.nombre}</p>
          <p className="text-sm text-slate-500">{testimonio.cargo}</p>
        </div>
        <div className="ml-auto flex">
          {[...Array(testimonio.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={fadeInUp} className="border-b border-slate-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-center gap-4 text-left"
      >
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-sm font-semibold text-amber-700">
          {index + 1}
        </span>
        <span className="flex-1 font-semibold text-slate-800">{faq.pregunta}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-12 text-slate-600 leading-relaxed">
              {faq.respuesta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-200/15 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-sky-200/10 rounded-full blur-[128px]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/10 border border-white/20"
            >
              <Award className="w-4 h-4 text-amber-300" />
              Primeros 30 días gratis
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif leading-tight"
            >
              Hacé crecer tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-300">
                estudio notarial
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg sm:text-xl text-slate-200 max-w-xl"
            >
              Unite a la plataforma líder de Argentina. Más visibilidad, más clientes, 
              menos trabajo administrativo. Sin comisiones por transacción.
            </motion.p>

            {/* Stats inline */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-amber-200">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-slate-300">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/register?role=escribano">
                <Button variant="accent" size="xl" className="w-full sm:w-auto">
                  Comenzar gratis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="xl"
                className="text-white hover:bg-white/10 border border-white/20"
                onClick={() => {
                  document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                Ver cómo funciona
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex items-center gap-6 text-sm text-slate-300"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Sin tarjeta requerida
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Cancelá cuando quieras
              </span>
            </motion.div>
          </motion.div>

          {/* Visual / Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main dashboard card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Tu Dashboard</p>
                    <p className="text-xs text-slate-500">Enero 2025</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-emerald-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-emerald-600">47</p>
                    <p className="text-xs text-emerald-700">Consultas</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-amber-600">4.9</p>
                    <p className="text-xs text-amber-700">Rating</p>
                  </div>
                  <div className="bg-sky-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-sky-600">89%</p>
                    <p className="text-xs text-sky-700">Conversión</p>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-8 top-1/3 bg-white rounded-xl shadow-lg p-4 transform -rotate-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Nueva reserva</p>
                    <p className="text-xs text-slate-500">Juan P. - Escritura</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating calendar */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-lg p-4 transform rotate-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Mañana 10:00</p>
                    <p className="text-xs text-slate-500">3 turnos confirmados</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BeneficiosSection() {
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
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
              ¿Por qué elegirnos?
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-800">
              Todo lo que necesitás para crecer
            </h2>
            <p className="mt-4 text-slate-600">
              Herramientas diseñadas específicamente para escribanos argentinos
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {BENEFICIOS.map((beneficio, i) => (
              <BeneficioCard key={beneficio.title} beneficio={beneficio} index={i} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FuncionalidadesSection() {
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-800">
              Funcionalidades que simplifican tu trabajo
            </h2>
            <p className="mt-4 text-slate-600">
              Automatizá tareas administrativas y enfocate en lo que mejor sabés hacer
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {FUNCIONALIDADES.map((func) => (
              <FuncionalidadCard key={func.title} func={func} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ComoFuncionaSection() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-[#faf9f7] scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              Proceso simple
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-800">
              Empezá en 4 simples pasos
            </h2>
            <p className="mt-4 text-slate-600">
              En menos de 48 horas podés estar recibiendo tus primeros clientes
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {PASOS.map((paso, index) => (
              <motion.div key={paso.numero} variants={fadeInUp} className="relative">
                {/* Línea conectora */}
                {index < PASOS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-amber-400 to-amber-300" />
                )}

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border-2 border-amber-300 shadow-md flex items-center justify-center">
                    <paso.icon className="w-7 h-7 text-amber-700" />
                  </div>
                  <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                    Paso {paso.numero}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-800">{paso.titulo}</h3>
                  <p className="mt-2 text-sm text-slate-600">{paso.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <Link href="/register?role=escribano">
              <Button variant="accent" size="lg">
                Comenzar ahora
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PreciosSection() {
  const [anual, setAnual] = useState(true);

  return (
    <section id="precios" className="py-20 sm:py-28 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Precios transparentes
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-800">
              Elegí el plan que mejor se adapte
            </h2>
            <p className="mt-4 text-slate-600">
              Sin comisiones ocultas. Cancelá cuando quieras.
            </p>

            {/* Toggle mensual/anual */}
            <div className="mt-8 inline-flex items-center gap-3 bg-slate-100 rounded-full p-1">
              <button
                onClick={() => setAnual(false)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  !anual
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-800"
                )}
              >
                Mensual
              </button>
              <button
                onClick={() => setAnual(true)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                  anual
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-600 hover:text-slate-800"
                )}
              >
                Anual
                <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700">
                  -17%
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start"
          >
            {PLANES.map((plan) => (
              <PlanCard key={plan.id} plan={plan} anual={anual} />
            ))}
          </motion.div>

          {/* Garantía */}
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-50 border border-emerald-200">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="text-sm text-emerald-800">
                <strong>Garantía de satisfacción:</strong> 30 días de prueba gratis, sin compromiso
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimoniosSection() {
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
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
              Testimonios
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-800">
              Lo que dicen nuestros escribanos
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {TESTIMONIOS.map((testimonio, i) => (
              <TestimonioCard key={i} testimonio={testimonio} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-800">
              Preguntas frecuentes
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 bg-[#faf9f7] rounded-2xl border border-slate-200 overflow-hidden"
          >
            {FAQS.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 text-center">
            <p className="text-slate-600">
              ¿Tenés más preguntas?{" "}
              <Link href="/contacto" className="text-amber-600 font-medium hover:underline">
                Contactanos
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CTAFinalSection() {
  return (
    <section className="py-20 sm:py-28 bg-slate-800 text-white relative overflow-hidden">
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
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/10 border border-white/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Unite hoy y comenzá gratis
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif"
          >
            ¿Listo para hacer crecer tu estudio?
          </motion.h2>

          <motion.p variants={fadeInUp} className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
            Más de 500 escribanos ya confían en nosotros. 
            Registrate gratis y empezá a recibir clientes en menos de 48 horas.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register?role=escribano">
              <Button variant="accent" size="xl">
                Crear mi perfil gratis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button variant="ghost" size="xl" className="text-white hover:bg-white/10 border border-white/20">
                <HeadphonesIcon className="w-5 h-5 mr-2" />
                Hablar con un asesor
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              30 días gratis
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Cancelá cuando quieras
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// =============================================================================
// PÁGINA PRINCIPAL
// =============================================================================

export default function ParaEscribanosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HeroSection />
        <BeneficiosSection />
        <FuncionalidadesSection />
        <ComoFuncionaSection />
        <PreciosSection />
        <TestimoniosSection />
        <FAQSection />
        <CTAFinalSection />
      </main>

      <Footer />
    </div>
  );
}