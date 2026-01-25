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
  error?: boolean;
}) {
  return (
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
        "flex items-center gap-3 p-4 rounded-xl text-sm",
        type === "error"
          ? "bg-rose-50 text-rose-700 border border-rose-200"
          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
      )}
    >
      {type === "error" ? (
        <AlertCircle className="w-5 h-5 flex-shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email o contraseña incorrectos");
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
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

          {/* Form card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 sm:p-8"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-2xl font-bold font-serif text-slate-800">
                Bienvenido de nuevo
              </h1>
              <p className="mt-2 text-slate-500">
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
            >
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <Input
                  type="email"
                  icon={Mail}
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  error={!!error}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-slate-700">
                    Contraseña
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    icon={Lock}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    error={!!error}
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="accent"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
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
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-400">
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
                <Button variant="outline" className="w-full">
                  Soy Cliente
                </Button>
              </Link>
              <Link href="/register?role=escribano">
                <Button variant="secondary" className="w-full">
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
            className="mt-8 text-center text-sm text-slate-400"
          >
            Al continuar, aceptás nuestros{" "}
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
            <h2 className="text-3xl xl:text-4xl font-bold font-serif text-white leading-tight">
              Conectamos clientes con los mejores escribanos de Argentina
            </h2>
            <p className="mt-6 text-lg text-slate-200 max-w-md">
              Encontrá el profesional ideal para tu trámite. Compará precios,
              leé opiniones y agendá tu consulta en minutos.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { value: "500+", label: "Escribanos" },
                { value: "10k+", label: "Consultas" },
                { value: "4.9★", label: "Satisfacción" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-amber-200">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-300">{stat.label}</p>
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
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f7]">
      <div className="text-center">
        <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-solid border-amber-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-4 text-sm text-slate-500">Cargando...</p>
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