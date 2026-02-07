"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scale, ChevronRight, User, LogIn, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// =============================================================================
// CONFIGURACIÓN
// =============================================================================

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Buscar", href: "/buscar" },
  { name: "Servicios", href: "/servicios" },
  { name: "Para Escribanos", href: "/para-escribanos" },
];

// =============================================================================
// ANIMACIONES OPTIMIZADAS (reducidas para mayor profesionalismo)
// =============================================================================

const menuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring" as const,
      stiffness: 380,
      damping: 35,
    },
  },
  open: {
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 380,
      damping: 35,
    },
  },
};

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const menuItemVariants = {
  closed: { x: 20, opacity: 0 },
  open: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.25,
    },
  }),
};

// =============================================================================
// COMPONENTE LOGO - REDISEÑADO PROFESIONAL
// =============================================================================

function Logo({ scrolled = false }: { scrolled?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div
        className={cn(
          "rounded-2xl flex items-center justify-center transition-all duration-200",
          "bg-gradient-to-br from-primary-700 to-primary-800",
          "shadow-sm border border-primary-600/20",
          scrolled ? "h-11 w-11" : "h-12 w-12"
        )}
      >
        <Scale 
          className={cn(
            "text-white transition-all duration-200",
            scrolled ? "h-5 w-5" : "h-6 w-6"
          )} 
          strokeWidth={2.5} 
        />
      </div>
      <div className="flex flex-col">
        <span className={cn(
          "font-semibold tracking-tight text-primary-900 transition-all duration-200",
          scrolled ? "text-lg" : "text-lg lg:text-xl"
        )}>
          EscribanosARG
        </span>
        <span className="hidden sm:block text-[10px] lg:text-xs text-gray-500 font-medium tracking-wide uppercase">
          Escribanía Digital
        </span>
      </div>
    </Link>
  );
}

// =============================================================================
// BADGE DE CONFIANZA - NUEVO ELEMENTO
// =============================================================================

function TrustBadge() {
  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-success-light rounded-full">
      <Shield className="h-3.5 w-3.5 text-success" strokeWidth={2.5} />
      <span className="text-xs font-medium text-success-dark">
        +500 escribanos verificados
      </span>
    </div>
  );
}

// =============================================================================
// COMPONENTE NAV LINK - OPTIMIZADO
// =============================================================================

function NavLink({
  href,
  name,
  isActive,
}: {
  href: string;
  name: string;
  isActive: boolean;
}) {
  return (
    <Link href={href} className="relative group">
      <span
        className={cn(
          "text-[15px] font-medium tracking-tight transition-colors duration-150",
          isActive
            ? "text-primary-900 font-semibold"
            : "text-gray-600 group-hover:text-primary-900"
        )}
      >
        {name}
      </span>
      {/* Indicador activo profesional */}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-2 left-0 right-0 h-[3px] bg-primary-700 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

// =============================================================================
// COMPONENTE MOBILE MENU - REDISEÑADO PROFESIONAL
// =============================================================================

function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay más oscuro para mayor seriedad */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm md:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className={cn(
              "fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw]",
              "bg-white shadow-2xl md:hidden",
              "flex flex-col"
            )}
          >
            {/* Header del menú - más profesional */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-700 to-primary-800 flex items-center justify-center shadow-sm">
                  <Scale className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-primary-900">EscribanosARG</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Navigation Links - espaciado optimizado */}
            <nav className="flex-1 p-6 space-y-2">
              {navigation.map((item, i) => (
                <motion.div
                  key={item.name}
                  custom={i}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center justify-between px-4 py-4 rounded-xl",
                      "text-[15px] font-medium transition-all duration-150",
                      pathname === item.href
                        ? "bg-primary-50 text-primary-700 border-l-4 border-primary-700"
                        : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                    )}
                  >
                    {item.name}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        pathname === item.href
                          ? "text-primary-700"
                          : "text-gray-400"
                      )}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Auth Buttons - rediseñados profesionales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 border-t border-gray-200 space-y-3"
            >
              <Link href="/login" onClick={onClose} className="block">
                <Button 
                  variant="outline" 
                  className="w-full justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 h-12 font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register" onClick={onClose} className="block">
                <Button 
                  className="w-full justify-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-semibold h-12 shadow-md border border-primary-800/20 hover:shadow-lg hover:shadow-primary-900/20"
                >
                  <User className="h-4 w-4" />
                  Crear Cuenta
                </Button>
              </Link>
            </motion.div>

            {/* Footer info - más discreto */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                ¿Sos escribano?{" "}
                <Link
                  href="/para-escribanos"
                  onClick={onClose}
                  className="text-primary-600 font-medium hover:underline"
                >
                  Unite a la plataforma
                </Link>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// COMPONENTE HEADER PRINCIPAL - OPTIMIZADO PROFESIONAL
// =============================================================================

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detectar scroll
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Cerrar menú en cambio de ruta
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200",
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-200/60"
            : "bg-white border-b border-gray-100"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn(
            "flex items-center justify-between transition-all duration-200",
            scrolled ? "h-20" : "h-20 lg:h-24"
          )}>
            {/* Logo */}
            <Logo scrolled={scrolled} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8 lg:gap-10">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.href}
                  name={item.name}
                  isActive={pathname === item.href}
                />
              ))}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
              {/* Trust Badge */}
              <TrustBadge />

              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="font-medium text-gray-700 hover:text-primary-900 hover:bg-gray-50 px-5"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    size="sm"
                    className={cn(
                      "font-semibold px-6 shadow-md",
                      "bg-primary-900 hover:bg-primary-800",
                      "text-white",
                      "border border-primary-800/20",
                      "transition-all duration-200",
                      "hover:shadow-lg hover:shadow-primary-900/20"
                    )}
                  >
                    Registrarse
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className={cn(
                "md:hidden p-2.5 rounded-xl transition-colors",
                "hover:bg-gray-100 active:bg-gray-200"
              )}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}