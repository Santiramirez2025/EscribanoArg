// app/page.tsx - SERVER COMPONENT
import { Metadata } from "next";
import HomePage from "@/components/pages/home-page";

// =============================================================================
// METADATA Y STRUCTURED DATA
// =============================================================================

export const metadata: Metadata = {
  title: "EscribanosARG - Encontrá el Escribano Ideal para tu Trámite",
  description:
    "Compará precios, leé opiniones y agendá tu consulta presencial o virtual con escribanos verificados en Villa María y alrededores. Simple, rápido y seguro.",
  keywords:
    "escribanos, escribanía, trámites notariales, Villa María, Córdoba, Argentina, escrituras, poderes, testamentos",
  openGraph: {
    title: "EscribanosARG - Encontrá el Escribano Ideal",
    description:
      "La plataforma más simple para encontrar y agendar con escribanos verificados",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EscribanosARG",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EscribanosARG - Encontrá el Escribano Ideal",
    description: "Compará precios, leé opiniones y agendá tu consulta",
  },
};

export default function Page() {
  // Structured Data para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EscribanosARG",
    description: "Plataforma para encontrar y agendar escribanos en Argentina",
    url: "https://escribanosarg.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://escribanosarg.com/buscar?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    areaServed: {
      "@type": "City",
      name: "Villa María",
      addressCountry: "AR",
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <HomePage />
    </>
  );
}