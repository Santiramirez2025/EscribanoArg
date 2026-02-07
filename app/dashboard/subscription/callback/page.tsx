// app/dashboard/subscription/callback/page.tsx
import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
        <p className="text-slate-600">Procesando tu suscripción...</p>
      </div>
    </div>
  );
}

async function SubscriptionCallbackContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/login");
  }

  const { preapproval_id, status } = searchParams;

  if (!preapproval_id) {
    redirect("/dashboard");
  }

  // Buscar la suscripción usando el nombre correcto del campo
  const subscription = await prisma.subscription.findFirst({
    where: { mercadoPagoPreapprovalId: preapproval_id },
    include: {
      escribano: {
        include: { user: true },
      },
    },
  });

  if (!subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md p-8">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Suscripción no encontrada
          </h1>
          <p className="text-slate-600 mb-6">
            No pudimos encontrar tu suscripción. Por favor contactá a soporte.
          </p>
          <Link href="/dashboard">
            <Button variant="accent">Ir al Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Status puede ser: authorized, paused, cancelled
  if (status === "authorized") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md p-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            ¡Suscripción activada! 🎉
          </h1>
          <p className="text-slate-600 mb-2">
            Tu cuenta está lista para usar.
          </p>
          <p className="text-sm text-slate-500 mb-6">
            Tenés 15 días de prueba gratis. El primer cobro será el{" "}
            {subscription.startDate.toLocaleDateString("es-AR")}
          </p>
          <Link href="/dashboard">
            <Button variant="accent" size="lg">
              Ir a mi Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Otros estados
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-md p-8">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Pago pendiente
        </h1>
        <p className="text-slate-600 mb-6">
          Tu pago está siendo procesado. Te notificaremos por email cuando esté confirmado.
        </p>
        <Link href="/dashboard">
          <Button variant="outline">Ir al Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}

export default function SubscriptionCallbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SubscriptionCallbackContent searchParams={searchParams} />
    </Suspense>
  );
}