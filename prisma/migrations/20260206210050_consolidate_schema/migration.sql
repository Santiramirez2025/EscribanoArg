-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENTE', 'ESCRIBANO', 'ADMIN');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('BASICO', 'NOTARIO', 'NOTARIO_PRO');

-- CreateEnum
CREATE TYPE "EstadoPago" AS ENUM ('ACTIVO', 'VENCIDO', 'SUSPENDIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('PENDING', 'ACTIVE', 'PAST_DUE', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "TipoServicio" AS ENUM ('ESCRITURAS', 'DECLARATORIA', 'PODERES', 'CERTIFICACIONES', 'TESTAMENTOS', 'DONACIONES', 'USUFRUCTO', 'LOTEOS', 'REGIMEN_PH', 'FIDEICOMISOS', 'AUTORIZACIONES', 'OTROS');

-- CreateEnum
CREATE TYPE "Modalidad" AS ENUM ('PRESENCIAL', 'VIRTUAL_ZOOM', 'VIRTUAL_WHATSAPP');

-- CreateEnum
CREATE TYPE "EstadoConsulta" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA', 'RECHAZADA');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('CONSULTA_NUEVA', 'CONSULTA_CONFIRMADA', 'CONSULTA_CANCELADA', 'REVIEW_NUEVA', 'PAGO_EXITOSO', 'PAGO_RECHAZADO', 'PLAN_EXPIRA_PRONTO', 'SISTEMA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escribano" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "bio" TEXT,
    "experiencia" INTEGER NOT NULL DEFAULT 0,
    "foto" TEXT,
    "ubicacion" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "atencionPresencial" BOOLEAN NOT NULL DEFAULT true,
    "atencionVirtual" BOOLEAN NOT NULL DEFAULT true,
    "whatsappNumber" TEXT,
    "plan" "PlanType" NOT NULL DEFAULT 'BASICO',
    "planExpiraEn" TIMESTAMP(3),
    "estadoPago" "EstadoPago" NOT NULL DEFAULT 'ACTIVO',
    "calificacion" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "precioEscrituras" DECIMAL(12,2),
    "precioDeclaratoria" DECIMAL(12,2),
    "precioPoderes" DECIMAL(12,2),
    "precioCertificaciones" DECIMAL(12,2),
    "precioTestamentos" DECIMAL(12,2),
    "precioDonaciones" DECIMAL(12,2),
    "precioUsufructo" DECIMAL(12,2),
    "precioLoteos" DECIMAL(12,2),
    "precioRegimenPH" DECIMAL(12,2),
    "precioFideicomisos" DECIMAL(12,2),
    "precioAutorizaciones" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Escribano_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "escribanoId" TEXT NOT NULL,
    "mercadoPagoSubscriptionId" TEXT,
    "mercadoPagoPreapprovalId" TEXT,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'PENDING',
    "currentPlan" "PlanType" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'ARS',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "nextBillingDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "mercadoPagoPaymentId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disponibilidad" (
    "id" TEXT NOT NULL,
    "escribanoId" TEXT NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disponibilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloqueHorario" (
    "id" TEXT NOT NULL,
    "escribanoId" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "motivo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BloqueHorario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "escribanoId" TEXT NOT NULL,
    "servicio" "TipoServicio" NOT NULL,
    "modalidad" "Modalidad" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "duracion" INTEGER NOT NULL DEFAULT 60,
    "detalles" TEXT,
    "estado" "EstadoConsulta" NOT NULL DEFAULT 'PENDIENTE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "escribanoId" TEXT NOT NULL,
    "consultaId" TEXT NOT NULL,
    "calificacion" INTEGER NOT NULL DEFAULT 5,
    "comentario" TEXT,
    "respuesta" TEXT,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Escribano_userId_key" ON "Escribano"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Escribano_matricula_key" ON "Escribano"("matricula");

-- CreateIndex
CREATE INDEX "Escribano_userId_idx" ON "Escribano"("userId");

-- CreateIndex
CREATE INDEX "Escribano_matricula_idx" ON "Escribano"("matricula");

-- CreateIndex
CREATE INDEX "Escribano_ubicacion_idx" ON "Escribano"("ubicacion");

-- CreateIndex
CREATE INDEX "Escribano_calificacion_idx" ON "Escribano"("calificacion");

-- CreateIndex
CREATE INDEX "Escribano_activo_idx" ON "Escribano"("activo");

-- CreateIndex
CREATE INDEX "Escribano_verificado_idx" ON "Escribano"("verificado");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_mercadoPagoSubscriptionId_key" ON "Subscription"("mercadoPagoSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_mercadoPagoPreapprovalId_key" ON "Subscription"("mercadoPagoPreapprovalId");

-- CreateIndex
CREATE INDEX "Subscription_escribanoId_idx" ON "Subscription"("escribanoId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

-- CreateIndex
CREATE INDEX "Subscription_nextBillingDate_idx" ON "Subscription"("nextBillingDate");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_mercadoPagoPaymentId_key" ON "Payment"("mercadoPagoPaymentId");

-- CreateIndex
CREATE INDEX "Payment_subscriptionId_idx" ON "Payment"("subscriptionId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_createdAt_idx" ON "Payment"("createdAt");

-- CreateIndex
CREATE INDEX "Disponibilidad_escribanoId_idx" ON "Disponibilidad"("escribanoId");

-- CreateIndex
CREATE INDEX "Disponibilidad_activo_idx" ON "Disponibilidad"("activo");

-- CreateIndex
CREATE UNIQUE INDEX "Disponibilidad_escribanoId_diaSemana_horaInicio_key" ON "Disponibilidad"("escribanoId", "diaSemana", "horaInicio");

-- CreateIndex
CREATE INDEX "BloqueHorario_escribanoId_fecha_idx" ON "BloqueHorario"("escribanoId", "fecha");

-- CreateIndex
CREATE INDEX "Consulta_clienteId_idx" ON "Consulta"("clienteId");

-- CreateIndex
CREATE INDEX "Consulta_escribanoId_idx" ON "Consulta"("escribanoId");

-- CreateIndex
CREATE INDEX "Consulta_fecha_idx" ON "Consulta"("fecha");

-- CreateIndex
CREATE INDEX "Consulta_estado_idx" ON "Consulta"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "Review_consultaId_key" ON "Review"("consultaId");

-- CreateIndex
CREATE INDEX "Review_escribanoId_idx" ON "Review"("escribanoId");

-- CreateIndex
CREATE INDEX "Review_calificacion_idx" ON "Review"("calificacion");

-- CreateIndex
CREATE INDEX "Review_createdAt_idx" ON "Review"("createdAt");

-- CreateIndex
CREATE INDEX "Notification_userId_read_idx" ON "Notification"("userId", "read");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- AddForeignKey
ALTER TABLE "Escribano" ADD CONSTRAINT "Escribano_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_escribanoId_fkey" FOREIGN KEY ("escribanoId") REFERENCES "Escribano"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disponibilidad" ADD CONSTRAINT "Disponibilidad_escribanoId_fkey" FOREIGN KEY ("escribanoId") REFERENCES "Escribano"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloqueHorario" ADD CONSTRAINT "BloqueHorario_escribanoId_fkey" FOREIGN KEY ("escribanoId") REFERENCES "Escribano"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_escribanoId_fkey" FOREIGN KEY ("escribanoId") REFERENCES "Escribano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_escribanoId_fkey" FOREIGN KEY ("escribanoId") REFERENCES "Escribano"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_consultaId_fkey" FOREIGN KEY ("consultaId") REFERENCES "Consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
