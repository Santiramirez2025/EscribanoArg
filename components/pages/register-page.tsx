"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Loader2,
  Scale,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Briefcase,
  FileText,
  Shield,
  Building2,
  Sparkles,
  Users,
  Calendar,
  Award,
  TrendingUp,
  BarChart3,
} from "lucide-react";
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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

// =============================================================================
// TIPOS
// =============================================================================

type Role = "CLIENTE" | "ESCRIBANO";
type Step = 1 | 2 | 3;

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  matricula: string;
  colegioEscribanos: string;
  provincia: string;
  localidad: string;
  direccion: string;
  plan: string;
}

// =============================================================================
// VALIDACIÓN
// =============================================================================

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

const validatePhone = (phone: string): boolean => {
  if (!phone) return true;
  const phoneRegex = /^[\d\s\-+()]{8,20}$/;
  return phoneRegex.test(phone);
};

// =============================================================================
// FUNCIÓN HELPER PARA FORMATEAR PRECIOS
// =============================================================================

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// =============================================================================
// DATOS
// =============================================================================

const PROVINCIAS = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

const PLANES_ESCRIBANOS = [
  {
    id: "BASICO",
    nombre: "Básico",
    precio: 29900,
    precioAnual: 299000,
    descripcion: "Perfecto para empezar",
    features: [
      "Perfil profesional completo",
      "Hasta 50 consultas/mes",
      "Agenda online integrada",
      "WhatsApp automático",
      "Notificaciones por email",
      "Estadísticas básicas",
    ],
    popular: false,
  },
  {
    id: "NOTARIO",
    nombre: "Notario",
    precio: 59900,
    precioAnual: 599000,
    descripcion: "Máxima visibilidad",
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
    popular: true,
    badge: "Más elegido",
  },
  {
    id: "NOTARIO_PRO",
    nombre: "Estudio",
    precio: 99900,
    precioAnual: 999000,
    descripcion: "Para estudios jurídicos",
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
    popular: false,
    badge: "Mejor valor",
  },
];

// =============================================================================
// COMPONENTES UI PROFESIONALES
// =============================================================================

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3 group">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-sm border border-primary-600/20">
        <Scale className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-gray-900 tracking-tight">
          EscribanosARG
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
          Escribanía Digital
        </span>
      </div>
    </Link>
  );
}

