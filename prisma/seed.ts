import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin
  const adminPass = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@escribanosarg.com.ar" },
    update: {},
    create: { email: "admin@escribanosarg.com.ar", name: "Admin", password: adminPass, role: "ADMIN" },
  });

  // Cliente
  const clientPass = await bcrypt.hash("cliente123", 12);
  await prisma.user.upsert({
    where: { email: "cliente@test.com" },
    update: {},
    create: { email: "cliente@test.com", name: "Juan Pérez", password: clientPass, role: "CLIENTE" },
  });

  // Escribanos
  const escribanos = [
    { name: "María García", email: "maria@test.com", matricula: "CBA1234", ubicacion: "Villa María", experiencia: 15, calificacion: 4.8 },
    { name: "Carlos Rodríguez", email: "carlos@test.com", matricula: "CBA2345", ubicacion: "Villa María", experiencia: 20, calificacion: 4.9 },
    { name: "Laura Fernández", email: "laura@test.com", matricula: "CBA3456", ubicacion: "Villa Nueva", experiencia: 8, calificacion: 4.7 },
  ];

  const pass = await bcrypt.hash("password123", 12);

  for (const e of escribanos) {
    const user = await prisma.user.upsert({
      where: { email: e.email },
      update: {},
      create: { email: e.email, name: e.name, password: pass, role: "ESCRIBANO" },
    });

    await prisma.escribano.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        matricula: e.matricula,
        ubicacion: e.ubicacion,
        experiencia: e.experiencia,
        calificacion: e.calificacion,
        totalReviews: Math.floor(Math.random() * 50) + 10,
        verificado: true,
        activo: true,
        plan: Math.random() > 0.5 ? "NOTARIO_PRO" : "NOTARIO",
        precioEscrituras: 150000,
        precioPoderes: 50000,
        precioCertificaciones: 15000,
      },
    });

    console.log(`✅ ${e.name}`);
  }

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
