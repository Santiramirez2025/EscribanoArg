"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Scale, 
  Shield,
  Instagram, 
  Linkedin, 
  Twitter,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const trustStats = [
  { value: "+500", label: "Escribanos" },
  { value: "+10K", label: "Consultas" },
  { value: "24/7", label: "Disponible" },
];

// =============================================================================
// COMPONENTES
// =============================================================================

function Logo() {
  return (
    <Link href="/" className="inline-flex items-center gap-3 group">
      <div
        className={cn(
          "rounded-2xl flex items-center justify-center transition-all duration-200",
          "bg-gradient-to-br from-primary-700 to-primary-800",
          "shadow-sm border border-primary-600/20",
          "h-12 w-12"
        )}
      >
        <Scale 
          className="h-6 w-6 text-white" 
          strokeWidth={2.5} 
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-semibold tracking-tight text-gray-900">
          EscribanosARG
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
          Escribanía Digital
        </span>
      </div>
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "text-[15px] font-medium text-gray-600",
          "hover:text-primary-900 transition-colors duration-150",
          "inline-block"
        )}
      >
        {children}
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
      <h3 className="font-semibold text-gray-900 mb-5 text-sm tracking-tight">
        {title}
      </h3>
      <ul className="space-y-3.5">
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
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-11 h-11 rounded-xl flex items-center justify-center",
        "bg-gray-50 hover:bg-gray-100 border border-gray-200",
        "text-gray-600 hover:text-primary-900",
        "transition-all duration-150",
        "hover:border-gray-300"
      )}
      aria-label={name}
    >
      <Icon className="h-4.5 w-4.5" strokeWidth={2} />
    </a>
  );
}

function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200/60 rounded-full">
      <Shield className="h-4 w-4 text-success" strokeWidth={2.5} />
      <span className="text-sm font-medium text-success-dark">
        Plataforma Verificada
      </span>
    </div>
  );
}

function Newsletter() {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200/60">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
          <Mail className="h-5 w-5 text-primary-700" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg tracking-tight">
            Newsletter
          </h3>
          <p className="text-[15px] text-gray-600 mt-1">
            Novedades y recursos legales
          </p>
        </div>
      </div>
      
      <form className="space-y-3 mt-5">
        <input
          type="email"
          placeholder="tu@email.com"
          className={cn(
            "w-full px-4 py-3 rounded-xl text-[15px]",
            "bg-white border border-gray-300",
            "text-gray-900 placeholder:text-gray-500",
            "focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700",
            "transition-all duration-150"
          )}
        />
        <Button 
          type="submit"
          className={cn(
            "w-full justify-center gap-2 font-semibold shadow-md",
            "bg-primary-900 hover:bg-primary-800 text-white",
            "border border-primary-800/20 h-11",
            "hover:shadow-lg hover:shadow-primary-900/20"
          )}
        >
          Suscribirse
          <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
        </Button>
      </form>

      <p className="text-xs text-gray-500 mt-4 leading-relaxed">
        Al suscribirte aceptás nuestra política de privacidad
      </p>
    </div>
  );
}

function ContactInfo() {
  const contacts = [
    { icon: Mail, text: "hola@escribanosarg.com", href: "mailto:hola@escribanosarg.com" },
    { icon: Phone, text: "+54 9 351 123-4567", href: "tel:+5493511234567" },
    { icon: MapPin, text: "Villa María, Córdoba", href: null },
  ];

  return (
    <div className="space-y-3">
      {contacts.map((item) => (
        <div key={item.text} className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
            <item.icon className="h-4 w-4 text-gray-600" strokeWidth={2} />
          </div>
          {item.href ? (
            <a 
              href={item.href} 
              className="text-[15px] font-medium text-gray-600 hover:text-primary-900 transition-colors"
            >
              {item.text}
            </a>
          ) : (
            <span className="text-[15px] font-medium text-gray-600">
              {item.text}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function TrustStats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {trustStats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="font-bold text-2xl text-primary-900 tracking-tight">
            {stat.value}
          </div>
          <div className="text-xs text-gray-500 font-medium mt-1">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// FOOTER PRINCIPAL
// =============================================================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Brand Column - Profesional */}
            <div className="lg:col-span-4 space-y-6">
              <Logo />
              
              <p className="text-[15px] text-gray-600 leading-relaxed max-w-sm font-medium">
                La forma más simple y segura de encontrar escribanos matriculados en toda Argentina.
              </p>

              <TrustBadge />

              <div className="pt-2">
                <ContactInfo />
              </div>

              {/* Social Links - Estilo profesional */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3 tracking-tight">
                  Seguinos
                </p>
                <div className="flex gap-3">
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
            </div>

            {/* Links Columns - Espaciado profesional */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 lg:gap-12">
                <FooterSection {...footerLinks.plataforma} />
                <FooterSection {...footerLinks.servicios} />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-8 lg:gap-12 mt-8 lg:mt-12">
                <FooterSection {...footerLinks.empresa} />
                <FooterSection {...footerLinks.legal} />
              </div>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-3">
              <Newsletter />
            </div>
          </div>
        </div>

        {/* Trust Stats Bar - Nuevo elemento profesional */}
        <div className="border-t border-gray-200/60 py-8">
          <TrustStats />
        </div>

        {/* Bottom Bar - Refinado */}
        <div className="border-t border-gray-200/60 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className="text-sm text-gray-500 font-medium">
              © {currentYear} EscribanosARG. Todos los derechos reservados.
            </p>

            {/* Quality Badges - Profesional */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" strokeWidth={2.5} />
                <span className="text-sm text-gray-600 font-medium">
                  100% Seguro
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary-700" strokeWidth={2.5} />
                <span className="text-sm text-gray-600 font-medium">
                  Datos Protegidos
                </span>
              </div>
            </div>

            {/* Made in Badge - Refinado */}
            <div className="text-sm text-gray-500 font-medium">
              Hecho en Argentina 🇦🇷
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}