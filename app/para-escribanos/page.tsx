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
// ANIMACIONES PROFESIONALES
// =============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.3,
      ease: "easeOut" as const
    } 
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.2 } 
  },
};

// =============================================================================
// FUNCIÓN HELPER PARA FORMATEAR PRECIOS
// =============================================================================

function formatPrice(pesos: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pesos);
}

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
    iconColor: "text-primary-700",
    iconBg: "bg-primary-100",
  },
  {
    icon: Calendar,
    title: "Agenda online",
    description: "Calendario sincronizable con Google Calendar. Bloqueo de horarios y recordatorios automáticos.",
    iconColor: "text-blue-700",
    iconBg: "bg-blue-100",
  },
  {
    icon: MessageSquare,
    title: "Chat integrado",
    description: "Comunicación directa con clientes. Respuestas rápidas y seguimiento de consultas.",
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Bell,
    title: "Notificaciones",
    description: "Alertas de nuevas reservas, mensajes y recordatorios por email, WhatsApp y app.",
    iconColor: "text-amber-700",
    iconBg: "bg-amber-100",
  },
  {
    icon: BarChart3,
    title: "Estadísticas",
    description: "Dashboard con métricas de visitas, conversión, calificaciones y rendimiento.",
    iconColor: "text-rose-700",
    iconBg: "bg-rose-100",
  },
  {
    icon: Smartphone,
    title: "App móvil",
    description: "Gestioná tu agenda y respondé consultas desde cualquier lugar con la app.",
    iconColor: "text-sky-700",
    iconBg: "bg-sky-100",
  },
];

const PLANES = [
  {
    id: "BASICO",
    nombre: "Básico",
    precio: 29900,
    precioAnual: 299000,
    descripcion: "Perfecto para empezar",
    popular: false,
    features: [
      "Perfil profesional completo",
      "Hasta 50 consultas/mes",
      "Agenda online integrada",
      "WhatsApp automático",
      "Notificaciones por email",
      "Estadísticas básicas",
    ],
    cta: "Comenzar con Básico",
  },
  {
    id: "NOTARIO",
    nombre: "Notario",
    precio: 59900,
    precioAnual: 599000,
    descripcion: "Máxima visibilidad",
    popular: true,
    features: [
      "Todo del Básico",
      "Consultas ilimitadas",
      "Posicionamiento destacado",
      "Badge verificado premium",
      "Videoconferencia integrada",
      "Estadísticas avanzadas",
      "Chat en vivo con clientes",
      "Sin comisión por reserva",
    ],
    cta: "Empezar con Notario",
  },
  {
    id: "NOTARIO_PRO",
    nombre: "Notario Pro",
    precio: 99900,
    precioAnual: 999000,
    descripcion: "Para estudios jurídicos",
    popular: false,
    features: [
      "Todo del Notario",
      "Hasta 5 escribanos",
      "Gestión centralizada",
      "Branding personalizado",
      "Subdominio propio",
      "Account manager dedicado",
      "Prioridad en soporte",
      "API de integración",
    ],
    cta: "Contactar ventas",
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
    respuesta: "El registro es 100% gratuito. Tenés 15 días de prueba gratis en cualquier plan sin necesidad de ingresar tarjeta de crédito.",
  },
  {
    pregunta: "¿Cómo verifican mi matrícula?",
    respuesta: "Verificamos tu matrícula automáticamente con los registros públicos del Colegio de Escribanos de tu jurisdicción. El proceso toma entre 24 y 48 horas hábiles.",
  },
  {
    pregunta: "¿Puedo cancelar en cualquier momento?",
    respuesta: "Sí, podés cancelar tu suscripción en cualquier momento sin penalidades ni cargos adicionales.",
  },
  {
    pregunta: "¿Cobran comisión por cada cliente?",
    respuesta: "No cobramos comisiones por transacción. Pagás una suscripción mensual o anual fija y todos los clientes que conseguís son 100% tuyos.",
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
      className="relative bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <beneficio.icon className="w-6 h-6 text-primary-700" strokeWidth={2.5} />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-700 tracking-tight">{beneficio.stat}</p>
            <p className="text-xs text-gray-600 font-medium mt-0.5">{beneficio.statLabel}</p>
          </div>
        </div>
        <h3 className="mt-5 text-lg font-semibold text-gray-900 tracking-tight">{beneficio.title}</h3>
        <p className="mt-2 text-[15px] text-gray-600 font-medium leading-relaxed">{beneficio.description}</p>
      </div>
    </motion.div>
  );
}

