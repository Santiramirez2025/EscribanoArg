// app/api/escribanos/buscar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// =============================================================================
// GET /api/escribanos/buscar
// =============================================================================

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parámetros de búsqueda
    const servicio = searchParams.get("servicio");
    const ubicacion = searchParams.get("ubicacion");
    const modalidad = searchParams.get("modalidad");
    const calificacionMin = searchParams.get("calificacionMin");
    const disponibilidad = searchParams.get("disponibilidad");
    const ordenar = searchParams.get("ordenar") || "relevancia";
    const query = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Construir WHERE clause
    const where: Prisma.EscribanoWhereInput = {
      activo: true,
      // Solo mostrar escribanos con usuarios activos
      user: {
        role: "ESCRIBANO",
      },
    };

    // Filtro por servicio (basado en precios disponibles)
    if (servicio) {
      switch (servicio) {
        case "ESCRITURAS":
          where.precioEscrituras = { not: null };
          break;
        case "DECLARATORIA":
          where.precioDeclaratoria = { not: null };
          break;
        case "PODERES":
          where.precioPoderes = { not: null };
          break;
        case "CERTIFICACIONES":
          where.precioCertificaciones = { not: null };
          break;
        case "TESTAMENTOS":
          where.precioTestamentos = { not: null };
          break;
        case "DONACIONES":
          where.precioDonaciones = { not: null };
          break;
        case "USUFRUCTO":
          where.precioUsufructo = { not: null };
          break;
        case "LOTEOS":
          where.precioLoteos = { not: null };
          break;
        case "REGIMEN_PH":
          where.precioRegimenPH = { not: null };
          break;
        case "FIDEICOMISOS":
          where.precioFideicomisos = { not: null };
          break;
        case "AUTORIZACIONES":
          where.precioAutorizaciones = { not: null };
          break;
      }
    }

    // Filtro por ubicación (busca en localidad/dirección)
    if (ubicacion) {
      where.OR = [
        { ubicacion: { contains: ubicacion, mode: "insensitive" } },
        { direccion: { contains: ubicacion, mode: "insensitive" } },
      ];
    }

    // Filtro por modalidad
    if (modalidad === "presencial") {
      where.atencionPresencial = true;
    } else if (modalidad === "virtual") {
      where.atencionVirtual = true;
    }

    // Filtro por calificación mínima
    if (calificacionMin) {
      where.calificacion = { gte: parseFloat(calificacionMin) };
    }

    // Búsqueda por texto (nombre, matrícula, etc.)
    if (query) {
      where.OR = [
        { user: { name: { contains: query, mode: "insensitive" } } },
        { matricula: { contains: query, mode: "insensitive" } },
        { ubicacion: { contains: query, mode: "insensitive" } },
      ];
    }

    // Determinar ordenamiento
    let orderBy: Prisma.EscribanoOrderByWithRelationInput[] = [];

    switch (ordenar) {
      case "calificacion":
        orderBy = [{ calificacion: "desc" }, { totalReviews: "desc" }];
        break;
      case "reviews":
        orderBy = [{ totalReviews: "desc" }, { calificacion: "desc" }];
        break;
      case "cercania":
        // TODO: Implementar ordenamiento por distancia geográfica
        orderBy = [{ ubicacion: "asc" }];
        break;
      default: // relevancia
        orderBy = [
          { verificado: "desc" },
          { calificacion: "desc" },
          { totalReviews: "desc" },
        ];
    }

    // Ejecutar búsqueda
    const [escribanos, total] = await Promise.all([
      prisma.escribano.findMany({
        where,
        orderBy,
        take: limit,
        skip: (page - 1) * limit,
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      }),
      prisma.escribano.count({ where }),
    ]);

    // Transformar resultados al formato esperado por el frontend
    const escribanosFormateados = escribanos.map((escribano) => {
      const [nombre, ...apellidoParts] = escribano.user.name.split(" ");
      const apellido = apellidoParts.join(" ");

      // Determinar modalidades disponibles
      const modalidades: ("presencial" | "virtual")[] = [];
      if (escribano.atencionPresencial) modalidades.push("presencial");
      if (escribano.atencionVirtual) modalidades.push("virtual");

      // Determinar servicios disponibles (basado en precios)
      const servicios: string[] = [];
      if (escribano.precioEscrituras) servicios.push("ESCRITURAS");
      if (escribano.precioDeclaratoria) servicios.push("DECLARATORIA");
      if (escribano.precioPoderes) servicios.push("PODERES");
      if (escribano.precioCertificaciones) servicios.push("CERTIFICACIONES");
      if (escribano.precioTestamentos) servicios.push("TESTAMENTOS");
      if (escribano.precioDonaciones) servicios.push("DONACIONES");
      if (escribano.precioUsufructo) servicios.push("USUFRUCTO");
      if (escribano.precioLoteos) servicios.push("LOTEOS");
      if (escribano.precioRegimenPH) servicios.push("REGIMEN_PH");
      if (escribano.precioFideicomisos) servicios.push("FIDEICOMISOS");
      if (escribano.precioAutorizaciones) servicios.push("AUTORIZACIONES");

      // Precio más bajo disponible (convertir Decimal a number)
      const precios = [
        escribano.precioEscrituras,
        escribano.precioDeclaratoria,
        escribano.precioPoderes,
        escribano.precioCertificaciones,
        escribano.precioTestamentos,
        escribano.precioDonaciones,
        escribano.precioUsufructo,
        escribano.precioLoteos,
        escribano.precioRegimenPH,
        escribano.precioFideicomisos,
        escribano.precioAutorizaciones,
      ]
        .filter((p): p is Exclude<typeof p, null> => p !== null)
        .map((p) => Number(p));

      const precioConsulta = precios.length > 0 ? Math.min(...precios) : null;

      // Determinar si es destacado (plan NOTARIO_PRO)
      const destacado = escribano.plan === "NOTARIO_PRO";

      return {
        id: escribano.id,
        nombre,
        apellido,
        foto: escribano.user.image,
        matricula: escribano.matricula,
        localidad: escribano.ubicacion,
        provincia: "Córdoba", // TODO: Extraer de dirección o agregar campo
        calificacion: escribano.calificacion,
        totalReviews: escribano.totalReviews,
        precioConsulta,
        modalidades,
        servicios,
        verificado: escribano.verificado,
        destacado,
        disponibilidadInmediata: false, // TODO: Implementar lógica real
      };
    });

    return NextResponse.json({
      escribanos: escribanosFormateados,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error en búsqueda de escribanos:", error);
    return NextResponse.json(
      { error: "Error al buscar escribanos" },
      { status: 500 }
    );
  }
}