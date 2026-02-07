// app/api/webhooks/mercadopago/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { preApprovalAPI, paymentAPI } from "@/lib/mercadopago";

// Verificar firma de MercadoPago
function verifyWebhookSignature(
  xSignature: string,
  xRequestId: string,
  dataID: string
): boolean {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET!;
  
  const parts = xSignature.split(",");
  let ts: string | null = null;
  let hash: string | null = null;

  parts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") ts = trimmedValue;
      if (trimmedKey === "v1") hash = trimmedValue;
    }
  });

  if (!ts || !hash) return false;

  const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(manifest);
  const expectedHash = hmac.digest("hex");

  return hash === expectedHash;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    
    const xSignature = headersList.get("x-signature");
    const xRequestId = headersList.get("x-request-id");

    if (xSignature && xRequestId && body.data?.id) {
      const isValid = verifyWebhookSignature(
        xSignature,
        xRequestId,
        body.data.id
      );
      
      if (!isValid) {
        console.error("Invalid webhook signature");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    console.log("MercadoPago Webhook:", JSON.stringify(body, null, 2));

    const { type, action, data } = body;

    switch (type) {
      case "payment":
        await handlePaymentEvent(data.id, action);
        break;
      
      case "subscription_preapproval":
        await handleSubscriptionEvent(data.id, action);
        break;
      
      case "subscription_authorized_payment":
        await handleAuthorizedPaymentEvent(data.id);
        break;
      
      default:
        console.log("Unhandled webhook type:", type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handlePaymentEvent(paymentId: string, action: string) {
  try {
    const payment = await paymentAPI.get({ id: paymentId });

    console.log("Payment event:", action, payment.status);

    const subscription = await prisma.subscription.findFirst({
      where: {
        OR: [
          { mercadoPagoPreapprovalId: payment.external_reference },
          { escribano: { id: payment.external_reference } },
        ],
      },
      include: { escribano: { include: { user: true } } },
    });

    if (!subscription) {
      console.error("Subscription not found for payment:", paymentId);
      return;
    }

    await prisma.payment.upsert({
      where: { mercadoPagoPaymentId: paymentId },
      create: {
        subscriptionId: subscription.id,
        mercadoPagoPaymentId: paymentId,
        amount: payment.transaction_amount || 0,
        status: mapPaymentStatus(payment.status || 'pending'),
        paymentMethod: payment.payment_method_id || null,
        paidAt: payment.status === "approved" ? new Date() : null,
      },
      update: {
        status: mapPaymentStatus(payment.status || 'pending'),
        paidAt: payment.status === "approved" ? new Date() : null,
      },
    });

    if (payment.status === "approved") {
      await handleApprovedPayment(subscription.id);
    } else if (payment.status === "rejected") {
      await handleRejectedPayment(subscription.id);
    }

  } catch (error) {
    console.error("Error handling payment event:", error);
  }
}

function mapPaymentStatus(mpStatus: string): "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED" | "REFUNDED" {
  switch (mpStatus) {
    case 'approved': return 'APPROVED';
    case 'rejected': return 'REJECTED';
    case 'cancelled': return 'CANCELLED';
    case 'refunded': return 'REFUNDED';
    default: return 'PENDING';
  }
}

async function handleSubscriptionEvent(preapprovalId: string, action: string) {
  try {
    const preapproval = await preApprovalAPI.get({ id: preapprovalId });

    console.log("Subscription event:", action, preapproval.status);

    const subscription = await prisma.subscription.findFirst({
      where: { mercadoPagoPreapprovalId: preapprovalId },
    });

    if (!subscription) {
      console.error("Subscription not found:", preapprovalId);
      return;
    }

    switch (preapproval.status) {
      case "authorized":
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: { status: "ACTIVE" },
        });
        
        await prisma.escribano.update({
          where: { id: subscription.escribanoId },
          data: { 
            activo: true,
            estadoPago: 'ACTIVO',
          },
        });
        break;

      case "paused":
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: { status: "PAST_DUE" },
        });
        
        await prisma.escribano.update({
          where: { id: subscription.escribanoId },
          data: { 
            activo: false,
            estadoPago: 'SUSPENDIDO',
          },
        });
        break;

      case "cancelled":
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: { status: "CANCELLED" },
        });
        
        await prisma.escribano.update({
          where: { id: subscription.escribanoId },
          data: { 
            activo: false,
            estadoPago: 'CANCELADO',
          },
        });
        break;
    }

  } catch (error) {
    console.error("Error handling subscription event:", error);
  }
}

async function handleApprovedPayment(subscriptionId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: { 
      escribano: { 
        include: { user: true } 
      } 
    },
  });

  if (!subscription) return;

  if (subscription.status === "PENDING") {
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: "ACTIVE" },
    });

    await prisma.escribano.update({
      where: { id: subscription.escribanoId },
      data: { 
        activo: true,
        estadoPago: 'ACTIVO',
      },
    });
  }
  else if (subscription.status === "PAST_DUE") {
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: "ACTIVE" },
    });

    await prisma.escribano.update({
      where: { id: subscription.escribanoId },
      data: { 
        activo: true,
        estadoPago: 'ACTIVO',
      },
    });
  }

  await prisma.notification.create({
    data: {
      userId: subscription.escribano.userId,
      type: "PAGO_EXITOSO",
      title: "Pago procesado exitosamente",
      message: "Tu suscripción ha sido renovada correctamente.",
      link: "/dashboard/subscription",
    },
  });
}

async function handleRejectedPayment(subscriptionId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
    include: { escribano: { include: { user: true } } },
  });

  if (!subscription) return;

  await prisma.subscription.update({
    where: { id: subscriptionId },
    data: { status: "PAST_DUE" },
  });

  await prisma.escribano.update({
    where: { id: subscription.escribanoId },
    data: { estadoPago: 'VENCIDO' },
  });

  await prisma.notification.create({
    data: {
      userId: subscription.escribano.userId,
      type: "PAGO_RECHAZADO",
      title: "Problema con tu pago",
      message: "No pudimos procesar tu pago. Por favor actualizá tu método de pago.",
      link: "/dashboard/subscription",
    },
  });
}

async function handleAuthorizedPaymentEvent(paymentId: string) {
  console.log("Authorized payment event:", paymentId);
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}