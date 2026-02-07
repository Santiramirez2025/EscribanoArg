// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, password, role, ...escribanoData } = body;

    // Validaciones básicas
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Validar contraseña
    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 12);

    // Crear usuario
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        password: hashedPassword,
        role: role as "CLIENTE" | "ESCRIBANO",
      },
    });

    // Si es escribano, crear perfil de escribano
    if (role === "ESCRIBANO") {
      const {
        matricula,
        colegioEscribanos,
        ubicacion,
        direccion,
        plan,
        provincia,
        localidad,
      } = escribanoData;

      // Validar campos de escribano
      if (!matricula || !ubicacion || !direccion) {
        // Eliminar usuario si falta información
        await prisma.user.delete({ where: { id: user.id } });
        return NextResponse.json(
          { error: "Faltan datos profesionales requeridos" },
          { status: 400 }
        );
      }

      // Verificar si la matrícula ya existe
      const existingMatricula = await prisma.escribano.findUnique({
        where: { matricula },
      });

      if (existingMatricula) {
        await prisma.user.delete({ where: { id: user.id } });
        return NextResponse.json(
          { error: "La matrícula ya está registrada" },
          { status: 400 }
        );
      }

      // Mapear plan string a enum (sin PRUEBA)
      let planType: "BASICO" | "NOTARIO" | "NOTARIO_PRO" = "BASICO";
      if (plan === "NOTARIO" || plan === "notario") planType = "NOTARIO";
      else if (plan === "NOTARIO_PRO" || plan === "notario-pro") planType = "NOTARIO_PRO";

      // Crear perfil de escribano
      await prisma.escribano.create({
        data: {
          userId: user.id,
          matricula,
          ubicacion,
          direccion,
          plan: planType,
          verificado: false,
          activo: false,
          // 15 días de prueba gratis
          planExpiraEn: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        },
      });

      // TODO: Enviar email de bienvenida para escribanos
      // TODO: Notificar a admin para verificación de matrícula
    } else {
      // TODO: Enviar email de bienvenida para clientes
    }

    return NextResponse.json(
      {
        message: "Usuario creado exitosamente",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}