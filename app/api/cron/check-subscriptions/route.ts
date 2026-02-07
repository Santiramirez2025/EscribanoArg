// app/api/cron/check-subscriptions/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Verificar cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();

    // 1. Actualizar suscripciones pendientes que ya pasaron la fecha de inicio
    await prisma.subscription.updateMany({
      where: {
        status: "PENDING",
        startDate: {
          lte: now,
        },
      },
      data: {
        status: "ACTIVE",
      },
    });

    // 2. Marcar como vencidas las suscripciones activas que pasaron su fecha de fin
    const expiredSubscriptions = await prisma.subscription.updateMany({
      where: {
        status: "ACTIVE",
        endDate: {
          lte: now,
        },
      },
      data: {
        status: "EXPIRED",
      },
    });

    // 3. Actualizar estado de escribanos con suscripciones vencidas
    if (expiredSubscriptions.count > 0) {
      const expiredSubs = await prisma.subscription.findMany({
        where: {
          status: "EXPIRED",
        },
        select: {
          escribanoId: true,
        },
      });

      const escribanoIds = expiredSubs.map(sub => sub.escribanoId);

      await prisma.escribano.updateMany({
        where: {
          id: {
            in: escribanoIds,
          },
        },
        data: {
          estadoPago: "VENCIDO",
          activo: false,
        },
      });
    }

    // 4. Enviar notificaciones de próximos vencimientos (7 días antes)
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const upcomingExpirations = await prisma.subscription.findMany({
      where: {
        status: "ACTIVE",
        endDate: {
          gte: now,
          lte: sevenDaysFromNow,
        },
      },
      include: {
        escribano: {
          include: {
            user: true,
          },
        },
      },
    });

    // TODO: Enviar emails de notificación
    for (const sub of upcomingExpirations) {
      await prisma.notification.create({
        data: {
          userId: sub.escribano.userId,
          type: "PLAN_EXPIRA_PRONTO",
          title: "Tu plan está por vencer",
          message: `Tu suscripción vence el ${sub.endDate.toLocaleDateString("es-AR")}. Renovalo para seguir recibiendo consultas.`,
          link: "/dashboard/subscription",
        },
      });
    }

    return NextResponse.json({
      success: true,
      updatedPending: await prisma.subscription.count({ where: { status: "PENDING" } }),
      expiredSubscriptions: expiredSubscriptions.count,
      upcomingExpirations: upcomingExpirations.length,
    });

  } catch (error) {
    console.error("Cron check-subscriptions error:", error);
    return NextResponse.json(
      { error: "Error al verificar suscripciones" },
      { status: 500 }
    );
  }
}