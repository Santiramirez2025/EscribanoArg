"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Scale, 
  Heart, 
  Instagram, 
  Linkedin, 
  Twitter,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// CONFIGURACIÓN
// =============================================================================

const footerLinks = {
  plataforma: {
    title: "Plataforma",
    links: [
      { name: "Buscar Escribano", href: "/buscar" },
      { name: "Cómo funciona", href: "/como-funciona" },
      { name: "Precios", href: "/precios" },
      { name: "Para Escribanos", href: "/para-escribanos" },
    ],
  },
  servicios: {
    title: "Servicios",
    links: [
      { name: "Escrituras", href: "/buscar?servicio=ESCRITURAS" },
      { name: "Poderes", href: "/buscar?servicio=PODERES" },
      { name: "Sucesiones", href: "/buscar?servicio=DECLARATORIA" },
      { name: "Testamentos", href: "/buscar?servicio=TESTAMENTOS" },
      { name: "Donaciones", href: "/buscar?servicio=DONACIONES" },
    ],
  },
  empresa: {
    title: "Empresa",
    links: [
      { name: "Sobre nosotros", href: "/sobre-nosotros" },
      { name: "Blog", href: "/blog" },
      { name: "Contacto", href: "/contacto" },
      { name: "Trabaja con nosotros", href: "/careers" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Términos y condiciones", href: "/terminos" },
      { name: "Política de privacidad", href: "/privacidad" },
      { name: "Cookies", href: "/cookies" },
    ],
  },
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/escribanosarg" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/escribanosarg" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/escribanosarg" },
];

const contactInfo = [
  { icon: Mail, text: "hola@escribanosarg.com", href: "mailto:hola@escribanosarg.com" },
  { icon: Phone, text: "+54 9 351 123-4567", href: "tel:+5493511234567" },
  { icon: MapPin, text: "Villa María, Córdoba", href: null },
];

// =============================================================================
// COMPONENTES
// =============================================================================

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 group">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center",
          "bg-gradient-to-br from-amber-400 to-amber-500",
          "shadow-md shadow-amber-400/20",
          "transition-shadow duration-300"
        )}
      >
        <Scale className="h-5 w-5 text-white" />
      </motion.div>
      <span className="text-xl font-bold font-serif text-white">
        EscribanosARG
      </span>
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-1 text-sm text-slate-400",
          "hover:text-white transition-colors duration-200",
          "group"
        )}
      >
        <span>{children}</span>
        <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
      </Link>
    </li>
  );
}

function FooterSection({ 
  title, 
  links 
}: { 
  title: string; 
  links: { name: string; href: string }[] 
}) {
  return (
    <div>
      <h3 className="font-semibold text-slate-200 mb-4 text-sm uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <FooterLink key={link.name} href={link.href}>
            {link.name}
          </FooterLink>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({ 
  href, 
  icon: Icon, 
  name 
}: { 
  href: string; 
  icon: React.ElementType; 
  name: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center",
        "bg-slate-700/50 hover:bg-slate-700 border border-slate-600/50",
        "text-slate-400 hover:text-white",
        "transition-colors duration-200"
      )}
      aria-label={name}
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}

function Newsletter() {
  return (
    <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30">
      <h3 className="font-semibold text-white mb-2">
        Suscribite al newsletter
      </h3>
      <p className="text-sm text-slate-400 mb-4">
        Recibí novedades y tips sobre trámites notariales.
      </p>
      <form className="flex gap-2">
        <input
          type="email"
          placeholder="tu@email.com"
          className={cn(
            "flex-1 px-4 py-2.5 rounded-xl text-sm",
            "bg-slate-700/50 border border-slate-600/50",
            "text-white placeholder:text-slate-500",
            "focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50",
            "transition-all duration-200"
          )}
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={cn(
            "px-4 py-2.5 rounded-xl font-medium text-sm",
            "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900",
            "hover:from-amber-500 hover:to-amber-600",
            "shadow-md shadow-amber-400/20",
            "transition-all duration-200"
          )}
        >
          <ArrowUpRight className="h-4 w-4" />
        </motion.button>
      </form>
    </div>
  );
}

// =============================================================================
// FOOTER PRINCIPAL
// =============================================================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white relative overflow-hidden">
      {/* Decorative elements - más sutiles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-300/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-300/5 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-6 lg:col-span-4">
            <Logo />
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-xs">
              La forma más simple de encontrar y conectar con escribanos 
              matriculados en Argentina.
            </p>

            {/* Contact Info */}
            <ul className="mt-6 space-y-3">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-slate-400">
                  <item.icon className="h-4 w-4 text-amber-400" />
                  {item.href ? (
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <SocialButton
                  key={social.name}
                  href={social.href}
                  icon={social.icon}
                  name={social.name}
                />
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <FooterSection {...footerLinks.plataforma} />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <FooterSection {...footerLinks.servicios} />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <FooterSection {...footerLinks.empresa} />
          </div>

          {/* Newsletter Column (Desktop) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 hidden lg:block">
            <FooterSection {...footerLinks.legal} />
          </div>
        </div>

        {/* Newsletter Row (Mobile/Tablet) */}
        <div className="lg:hidden pb-8">
          <Newsletter />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-slate-500 text-center sm:text-left">
              © {currentYear} EscribanosARG. Todos los derechos reservados.
            </p>

            {/* Made in Argentina Badge */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Hecho con</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
              </motion.div>
              <span>en Argentina 🇦🇷</span>
            </div>

            {/* Legal Links (Mobile) */}
            <div className="flex items-center gap-4 text-sm lg:hidden">
              {footerLinks.legal.links.slice(0, 2).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  {link.name.split(" ")[0]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}