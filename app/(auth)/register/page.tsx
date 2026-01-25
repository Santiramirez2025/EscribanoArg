"use client";

import { useState, useEffect, Suspense } from "react";
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
} from "lucide-react";
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
  // Paso 1 - Común
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Paso 2 - Solo escribano
  matricula: string;
  colegioEscribanos: string;
  provincia: string;
  localidad: string;
  direccion: string;
  // Paso 3 - Solo escribano (plan)
  plan: string;
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

const PLANES = [
  {
    id: "starter",
    nombre: "Starter",
    precio: "Gratis",
    descripcion: "Para comenzar",
    features: ["Perfil básico", "Hasta 10 reservas/mes", "Soporte por email"],
    popular: false,
  },
  {
    id: "profesional",
    nombre: "Profesional",
    precio: "$29.900/mes",
    descripcion: "Todo para crecer",
    features: [
      "Perfil verificado",
      "Reservas ilimitadas",
      "Estadísticas",
      "Chat con clientes",
      "Posicionamiento prioritario",
    ],
    popular: true,
  },
  {
    id: "estudio",
    nombre: "Estudio",
    precio: "$49.900/mes",
    descripcion: "Múltiples escribanos",
    features: [
      "Hasta 5 escribanos",
      "Gestión centralizada",
      "Marca personalizada",
      "Account manager",
    ],
    popular: false,
  },
];

