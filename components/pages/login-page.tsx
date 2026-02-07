"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Scale,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Award,
  TrendingUp,
  Shield,
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
  error?: boolean;
}) {
  return (
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
  );
}

function Alert({
  type,
  children,
}: {
  type: "error" | "success";
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl text-sm font-medium",
        type === "error"
          ? "bg-rose-50 text-rose-700 border border-rose-200/60"
          : "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
      )}
      role="alert"
    >
      {type === "error" ? (
        <AlertCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} aria-hidden="true" />
      ) : (
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} aria-hidden="true" />
      )}
      {children}
    </motion.div>
  );
}

// =============================================================================
// COMPONENTE INTERNO CON useSearchParams
// =============================================================================

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = (): boolean => {
    const errors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      errors.email = "El email es requerido";
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Email inválido";
      isValid = false;
    }

    if (!password) {
      errors.password = "La contraseña es requerida";
      isValid = false;
    } else if (!validatePassword(password)) {
      errors.password = "La contraseña debe tener al menos 6 caracteres";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({ email: "", password: "" });

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email o contraseña incorrectos");
        setLoading(false);

        // Analytics - track failed login
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "login_failed", {
            method: "credentials",
          });
        }
      } else {
        // Analytics - track successful login
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "login", {
            method: "credentials",
          });
        }

        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error de conexión. Intentá nuevamente.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
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

          {/* Form card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="bg-white rounded-2xl border border-gray-200/60 shadow-lg p-6 sm:p-8"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Bienvenido de nuevo
              </h1>
              <p className="mt-2 text-gray-600 font-medium">
                Ingresá a tu cuenta para continuar
              </p>
            </motion.div>

            {/* Success message after registration */}
            {registered && (
              <motion.div variants={fadeInUp} className="mt-6">
                <Alert type="success">
                  ¡Cuenta creada exitosamente! Ahora podés iniciar sesión.
                </Alert>
              </motion.div>
            )}

            {/* Error message */}
            {error && (
              <motion.div variants={fadeInUp} className="mt-6">
                <Alert type="error">{error}</Alert>
              </motion.div>
            )}

            {/* Form */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
              noValidate
            >
              {/* Email */}
              <div className="space-y-2">
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: "" }));
                    setError("");
                  }}
                  required
                  autoComplete="email"
                  error={!!fieldErrors.email || !!error}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="text-sm text-rose-600 font-medium">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-900 tracking-tight"
                  >
                    Contraseña
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary-700 hover:text-primary-800 font-semibold transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    icon={Lock}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setFieldErrors((prev) => ({ ...prev, password: "" }));
                      setError("");
                    }}
                    required
                    autoComplete="current-password"
                    error={!!fieldErrors.password || !!error}
                    className="pr-12"
                    aria-invalid={!!fieldErrors.password}
                    aria-describedby={
                      fieldErrors.password ? "password-error" : undefined
                    }
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
                {fieldErrors.password && (
                  <p id="password-error" className="text-sm text-rose-600 font-medium">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className={cn(
                  "w-full font-semibold shadow-md h-12",
                  "bg-primary-900 hover:bg-primary-800 text-white",
                  "border border-primary-800/20",
                  "hover:shadow-lg hover:shadow-primary-900/20"
                )}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" strokeWidth={2.5} />
                    Ingresando...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </motion.form>

            {/* Divider */}
            <motion.div variants={fadeInUp} className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    ¿No tenés cuenta?
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Register links */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 grid grid-cols-2 gap-3"
            >
              <Link href="/register">
                <Button 
                  variant="outline" 
                  className="w-full font-semibold border-gray-300"
                >
                  Soy Cliente
                </Button>
              </Link>
              <Link href="/register?role=escribano">
                <Button 
                  className={cn(
                    "w-full font-semibold",
                    "bg-white hover:bg-gray-50 text-gray-900",
                    "border-2 border-gray-300 hover:border-gray-400"
                  )}
                >
                  Soy Escribano
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-gray-500 font-medium"
          >
            Al continuar, aceptás nuestros{" "}
            <Link href="/terminos" className="text-primary-700 hover:underline font-semibold">
              Términos
            </Link>{" "}
            y{" "}
            <Link href="/privacidad" className="text-primary-700 hover:underline font-semibold">
              Política de Privacidad
            </Link>
          </motion.p>
        </div>
      </div>

      {/* Right side - Visual Profesional (hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-white border-l border-gray-200/60 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50" />
        
        {/* Pattern sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative flex flex-col justify-center px-12 xl:px-20 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200/60 mb-6">
              <Award className="w-4 h-4 text-primary-700" strokeWidth={2.5} />
              <span className="text-sm font-semibold text-primary-900 tracking-tight">
                Plataforma Verificada
              </span>
            </div>

            <h2 className="text-3xl xl:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
              Conectamos clientes con los mejores escribanos de Argentina
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-md font-medium leading-relaxed">
              Encontrá el profesional ideal para tu trámite. Compará precios, leé
              opiniones y agendá tu consulta en minutos.
            </p>

            {/* Stats profesionales */}
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
                  <p className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="mt-10 space-y-3">
              {[
                "✓ Escribanos matriculados y verificados",
                "✓ Opiniones reales de clientes",
                "✓ Agenda online sin llamadas",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-success" strokeWidth={2.5} />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// LOADING FALLBACK
// =============================================================================

function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary-700 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-sm text-gray-600 font-medium">Cargando...</p>
      </div>
    </div>
  );
}

// =============================================================================
// COMPONENTE PRINCIPAL EXPORTADO
// =============================================================================

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  );
}