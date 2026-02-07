// app/buscar/page.tsx - SERVER COMPONENT
import { Metadata } from "next";
import { Suspense } from "react";
import BuscarContent from "./buscar-content";
import Loading from "./loading";

// =============================================================================
// METADATA Y SEO
// =============================================================================

export const metadata: Metadata = {
  title: "Buscar Escribanos | EscribanosARG",
  description:
    "Encontrá el escribano perfecto para tu trámite. Compará precios, calificaciones y disponibilidad. Agenda tu consulta presencial o virtual de forma rápida y segura.",
  keywords:
    "buscar escribanos, encontrar escribano, escribanos Villa María, escribanos Córdoba, comparar precios escribanos, agenda escribano",
  openGraph: {
    title: "Buscar Escribanos | EscribanosARG",
    description: "Encontrá y compará escribanos verificados en tu zona",
    type: "website",
    locale: "es_AR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// =============================================================================
// PÁGINA PRINCIPAL
// =============================================================================

export default function BuscarPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Structured Data para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    name: "Buscar Escribanos",
    description: "Resultados de búsqueda de escribanos en Argentina",
    url: "https://escribanosarg.com/buscar",
    provider: {
      "@type": "Organization",
      name: "EscribanosARG",
      url: "https://escribanosarg.com",
    },
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Suspense fallback={<Loading />}>
        <BuscarContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}