// =============================================================================
// COMPONENTES UI
// =============================================================================

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-400/20"
      >
        <Scale className="w-6 h-6 text-white" />
      </motion.div>
      <span className="text-2xl font-bold text-slate-800 font-serif">
        EscribanosARG
      </span>
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
              error ? "text-rose-400" : "text-slate-400"
            )}
          />
        )}
        <input
          className={cn(
            "w-full rounded-xl border-2 bg-white",
            "py-3.5 pr-4 text-slate-800 placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-amber-400/20",
            "transition-all duration-200",
            Icon ? "pl-12" : "pl-4",
            error
              ? "border-rose-300 focus:border-rose-400"
              : "border-slate-200 focus:border-amber-400",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-rose-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
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
              error ? "text-rose-400" : "text-slate-400"
            )}
          />
        )}
        <select
          className={cn(
            "w-full rounded-xl border-2 bg-white appearance-none",
            "py-3.5 pr-10 text-slate-800",
            "focus:outline-none focus:ring-2 focus:ring-amber-400/20",
            "transition-all duration-200",
            Icon ? "pl-12" : "pl-4",
            error
              ? "border-rose-300 focus:border-rose-400"
              : "border-slate-200 focus:border-amber-400",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-rose-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
              step === currentStep
                ? "bg-amber-500 text-white shadow-lg shadow-amber-400/30"
                : step < currentStep
                ? "bg-emerald-500 text-white"
                : "bg-slate-200 text-slate-400"
            )}
          >
            {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
          </div>
          {step < totalSteps && (
            <div
              className={cn(
                "w-12 h-1 mx-1 rounded-full transition-all",
                step < currentStep ? "bg-emerald-500" : "bg-slate-200"
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
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => onChange("CLIENTE")}
        className={cn(
          "relative p-4 rounded-xl border-2 text-left transition-all",
          role === "CLIENTE"
            ? "border-amber-400 bg-amber-50 shadow-lg shadow-amber-400/10"
            : "border-slate-200 bg-white hover:border-slate-300"
        )}
      >
        {role === "CLIENTE" && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 className="w-5 h-5 text-amber-500" />
          </div>
        )}
        <Users className={cn("w-8 h-8 mb-2", role === "CLIENTE" ? "text-amber-500" : "text-slate-400")} />
        <p className="font-semibold text-slate-800">Soy Cliente</p>
        <p className="text-sm text-slate-500 mt-1">Busco un escribano</p>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={() => onChange("ESCRIBANO")}
        className={cn(
          "relative p-4 rounded-xl border-2 text-left transition-all",
          role === "ESCRIBANO"
            ? "border-amber-400 bg-amber-50 shadow-lg shadow-amber-400/10"
            : "border-slate-200 bg-white hover:border-slate-300"
        )}
      >
        {role === "ESCRIBANO" && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 className="w-5 h-5 text-amber-500" />
          </div>
        )}
        <Briefcase className={cn("w-8 h-8 mb-2", role === "ESCRIBANO" ? "text-amber-500" : "text-slate-400")} />
        <p className="font-semibold text-slate-800">Soy Escribano</p>
        <p className="text-sm text-slate-500 mt-1">Quiero ofrecer mis servicios</p>
      </motion.button>
    </div>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: typeof PLANES[0];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={onSelect}
      className={cn(
        "relative p-4 rounded-xl border-2 text-left transition-all w-full",
        selected
          ? "border-amber-400 bg-amber-50 shadow-lg shadow-amber-400/10"
          : "border-slate-200 bg-white hover:border-slate-300",
        plan.popular && "ring-2 ring-amber-400 ring-offset-2"
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-4 px-2 py-0.5 bg-amber-500 text-white text-xs font-semibold rounded-full">
          Recomendado
        </span>
      )}
      {selected && (
        <div className="absolute top-3 right-3">
          <CheckCircle2 className="w-5 h-5 text-amber-500" />
        </div>
      )}
      <p className="font-semibold text-slate-800">{plan.nombre}</p>
      <p className="text-lg font-bold text-amber-600 mt-1">{plan.precio}</p>
      <p className="text-sm text-slate-500 mt-1">{plan.descripcion}</p>
      <ul className="mt-3 space-y-1">
        {plan.features.slice(0, 3).map((feature) => (
          <li key={feature} className="text-xs text-slate-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.button>
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
        <h2 className="text-xl font-bold font-serif text-slate-800">
          Crear cuenta
        </h2>
        <p className="mt-1 text-slate-500">
          Completá tus datos para registrarte
        </p>
      </motion.div>

      {/* Role selector */}
      <motion.div variants={fadeInUp}>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          ¿Qué tipo de cuenta querés crear?
        </label>
        <RoleSelector role={role} onChange={setRole} />
      </motion.div>

      {/* Name */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Nombre completo
        </label>
        <Input
          type="text"
          icon={User}
          placeholder="Juan Pérez"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          required
        />
      </motion.div>

      {/* Email */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <Input
          type="email"
          icon={Mail}
          placeholder="tu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          required
        />
      </motion.div>

      {/* Phone */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Teléfono <span className="text-slate-400">(opcional)</span>
        </label>
        <Input
          type="tel"
          icon={Phone}
          placeholder="+54 9 11 1234-5678"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </motion.div>

      {/* Password */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Contraseña
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            icon={Lock}
            placeholder="Mínimo 6 caracteres"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            required
            minLength={6}
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      {/* Confirm Password */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Confirmar contraseña
        </label>
        <Input
          type={showPassword ? "text" : "password"}
          icon={Lock}
          placeholder="Repetí tu contraseña"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          required
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
        <h2 className="text-xl font-bold font-serif text-slate-800">
          Datos profesionales
        </h2>
        <p className="mt-1 text-slate-500">
          Información para verificar tu matrícula
        </p>
      </motion.div>

      {/* Matrícula */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Número de matrícula
        </label>
        <Input
          type="text"
          icon={FileText}
          placeholder="MAT-1234"
          value={form.matricula}
          onChange={(e) => setForm({ ...form, matricula: e.target.value })}
          error={errors.matricula}
          required
        />
      </motion.div>

      {/* Colegio */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Colegio de Escribanos
        </label>
        <Input
          type="text"
          icon={Building2}
          placeholder="Colegio de Escribanos de Córdoba"
          value={form.colegioEscribanos}
          onChange={(e) => setForm({ ...form, colegioEscribanos: e.target.value })}
          error={errors.colegioEscribanos}
          required
        />
      </motion.div>

      {/* Provincia */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Provincia
        </label>
        <Select
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

      {/* Localidad */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Localidad
        </label>
        <Input
          type="text"
          icon={MapPin}
          placeholder="Villa María"
          value={form.localidad}
          onChange={(e) => setForm({ ...form, localidad: e.target.value })}
          error={errors.localidad}
          required
        />
      </motion.div>

      {/* Dirección */}
      <motion.div variants={fadeInUp} className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          Dirección del estudio
        </label>
        <Input
          type="text"
          icon={Building2}
          placeholder="Av. San Martín 123, Piso 2, Of. 4"
          value={form.direccion}
          onChange={(e) => setForm({ ...form, direccion: e.target.value })}
          error={errors.direccion}
          required
        />
      </motion.div>

      {/* Info verificación */}
      <motion.div
        variants={fadeInUp}
        className="p-4 rounded-xl bg-sky-50 border border-sky-200"
      >
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sky-800">Verificación de matrícula</p>
            <p className="text-sm text-sky-700 mt-1">
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
}: {
  form: FormData;
  setForm: (form: FormData) => void;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      <motion.div variants={fadeInUp}>
        <h2 className="text-xl font-bold font-serif text-slate-800">
          Elegí tu plan
        </h2>
        <p className="mt-1 text-slate-500">
          Podés cambiar de plan en cualquier momento
        </p>
      </motion.div>

      {/* Planes */}
      <motion.div variants={fadeInUp} className="space-y-3">
        {PLANES.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={form.plan === plan.id}
            onSelect={() => setForm({ ...form, plan: plan.id })}
          />
        ))}
      </motion.div>

      {/* Trial info */}
      <motion.div
        variants={fadeInUp}
        className="p-4 rounded-xl bg-emerald-50 border border-emerald-200"
      >
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-emerald-800">30 días de prueba gratis</p>
            <p className="text-sm text-emerald-700 mt-1">
              Los planes pagos incluyen 30 días de prueba sin cargo. 
              No se requiere tarjeta de crédito para comenzar.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// COMPONENTE INTERNO CON SEARCHPARAMS
// =============================================================================

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "escribano" ? "ESCRIBANO" : "CLIENTE";
  const defaultPlan = searchParams.get("plan") || "profesional";

  const [role, setRole] = useState<Role>(defaultRole as Role);
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

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

  // Total steps based on role
  const totalSteps = role === "ESCRIBANO" ? 3 : 1;

  // Validate current step
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!form.name.trim()) newErrors.name = "El nombre es requerido";
      if (!form.email.trim()) newErrors.email = "El email es requerido";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        newErrors.email = "Email inválido";
      }
      if (!form.password) newErrors.password = "La contraseña es requerida";
      else if (form.password.length < 6) {
        newErrors.password = "Mínimo 6 caracteres";
      }
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      }
    }

    if (step === 2 && role === "ESCRIBANO") {
      if (!form.matricula.trim()) newErrors.matricula = "La matrícula es requerida";
      if (!form.colegioEscribanos.trim()) newErrors.colegioEscribanos = "El colegio es requerido";
      if (!form.provincia) newErrors.provincia = "Seleccioná una provincia";
      if (!form.localidad.trim()) newErrors.localidad = "La localidad es requerida";
      if (!form.direccion.trim()) newErrors.direccion = "La dirección es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    if (step < totalSteps) {
      setDirection(1);
      setStep((s) => (s + 1) as Step);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setDirection(-1);
      setStep((s) => (s - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role,
        ...(role === "ESCRIBANO" && {
          matricula: form.matricula,
          colegioEscribanos: form.colegioEscribanos,
          provincia: form.provincia,
          localidad: form.localidad,
          direccion: form.direccion,
          plan: form.plan,
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
        return;
      }

      // Redirect based on role
      if (role === "ESCRIBANO") {
        router.push("/login?registered=escribano");
      } else {
        router.push("/login?registered=true");
      }
    } catch {
      setError("Error de conexión. Intentá nuevamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 bg-[#faf9f7]">
        <div className="w-full max-w-md mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Logo />
          </motion.div>

          {/* Step indicator (only for escribano) */}
          {role === "ESCRIBANO" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <StepIndicator currentStep={step} totalSteps={totalSteps} />
            </motion.div>
          )}

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8">
            {/* Error */}
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-sm text-rose-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Steps content */}
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
                  <Step3 form={form} setForm={setForm} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex gap-3">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={handleBack}
                  className="flex-1"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Atrás
                </Button>
              )}
              <Button
                type="button"
                variant="accent"
                size="lg"
                onClick={handleNext}
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creando cuenta...
                  </>
                ) : step === totalSteps ? (
                  <>
                    Crear cuenta
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                  </>
                ) : (
                  <>
                    Continuar
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-slate-500">
              ¿Ya tenés cuenta?{" "}
              <Link
                href="/login"
                className="text-amber-600 font-semibold hover:text-amber-700"
              >
                Iniciá sesión
              </Link>
            </p>
          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-slate-400"
          >
            Al registrarte, aceptás nuestros{" "}
            <Link href="/terminos" className="text-amber-600 hover:underline">
              Términos
            </Link>{" "}
            y{" "}
            <Link href="/privacidad" className="text-amber-600 hover:underline">
              Política de Privacidad
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Right side - Visual (hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-700 relative overflow-hidden">
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

        {/* Content */}
        <div className="relative flex flex-col justify-center px-12 xl:px-20">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {role === "ESCRIBANO" ? (
              <>
                <h2 className="text-3xl xl:text-4xl font-bold font-serif text-white leading-tight">
                  Hacé crecer tu{" "}
                  <span className="text-amber-200">estudio notarial</span>
                </h2>
                <p className="mt-6 text-lg text-slate-200 max-w-md">
                  Unite a la red de escribanos más grande de Argentina.
                  Más clientes, menos trabajo administrativo.
                </p>

                {/* Benefits */}
                <div className="mt-10 space-y-4">
                  {[
                    { icon: Users, text: "+150% más consultas en promedio" },
                    { icon: Calendar, text: "Agenda online 24/7" },
                    { icon: Shield, text: "Perfil verificado y destacado" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-amber-200/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-amber-200" />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl xl:text-4xl font-bold font-serif text-white leading-tight">
                  Encontrá el escribano{" "}
                  <span className="text-amber-200">ideal</span> para vos
                </h2>
                <p className="mt-6 text-lg text-slate-200 max-w-md">
                  Compará precios, leé opiniones y agendá tu consulta
                  presencial o virtual en minutos.
                </p>

                {/* Features */}
                <div className="mt-10 grid grid-cols-3 gap-6">
                  {[
                    { value: "500+", label: "Escribanos" },
                    { value: "Gratis", label: "Sin costo" },
                    { value: "4.9★", label: "Satisfacción" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl font-bold text-amber-200">{stat.value}</p>
                      <p className="text-sm text-slate-300">{stat.label}</p>
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
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f7]">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
        </div>
        <p className="text-sm text-slate-600 font-medium">Cargando registro...</p>
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