function Input({
  icon: Icon,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ElementType;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        {Icon && (
          <Icon
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors",
              error ? "text-rose-400" : "text-gray-400"
            )}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
        <input
          className={cn(
            "w-full rounded-xl border bg-white",
            "py-3.5 pr-4 text-gray-900 placeholder:text-gray-500 font-medium text-[15px]",
            "focus:outline-none focus:ring-2 focus:ring-primary-700/20",
            "transition-all duration-150",
            Icon ? "pl-12" : "pl-4",
            error
              ? "border-rose-300 focus:border-rose-500"
              : "border-gray-300 focus:border-primary-700",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-rose-600 flex items-center gap-1 font-medium">
          <AlertCircle className="w-4 h-4" strokeWidth={2.5} />
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  icon: Icon,
  error,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  icon?: React.ElementType;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        {Icon && (
          <Icon
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors pointer-events-none",
              error ? "text-rose-400" : "text-gray-400"
            )}
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
        <select
          className={cn(
            "w-full rounded-xl border bg-white appearance-none",
            "py-3.5 pr-10 text-gray-900 font-medium text-[15px]",
            "focus:outline-none focus:ring-2 focus:ring-primary-700/20",
            "transition-all duration-150",
            Icon ? "pl-12" : "pl-4",
            error
              ? "border-rose-300 focus:border-rose-500"
              : "border-gray-300 focus:border-primary-700",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-rose-600 flex items-center gap-1 font-medium">
          <AlertCircle className="w-4 h-4" strokeWidth={2.5} />
          {error}
        </p>
      )}
    </div>
  );
}

function StepIndicator({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
              step === currentStep
                ? "bg-primary-700 text-white shadow-md"
                : step < currentStep
                ? "bg-success text-white"
                : "bg-gray-200 text-gray-400"
            )}
          >
            {step < currentStep ? <CheckCircle2 className="w-5 h-5" strokeWidth={2.5} /> : step}
          </div>
          {step < totalSteps && (
            <div
              className={cn(
                "w-12 h-1 mx-1 rounded-full transition-all",
                step < currentStep ? "bg-success" : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function RoleSelector({
  role,
  onChange,
}: {
  role: Role;
  onChange: (role: Role) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => onChange("CLIENTE")}
        className={cn(
          "relative p-5 rounded-xl border-2 text-left transition-all",
          role === "CLIENTE"
            ? "border-primary-700 bg-primary-50 shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300"
        )}
      >
        {role === "CLIENTE" && (
          <div className="absolute top-4 right-4">
            <CheckCircle2 className="w-5 h-5 text-primary-700" strokeWidth={2.5} />
          </div>
        )}
        <Users
          className={cn(
            "w-8 h-8 mb-3",
            role === "CLIENTE" ? "text-primary-700" : "text-gray-400"
          )}
          strokeWidth={2.5}
        />
        <p className="font-semibold text-gray-900 tracking-tight">Soy Cliente</p>
        <p className="text-sm text-gray-600 mt-1 font-medium">Busco un escribano</p>
      </button>

      <button
        type="button"
        onClick={() => onChange("ESCRIBANO")}
        className={cn(
          "relative p-5 rounded-xl border-2 text-left transition-all",
          role === "ESCRIBANO"
            ? "border-primary-700 bg-primary-50 shadow-md"
            : "border-gray-200 bg-white hover:border-gray-300"
        )}
      >
        {role === "ESCRIBANO" && (
          <div className="absolute top-4 right-4">
            <CheckCircle2 className="w-5 h-5 text-primary-700" strokeWidth={2.5} />
          </div>
        )}
        <Briefcase
          className={cn(
            "w-8 h-8 mb-3",
            role === "ESCRIBANO" ? "text-primary-700" : "text-gray-400"
          )}
          strokeWidth={2.5}
        />
        <p className="font-semibold text-gray-900 tracking-tight">Soy Escribano</p>
        <p className="text-sm text-gray-600 mt-1 font-medium">
          Quiero ofrecer mis servicios
        </p>
      </button>
    </div>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: (typeof PLANES_ESCRIBANOS)[0];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "relative p-6 rounded-xl border-2 text-left transition-all w-full",
        selected
          ? "border-primary-700 bg-primary-50 shadow-lg"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md",
        plan.popular && !selected && "ring-2 ring-primary-700 ring-offset-2"
      )}
    >
      {(plan.popular || plan.badge) && (
        <span className="absolute -top-3 left-4 px-3 py-1 bg-primary-900 text-white text-xs font-semibold rounded-full">
          {plan.badge || "Más popular"}
        </span>
      )}
      {selected && (
        <div className="absolute top-4 right-4">
          <CheckCircle2 className="w-5 h-5 text-primary-700" strokeWidth={2.5} />
        </div>
      )}
      <div className="pr-8">
        <p className="font-bold text-gray-900 text-lg tracking-tight">{plan.nombre}</p>
        <p className="text-2xl font-bold text-primary-700 mt-2 tracking-tight">
          {formatPrice(plan.precio)}
        </p>
        <p className="text-sm text-gray-600 mt-1.5 font-medium">{plan.descripcion}</p>
        <ul className="mt-4 space-y-2.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="text-sm text-gray-700 flex items-start gap-2.5 font-medium"
            >
              <CheckCircle2 className="w-4.5 h-4.5 text-success flex-shrink-0 mt-0.5" strokeWidth={2.5} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

// =============================================================================
// PASOS DEL FORMULARIO
// =============================================================================

function Step1({
  form,
  setForm,
  role,
  setRole,
  errors,
  showPassword,
  setShowPassword,
}: {
  form: FormData;
  setForm: (form: FormData) => void;
  role: Role;
  setRole: (role: Role) => void;
  errors: Record<string, string>;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Crear cuenta
        </h2>
        <p className="mt-2 text-gray-600 font-medium">
          Completá tus datos para registrarte
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-semibold text-gray-900 mb-3 tracking-tight">
          ¿Qué tipo de cuenta querés crear?
        </label>
        <RoleSelector role={role} onChange={setRole} />
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Nombre completo
        </label>
        <Input
          id="name"
          type="text"
          icon={User}
          placeholder="Juan Pérez"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          required
          autoComplete="name"
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          icon={Mail}
          placeholder="tu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          required
          autoComplete="email"
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Teléfono <span className="text-gray-500 font-medium">(opcional)</span>
        </label>
        <Input
          id="phone"
          type="tel"
          icon={Phone}
          placeholder="+54 9 351 123-4567"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={errors.phone}
          autoComplete="tel"
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Contraseña
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            icon={Lock}
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            required
            minLength={6}
            className="pr-12"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Eye className="w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Confirmar contraseña
        </label>
        <Input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          icon={Lock}
          placeholder="Repetí tu contraseña"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
          required
          autoComplete="new-password"
        />
      </motion.div>
    </motion.div>
  );
}

function Step2({
  form,
  setForm,
  errors,
}: {
  form: FormData;
  setForm: (form: FormData) => void;
  errors: Record<string, string>;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Datos profesionales
        </h2>
        <p className="mt-2 text-gray-600 font-medium">
          Información para verificar tu matrícula
        </p>
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="matricula"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Número de matrícula
        </label>
        <Input
          id="matricula"
          type="text"
          icon={FileText}
          placeholder="Ej: T-1234 o MAT-5678"
          value={form.matricula}
          onChange={(e) => setForm({ ...form, matricula: e.target.value })}
          error={errors.matricula}
          required
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="colegio"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Colegio de Escribanos
        </label>
        <Input
          id="colegio"
          type="text"
          icon={Building2}
          placeholder="Colegio de Escribanos de Córdoba"
          value={form.colegioEscribanos}
          onChange={(e) =>
            setForm({ ...form, colegioEscribanos: e.target.value })
          }
          error={errors.colegioEscribanos}
          required
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="provincia"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Provincia
        </label>
        <Select
          id="provincia"
          icon={MapPin}
          value={form.provincia}
          onChange={(e) => setForm({ ...form, provincia: e.target.value })}
          error={errors.provincia}
          required
        >
          <option value="">Seleccioná una provincia</option>
          {PROVINCIAS.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </Select>
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="localidad"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Localidad
        </label>
        <Input
          id="localidad"
          type="text"
          icon={MapPin}
          placeholder="Villa María"
          value={form.localidad}
          onChange={(e) => setForm({ ...form, localidad: e.target.value })}
          error={errors.localidad}
          required
        />
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-2">
        <label
          htmlFor="direccion"
          className="block text-sm font-semibold text-gray-900 tracking-tight"
        >
          Dirección del estudio
        </label>
        <Input
          id="direccion"
          type="text"
          icon={Building2}
          placeholder="Av. San Martín 123, Piso 2, Of. 4"
          value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          error={errors.direccion}
          required
        />
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="p-4 rounded-xl bg-blue-50 border border-blue-200/60"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
          <div>
            <p className="font-semibold text-blue-900 tracking-tight">
              Verificación de matrícula
            </p>
            <p className="text-sm text-blue-700 mt-1.5 font-medium leading-relaxed">
              Verificaremos tu matrícula con el Colegio de Escribanos en 24-48hs.
              Recibirás un email cuando tu cuenta esté verificada.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Step3({
  form,
  setForm,
  billingCycle,
  setBillingCycle,
}: {
  form: FormData;
  setForm: (form: FormData) => void;
  billingCycle: "MONTHLY" | "ANNUAL";
  setBillingCycle: (cycle: "MONTHLY" | "ANNUAL") => void;
}) {
  const selectedPlan = PLANES_ESCRIBANOS.find((p) => p.id === form.plan);
  const precio =
    billingCycle === "MONTHLY"
      ? selectedPlan?.precio
      : selectedPlan?.precioAnual;

  const ahorroAnual = selectedPlan 
    ? (selectedPlan.precio * 12) - selectedPlan.precioAnual 
    : 0;
  const porcentajeAhorro = selectedPlan
    ? Math.round((ahorroAnual / (selectedPlan.precio * 12)) * 100)
    : 16;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Elegí tu plan
        </h2>
        <p className="mt-2 text-gray-600 font-medium">
          15 días de prueba, luego se cobra automáticamente
        </p>
      </motion.div>

      {/* Toggle Mensual/Anual */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center justify-center gap-3 p-1 bg-gray-100 rounded-xl border border-gray-200">
          <button
            type="button"
            onClick={() => setBillingCycle("MONTHLY")}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all text-sm",
              billingCycle === "MONTHLY"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-600"
            )}
          >
            Mensual
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle("ANNUAL")}
            className={cn(
              "flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all relative text-sm",
              billingCycle === "ANNUAL"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-600"
            )}
          >
            Anual
            <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-success text-white text-xs font-bold rounded-full">
              -{porcentajeAhorro}%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Planes */}
      <motion.div variants={fadeInUp} className="space-y-3">
        {PLANES_ESCRIBANOS.map((plan) => {
          const displayPlan = billingCycle === 'ANNUAL' 
            ? {
                ...plan,
                precio: plan.precioAnual,
                descripcion: `${formatPrice(Math.round(plan.precioAnual / 12))}/mes (facturado anualmente)`
              }
            : plan;

          return (
            <PlanCard
              key={plan.id}
              plan={displayPlan}
              selected={form.plan === plan.id}
              onSelect={() => setForm({ ...form, plan: plan.id })}
            />
          );
        })}
      </motion.div>

      {/* Trial info */}
      <motion.div
        variants={fadeInUp}
        className="p-4 rounded-xl bg-primary-50 border border-primary-200/60"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
          <div>
            <p className="font-semibold text-primary-900 tracking-tight">15 días de prueba gratis</p>
            <p className="text-sm text-primary-800 mt-1.5 font-medium leading-relaxed">
              Ingresá tu tarjeta ahora,{" "}
              <strong>no se cobra nada hasta el día 16</strong>. Cancelá cuando
              quieras sin penalidades.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Resumen de pago */}
      {selectedPlan && (
        <motion.div
          variants={fadeInUp}
          className="p-5 rounded-xl bg-gray-50 border border-gray-200/60"
        >
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Plan seleccionado</span>
              <span className="font-semibold text-gray-900">
                {selectedPlan.nombre}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Período de facturación</span>
              <span className="font-semibold text-gray-900">
                {billingCycle === "MONTHLY" ? "Mensual" : "Anual"}
              </span>
            </div>
            {billingCycle === "ANNUAL" && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-success font-medium">Descuento anual</span>
                  <span className="font-semibold text-success">
                    -{porcentajeAhorro}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-success font-medium">Ahorrás</span>
                  <span className="font-semibold text-success">
                    {formatPrice(ahorroAnual)}
                  </span>
                </div>
              </>
            )}
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="font-semibold text-gray-700">Hoy pagas</span>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">$0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">
                A partir del{" "}
                {new Date(
                  Date.now() + 15 * 24 * 60 * 60 * 1000
                ).toLocaleDateString("es-AR")}
              </span>
              <span className="font-semibold text-gray-900">
                {formatPrice(precio!)}/{billingCycle === "MONTHLY" ? "mes" : "año"}
              </span>
            </div>
            {billingCycle === "ANNUAL" && (
              <div className="pt-2 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-600 font-medium">
                  Equivalente a {formatPrice(Math.round(precio! / 12))}/mes
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// =============================================================================
// COMPONENTE INTERNO CON SEARCHPARAMS
// =============================================================================

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole =
    searchParams.get("role") === "escribano" ? "ESCRIBANO" : "CLIENTE";
  const defaultPlan = searchParams.get("plan") || "NOTARIO";

  const [role, setRole] = useState<Role>(defaultRole);
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "ANNUAL">(
    "MONTHLY"
  );

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    matricula: "",
    colegioEscribanos: "",
    provincia: "",
    localidad: "",
    direccion: "",
    plan: defaultPlan,
  });

  const totalSteps = role === "ESCRIBANO" ? 3 : 1;

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!form.name.trim()) {
        newErrors.name = "El nombre es requerido";
      } else if (form.name.trim().length < 3) {
        newErrors.name = "El nombre debe tener al menos 3 caracteres";
      }

      if (!form.email.trim()) {
        newErrors.email = "El email es requerido";
      } else if (!validateEmail(form.email)) {
        newErrors.email = "Email inválido";
      }

      if (form.phone && !validatePhone(form.phone)) {
        newErrors.phone = "Teléfono inválido";
      }

      if (!form.password) {
        newErrors.password = "La contraseña es requerida";
      } else if (!validatePassword(form.password)) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      }

      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    if (step === 2 && role === "ESCRIBANO") {
      if (!form.matricula.trim()) {
        newErrors.matricula = "La matrícula es requerida";
      }
      if (!form.colegioEscribanos.trim()) {
        newErrors.colegioEscribanos = "El colegio es requerido";
      }
      if (!form.provincia) {
        newErrors.provincia = "Seleccioná una provincia";
      }
      if (!form.localidad.trim()) {
        newErrors.localidad = "La localidad es requerida";
      }
      if (!form.direccion.trim()) {
        newErrors.direccion = "La dirección es requerida";
      }
    }

    if (step === 3 && role === "ESCRIBANO") {
      if (!form.plan) {
        newErrors.plan = "Seleccioná un plan";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) {
      const firstError = document.querySelector('[class*="text-rose-600"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (step < totalSteps) {
      setDirection(1);
      setStep((s) => (s + 1) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => (s - 1) as Step);
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        phone: form.phone.trim() || null,
        password: form.password,
        role,
        ...(role === "ESCRIBANO" && {
          matricula: form.matricula.trim(),
          colegioEscribanos: form.colegioEscribanos.trim(),
          ubicacion: `${form.localidad.trim()}, ${form.provincia}`,
          provincia: form.provincia,
          localidad: form.localidad.trim(),
          direccion: form.direccion.trim(),
          plan: form.plan,
          billingCycle,
        }),
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al crear la cuenta");
        setLoading(false);

        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "sign_up_failed", {
            method: "email",
            role: role,
          });
        }
        return;
      }

      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "sign_up", {
          method: "email",
          role: role,
        });
      }

      if (role === "ESCRIBANO") {
        router.push("/login?registered=escribano");
      } else {
        router.push("/login?registered=true");
      }
    } catch (err) {
      console.error("Register error:", err);
      setError("Error de conexión. Intentá nuevamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Volver al inicio
          </Link>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Logo />
          </motion.div>

          {role === "ESCRIBANO" && totalSteps > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <StepIndicator currentStep={step} totalSteps={totalSteps} />
            </motion.div>
          )}

          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-lg p-6 sm:p-8">
            {error && (
              <div
                className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200/60 flex items-center gap-3 text-sm text-rose-700 font-medium"
                role="alert"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                {error}
              </div>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <Step1
                    form={form}
                    setForm={setForm}
                    role={role}
                    setRole={setRole}
                    errors={errors}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                )}
                {step === 2 && role === "ESCRIBANO" && (
                  <Step2 form={form} setForm={setForm} errors={errors} />
                )}
                {step === 3 && role === "ESCRIBANO" && (
                  <Step3
                    form={form}
                    setForm={setForm}
                    billingCycle={billingCycle}
                    setBillingCycle={setBillingCycle}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-3">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1 font-semibold border-gray-300"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={2.5} />
                  Atrás
                </Button>
              )}
              <Button
                type="button"
                size="lg"
                onClick={handleNext}
                disabled={loading}
                className={cn(
                  "flex-1 font-semibold shadow-md",
                  "bg-primary-900 hover:bg-primary-800 text-white",
                  "border border-primary-800/20",
                  "hover:shadow-lg hover:shadow-primary-900/20",
                  step === 1 && "w-full"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" strokeWidth={2.5} />
                    Creando cuenta...
                  </>
                ) : step === totalSteps ? (
                  <>
                    Crear cuenta
                    <CheckCircle2 className="w-5 h-5 ml-2" strokeWidth={2.5} />
                  </>
                ) : (
                  <>
                    Continuar
                    <ArrowRight className="w-5 h-5 ml-2" strokeWidth={2.5} />
                  </>
                )}
              </Button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600 font-medium">
              ¿Ya tenés cuenta?{" "}
              <Link
                href="/login"
                className="text-primary-700 font-semibold hover:underline"
              >
                Iniciá sesión
              </Link>
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500 font-medium"
          >
            Al registrarte, aceptás nuestros{" "}
            <Link href="/terminos" className="text-primary-700 hover:underline font-semibold">
              Términos
            </Link>{" "}
            y{" "}
            <Link
              href="/privacidad"
              className="text-primary-700 hover:underline font-semibold"
            >
              Política de Privacidad
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Right Panel - Profesional Clean */}
      <div className="hidden lg:flex lg:flex-1 bg-white border-l border-gray-200/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50" />
        
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative flex flex-col justify-center px-12 xl:px-20 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {role === "ESCRIBANO" ? (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200/60 mb-6">
                  <Sparkles className="w-4 h-4 text-primary-700" strokeWidth={2.5} />
                  <span className="text-sm font-semibold text-primary-900 tracking-tight">
                    Para Escribanos
                  </span>
                </div>

                <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                  Hacé crecer tu estudio notarial
                </h2>
                <p className="mt-6 text-lg text-gray-600 max-w-md font-medium leading-relaxed">
                  Unite a la red de escribanos más grande de Argentina. Más
                  clientes, menos trabajo administrativo.
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    { icon: Users, text: "+150% más consultas en promedio" },
                    { icon: Calendar, text: "Agenda online 24/7" },
                    { icon: Shield, text: "Perfil verificado y destacado" },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3"
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary-700" strokeWidth={2.5} />
                      </div>
                      <span className="text-gray-900 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200/60 mb-6">
                  <Award className="w-4 h-4 text-primary-700" strokeWidth={2.5} />
                  <span className="text-sm font-semibold text-primary-900 tracking-tight">
                    Plataforma Verificada
                  </span>
                </div>

                <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                  Encontrá el escribano ideal para vos
                </h2>
                <p className="mt-6 text-lg text-gray-600 max-w-md font-medium leading-relaxed">
                  Compará precios, leé opiniones y agendá tu consulta presencial
                  o virtual en minutos.
                </p>

                <div className="mt-10 grid grid-cols-3 gap-6">
                  {[
                    { icon: Award, value: "500+", label: "Escribanos" },
                    { icon: TrendingUp, value: "10k+", label: "Consultas" },
                    { icon: Shield, value: "100%", label: "Verificados" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 mb-3">
                        <stat.icon className="w-6 h-6 text-primary-700" strokeWidth={2.5} />
                      </div>
                      <p className="text-2xl font-bold text-gray-900 tracking-tight">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// LOADING FALLBACK
// =============================================================================

function RegisterLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-700 border-r-transparent" />
        <p className="mt-4 text-sm text-gray-600 font-medium">
          Cargando registro...
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// PÁGINA PRINCIPAL EXPORTADA CON SUSPENSE
// =============================================================================

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterContent />
    </Suspense>
  );
}