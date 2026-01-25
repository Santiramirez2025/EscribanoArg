"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scale, ChevronRight, User, LogIn } from "lucide-react";
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
// ANIMACIONES
// =============================================================================

const menuVariants = {
  closed: {
    x: "100%",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40,
    },
  },
  open: {
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 40,
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
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

// =============================================================================
// COMPONENTE LOGO
// =============================================================================

function Logo({ scrolled = false }: { scrolled?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center",
          "bg-gradient-to-br from-amber-400 to-amber-500",
          "shadow-md group-hover:shadow-lg group-hover:shadow-amber-400/20",
          "transition-shadow duration-300"
        )}
      >
        <Scale className="h-5 w-5 text-white" />
      </motion.div>
      <span
        className={cn(
          "hidden sm:block text-xl font-bold font-serif transition-colors duration-300",
          "text-slate-800"
        )}
      >
        EscribanosARG
      </span>
    </Link>
  );
}

// =============================================================================
// COMPONENTE NAV LINK
// =============================================================================

function NavLink({
  href,
  name,
  isActive,
  scrolled,
}: {
  href: string;
  name: string;
  isActive: boolean;
  scrolled: boolean;
}) {
  return (
    <Link href={href} className="relative group">
      <span
        className={cn(
          "text-sm font-medium transition-colors duration-200",
          isActive
            ? "text-slate-800"
            : "text-slate-500 group-hover:text-slate-800"
        )}
      >
        {name}
      </span>
      {/* Indicador activo */}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      {/* Hover indicator */}
      {!isActive && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400/50 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
      )}
    </Link>
  );
}

// =============================================================================
// COMPONENTE MOBILE MENU
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
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
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
            {/* Header del menú */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <span className="font-serif font-bold text-slate-800">Menú</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-1">
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
                      "flex items-center justify-between px-4 py-3.5 rounded-xl",
                      "text-base font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-amber-50 text-amber-700 border-l-4 border-amber-400"
                        : "text-slate-600 hover:bg-slate-50 active:bg-slate-100"
                    )}
                  >
                    {item.name}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        pathname === item.href
                          ? "text-amber-500"
                          : "text-slate-400"
                      )}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 border-t border-slate-100 space-y-3"
            >
              <Link href="/login" onClick={onClose} className="block">
                <Button 
                  variant="outline" 
                  className="w-full justify-center gap-2 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register" onClick={onClose} className="block">
                <Button 
                  className="w-full justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-semibold"
                >
                  <User className="h-4 w-4" />
                  Crear Cuenta
                </Button>
              </Link>
            </motion.div>

            {/* Footer info */}
            <div className="p-4 bg-slate-50 text-center">
              <p className="text-xs text-slate-500">
                ¿Sos escribano?{" "}
                <Link
                  href="/para-escribanos"
                  onClick={onClose}
                  className="text-amber-600 font-medium hover:underline"
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
// COMPONENTE HEADER PRINCIPAL
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-200/80"
            : "bg-white border-b border-slate-200"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Logo scrolled={scrolled} />

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  href={item.href}
                  name={item.name}
                  isActive={pathname === item.href}
                  scrolled={scrolled}
                />
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex md:items-center md:gap-3">
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                >
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    size="sm" 
                    className="font-semibold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 shadow-sm hover:shadow-md"
                  >
                    Registrarse
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(true)}
              className={cn(
                "md:hidden p-2.5 rounded-xl transition-colors",
                "hover:bg-slate-100 active:bg-slate-200"
              )}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5 text-slate-600" />
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </>
  );
}