import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Campos requeridos" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Email ya registrado" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, password: hashed, phone: phone || null, role: role || "CLIENTE" },
    });

    return NextResponse.json({ message: "Usuario creado", userId: user.id }, { status: 201 });
  } catch (error) {
    console.error("Error registro:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
