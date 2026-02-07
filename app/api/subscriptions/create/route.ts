// app/api/subscriptions/create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { preApprovalAPI } from "@/lib/mercadopago";
import { PLANES_ESCRIBANOS } from "@/lib/constants/plans";

export async function POST(request: Request) {
  try {
    const { escribanoId, planId, billingCycle } = await request.json();

    // Validar que el escribano existe
    const escribano = await prisma.escribano.findUnique({
      where: { id: escribanoId },
      include: { user: true },
    });

    if (!escribano) {
      return NextResponse.json(
        { error: "Escribano no encontrado" },
        { status: 404 }
      );
    }

    // Validar plan
    const plan = PLANES_ESCRIBANOS.find(p => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { error: "Plan inválido" },
        { status: 400 }
      );
    }

    // Calcular precio
    const amount = billingCycle === 'ANNUAL' ? plan.precioAnual : plan.precio;
    const amountDecimal = amount / 100; // Convertir centavos a pesos

    // Crear preapproval en MercadoPago
    const preapprovalData = {
      reason: `EscribanosARG - Plan ${plan.nombre}`,
      payer_email: escribano.user.email,
      auto_recurring: {
        frequency: billingCycle === 'ANNUAL' ? 12 : 1,
        frequency_type: 'months' as const,
        transaction_amount: amountDecimal,
        currency_id: 'ARS' as const,
        free_trial: {
          frequency: 15,
          frequency_type: 'days' as const,
        },
      },
      back_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription/callback`,
      external_reference: escribanoId,
    };

    // Usar el nuevo SDK
    const preapproval = await preApprovalAPI.create({ body: preapprovalData });

    // Crear subscription en la DB
    const startDate = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // Inicia después del trial
    const endDate = billingCycle === 'ANNUAL'
      ? new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000)
      : new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    const subscription = await prisma.subscription.create({
      data: {
        escribanoId,
        mercadoPagoPreapprovalId: preapproval.id,
        currentPlan: planId as "BASICO" | "NOTARIO" | "NOTARIO_PRO",
        amount: amountDecimal,
        currency: 'ARS',
        status: 'PENDING',
        startDate,
        endDate,
        nextBillingDate: endDate,
      },
    });

    // Actualizar el plan del escribano
    await prisma.escribano.update({
      where: { id: escribanoId },
      data: {
        plan: planId as "BASICO" | "NOTARIO" | "NOTARIO_PRO",
        planExpiraEn: endDate,
        estadoPago: 'ACTIVO',
        activo: true,
      },
    });

    return NextResponse.json({
      subscription,
      checkoutUrl: preapproval.init_point,
    });

  } catch (error: any) {
    console.error("Subscription creation error:", error);
    return NextResponse.json(
      { error: error.message || "Error al crear suscripción" },
      { status: 500 }
    );
  }
}