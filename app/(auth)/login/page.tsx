// app/login/page.tsx
import { Metadata } from "next";
import LoginPage from "@/components/pages/login-page";

export const metadata: Metadata = {
  title: "Iniciar Sesión - EscribanosARG",
  description: "Ingresá a tu cuenta de EscribanosARG",
};

export default function Page() {
  return <LoginPage />;
}