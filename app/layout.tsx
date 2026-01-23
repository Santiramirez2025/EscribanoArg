import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "EscribanosARG - Encontrá tu Escribano", template: "%s | EscribanosARG" },
  description: "Plataforma para conectar clientes con escribanos matriculados en Argentina.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 antialiased">{children}</body>
    </html>
  );
}
