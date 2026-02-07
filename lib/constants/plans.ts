// lib/constants/plans.ts

export const PLANES_ESCRIBANOS = [
    {
      id: "BASICO",
      nombre: "Básico",
      precio: 29900, // $29.900 ARS/mes
      precioAnual: 299000, // $299.000 ARS/año (16% descuento)
      descripcion: "Perfecto para empezar",
      posicionamiento: "Para escribanos independientes",
      features: [
        "Perfil profesional completo",
        "Hasta 50 consultas/mes",
        "Agenda online integrada",
        "WhatsApp automático",
        "Notificaciones por email",
        "Estadísticas básicas",
      ],
      limites: {
        consultasMes: 50,
        escribanos: 1,
        almacenamiento: "5GB",
      },
      color: "sky",
      popular: false,
    },
    {
      id: "NOTARIO",
      nombre: "Notario",
      precio: 59900, // $59.900 ARS/mes
      precioAnual: 599000, // $599.000 ARS/año (16% descuento)
      descripcion: "Máxima visibilidad",
      posicionamiento: "Para escribanos establecidos",
      features: [
        "✨ Todo del Básico",
        "✨ Consultas ilimitadas",
        "✨ Posicionamiento destacado",
        "✨ Badge verificado premium",
        "✨ Videoconferencia integrada",
        "✨ Estadísticas avanzadas",
        "✨ Chat en vivo con clientes",
        "✨ Sin comisión por reserva",
      ],
      limites: {
        consultasMes: -1, // ilimitado
        escribanos: 1,
        almacenamiento: "20GB",
      },
      color: "amber",
      popular: true,
      badge: "Más elegido",
      ahorroVsBasico: "Se paga solo con 2 consultas extra/mes",
    },
    {
      id: "NOTARIO_PRO",
      nombre: "Estudio",
      precio: 99900, // $99.900 ARS/mes
      precioAnual: 999000, // $999.000 ARS/año (16% descuento)
      descripcion: "Para estudios jurídicos",
      posicionamiento: "Múltiples escribanos",
      features: [
        "🏢 Todo del Notario",
        "🏢 Hasta 5 escribanos",
        "🏢 Gestión centralizada",
        "🏢 Branding personalizado",
        "🏢 Subdominio propio",
        "🏢 Account manager dedicado",
        "🏢 Prioridad en soporte",
        "🏢 API de integración",
      ],
      limites: {
        consultasMes: -1,
        escribanos: 5,
        almacenamiento: "100GB",
      },
      color: "purple",
      popular: false,
      badge: "Mejor valor",
      ahorroVsIndividual: "5 escribanos × $59.900 = $299.500 (ahorrás $199.600)",
    },
  ] as const;
  
  export type PlanId = typeof PLANES_ESCRIBANOS[number]['id'];