function FuncionalidadCard({ func }: { func: typeof FUNCIONALIDADES[0] }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-200"
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
        func.iconBg
      )}>
        <func.icon className={cn("w-6 h-6", func.iconColor)} strokeWidth={2.5} />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 tracking-tight">{func.title}</h3>
        <p className="mt-1.5 text-[15px] text-gray-600 font-medium leading-relaxed">{func.description}</p>
      </div>
    </motion.div>
  );
}

function PlanCard({ plan, anual }: { plan: typeof PLANES[0]; anual: boolean }) {
  const precio = anual ? plan.precioAnual : plan.precio;
  const precioMensual = anual ? Math.round(plan.precioAnual / 12) : plan.precio;
  
  const ahorroAnual = (plan.precio * 12) - plan.precioAnual;
  const porcentajeAhorro = Math.round((ahorroAnual / (plan.precio * 12)) * 100);

  return (
    <motion.div
      variants={scaleIn}
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-200",
        plan.popular
          ? "border-2 border-primary-700 shadow-lg shadow-primary-900/10 scale-105"
          : "border border-gray-200/60 bg-white hover:border-gray-300 hover:shadow-md"
      )}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 left-0 right-0 bg-primary-900 text-white text-center py-2.5 text-sm font-semibold">
          <Sparkles className="w-4 h-4 inline mr-1.5" strokeWidth={2.5} />
          Más elegido
        </div>
      )}

      <div className={cn("p-6", plan.popular && "pt-14")}>
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">{plan.nombre}</h3>
          <p className="mt-1.5 text-sm text-gray-600 font-medium">{plan.descripcion}</p>
        </div>

        {/* Precio */}
        <div className="mt-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">
              {formatPrice(precioMensual)}
            </span>
            <span className="text-gray-600 font-medium">/mes</span>
          </div>
          {anual && (
            <div className="mt-2.5 space-y-1">
              <p className="text-sm text-success font-semibold">
                Ahorrás {formatPrice(ahorroAnual)} al año (-{porcentajeAhorro}%)
              </p>
              <p className="text-xs text-gray-600 font-medium">
                Facturado anualmente: {formatPrice(precio)}
              </p>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" strokeWidth={2.5} />
              <span className="text-gray-700 font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Trial badge */}
        <div className="mt-6 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200/60 text-center">
          <p className="text-sm text-blue-900 font-semibold">
            15 días gratis · Sin tarjeta requerida
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link href={`/register?role=escribano&plan=${plan.id}`}>
            <Button 
              size="lg" 
              className={cn(
                "w-full font-semibold shadow-md h-12",
                plan.popular 
                  ? "bg-primary-900 hover:bg-primary-800 text-white border border-primary-800/20 hover:shadow-lg hover:shadow-primary-900/20"
                  : "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 hover:border-gray-400"
              )}
            >
              {plan.cta}
              <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2.5} />
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
      className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 h-full flex flex-col hover:shadow-md transition-shadow"
    >
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-primary-200 mb-4" strokeWidth={2} />

      {/* Texto */}
      <p className="text-[15px] text-gray-700 leading-relaxed flex-1 font-medium">
        "{testimonio.texto}"
      </p>

      {/* Métricas */}
      <div className="mt-5 flex gap-4">
        {Object.entries(testimonio.metricas).map(([key, value]) => (
          <div key={key} className="text-center">
            <p className="text-lg font-bold text-primary-700">{value}</p>
            <p className="text-xs text-gray-600 capitalize font-medium">{key}</p>
          </div>
        ))}
      </div>

      {/* Author */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
        {testimonio.foto ? (
          <img src={testimonio.foto} alt={testimonio.nombre} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center border border-primary-300">
            <span className="text-sm font-bold text-primary-900">{initials}</span>
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900 tracking-tight">{testimonio.nombre}</p>
          <p className="text-sm text-gray-600 font-medium">{testimonio.cargo}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(testimonio.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" strokeWidth={1.5} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={fadeInUp} className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 px-2 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
      >
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-sm font-semibold text-primary-900">
          {index + 1}
        </span>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 pr-8 tracking-tight">{faq.pregunta}</h3>
          <AnimatePresence>
            {open && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 text-[15px] text-gray-600 leading-relaxed font-medium"
              >
                {faq.respuesta}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <motion.div 
          animate={{ rotate: open ? 180 : 0 }} 
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" strokeWidth={2} />
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
    <section className="relative bg-white border-b border-gray-200/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary-50 border border-primary-200/60 text-primary-900"
            >
              <Award className="w-4 h-4 text-primary-700" strokeWidth={2.5} />
              Primeros 15 días gratis
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight leading-tight"
            >
              Hacé crecer tu estudio notarial
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg sm:text-xl text-gray-600 font-medium max-w-xl"
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
                  <p className="text-2xl sm:text-3xl font-bold text-primary-700 tracking-tight">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/register?role=escribano">
                <Button 
                  size="lg"
                  className={cn(
                    "w-full sm:w-auto font-semibold shadow-md",
                    "bg-primary-900 hover:bg-primary-800 text-white",
                    "border border-primary-800/20",
                    "hover:shadow-lg hover:shadow-primary-900/20"
                  )}
                >
                  Comenzar gratis
                  <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto font-semibold border-gray-300"
                onClick={() => {
                  document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Play className="w-5 h-5 mr-2" strokeWidth={2.5} />
                Ver cómo funciona
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" strokeWidth={2.5} />
                Sin tarjeta requerida
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" strokeWidth={2.5} />
                Cancelá cuando quieras
              </span>
            </motion.div>
          </motion.div>

          {/* Visual / Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main dashboard card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200/60 p-6 transform rotate-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary-700" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 tracking-tight">Tu Dashboard</p>
                    <p className="text-xs text-gray-600 font-medium">Enero 2025</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-emerald-50 rounded-xl p-3 text-center border border-emerald-200/60">
                    <p className="text-2xl font-bold text-emerald-700 tracking-tight">47</p>
                    <p className="text-xs text-emerald-700 font-medium">Consultas</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-200/60">
                    <p className="text-2xl font-bold text-amber-700 tracking-tight">4.9</p>
                    <p className="text-xs text-amber-700 font-medium">Rating</p>
                  </div>
                  <div className="bg-sky-50 rounded-xl p-3 text-center border border-sky-200/60">
                    <p className="text-2xl font-bold text-sky-700 tracking-tight">89%</p>
                    <p className="text-xs text-sky-700 font-medium">Conversión</p>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-8 top-1/3 bg-white rounded-xl shadow-lg border border-gray-200/60 p-4 transform -rotate-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 tracking-tight">Nueva reserva</p>
                    <p className="text-xs text-gray-600 font-medium">Juan P. - Escritura</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating calendar */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-lg border border-gray-200/60 p-4 transform rotate-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 tracking-tight">Mañana 10:00</p>
                    <p className="text-xs text-gray-600 font-medium">3 turnos confirmados</p>
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
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-900 border border-primary-200/60">
              ¿Por qué elegirnos?
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Todo lo que necesitás para crecer
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-medium">
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
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Funcionalidades que simplifican tu trabajo
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-medium">
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
    <section id="como-funciona" className="py-16 sm:py-20 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200/60">
              Proceso simple
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Empezá en 4 simples pasos
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-medium">
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
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary-400 to-primary-300" />
                )}

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-100 border-2 border-primary-300 shadow-sm flex items-center justify-center">
                    <paso.icon className="w-7 h-7 text-primary-700" strokeWidth={2.5} />
                  </div>
                  <span className="inline-block mt-4 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                    Paso {paso.numero}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-gray-900 tracking-tight">{paso.titulo}</h3>
                  <p className="mt-2 text-[15px] text-gray-600 font-medium">{paso.descripcion}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <Link href="/register?role=escribano">
              <Button 
                size="lg"
                className={cn(
                  "font-semibold shadow-md",
                  "bg-primary-900 hover:bg-primary-800 text-white",
                  "border border-primary-800/20",
                  "hover:shadow-lg hover:shadow-primary-900/20"
                )}
              >
                Comenzar ahora
                <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PreciosSection() {
  const [anual, setAnual] = useState(false);

  return (
    <section id="precios" className="py-16 sm:py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200/60">
              Precios transparentes
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Elegí el plan que mejor se adapte
            </h2>
            <p className="mt-4 text-lg text-gray-600 font-medium">
              Sin comisiones ocultas. Cancelá cuando quieras. 15 días de prueba gratis.
            </p>

            {/* Toggle mensual/anual */}
            <div className="mt-8 inline-flex items-center gap-3 bg-gray-100 rounded-full p-1 border border-gray-200">
              <button
                onClick={() => setAnual(false)}
                className={cn(
                  "px-4 py-2.5 rounded-full text-sm font-semibold transition-all",
                  !anual
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Mensual
              </button>
              <button
                onClick={() => setAnual(true)}
                className={cn(
                  "px-4 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2",
                  anual
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                Anual
                <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700 font-bold">
                  -16%
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-12 grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start"
          >
            {PLANES.map((plan) => (
              <PlanCard key={plan.id} plan={plan} anual={anual} />
            ))}
          </motion.div>

          {/* Garantía */}
          <motion.div variants={fadeInUp} className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-50 border border-emerald-200/60">
              <Shield className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
              <span className="text-sm text-emerald-900 font-medium">
                <strong>Garantía de satisfacción:</strong> 15 días de prueba gratis, sin compromiso
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
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/60">
              Testimonios
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
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
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Preguntas Frecuentes
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="mt-10 bg-gray-50 rounded-2xl border border-gray-200/60 overflow-hidden shadow-sm"
          >
            <div className="divide-y divide-gray-200">
              {FAQS.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 text-center">
            <p className="text-gray-600 font-medium">
              ¿Tenés más preguntas?{" "}
              <Link href="/contacto" className="text-primary-700 font-semibold hover:underline">
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
    <section className="py-16 sm:py-20 bg-white border-t border-gray-200/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-primary-50 border border-primary-200/60 text-primary-900 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary-700" strokeWidth={2.5} />
            Unite hoy y comenzá gratis
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight"
          >
            ¿Listo para hacer crecer tu estudio?
          </motion.h2>

          <motion.p variants={fadeInUp} className="mt-5 text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Más de 500 escribanos ya confían en nosotros. 
            Registrate gratis y empezá a recibir clientes en menos de 48 horas.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/register?role=escribano">
              <Button 
                size="lg"
                className={cn(
                  "w-full sm:w-auto font-semibold shadow-md",
                  "bg-primary-900 hover:bg-primary-800 text-white",
                  "border border-primary-800/20",
                  "hover:shadow-lg hover:shadow-primary-900/20"
                )}
              >
                Crear mi perfil gratis
                <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
              </Button>
            </Link>
            <Link href="/contacto">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto font-semibold border-gray-300"
              >
                <HeadphonesIcon className="w-5 h-5 mr-2" strokeWidth={2.5} />
                Hablar con un asesor
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 font-medium"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" strokeWidth={2.5} />
              Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" strokeWidth={2.5} />
              15 días gratis
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-success" strokeWidth={2.5} />
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