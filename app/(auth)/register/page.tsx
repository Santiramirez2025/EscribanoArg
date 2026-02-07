// app/register/page.tsx
import { Metadata } from "next";
import RegisterPage from "@/components/pages/register-page";

export const metadata: Metadata = {
  title: "Crear Cuenta - EscribanosARG",
  description: "Registrate en EscribanosARG como cliente o escribano. Gratis y en minutos.",
  keywords: "registro, crear cuenta, escribanos, argentina, villa maría",
};

export default function Page() {
  return <RegisterPage />;
}