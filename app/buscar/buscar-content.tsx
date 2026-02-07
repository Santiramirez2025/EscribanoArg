"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  ArrowUpDown,
  Grid3X3,
  List,
  Loader2,
  RefreshCw,
  TrendingUp,
  Award,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { cn, pluralize } from "@/lib/utils";
import { Filtros, ViewMode, Escribano } from "./types";
import { SidebarFilters } from "./components/sidebar-filters";
import { MobileFiltersDrawer } from "./components/mobile-filters-drawer";
import { ActiveFilters } from "./components/active-filters";
import { EscribanoCard } from "./components/escribano-card";
import { EmptyState } from "./components/empty-state";
import { EscribanoCardSkeleton } from "./components/skeletons";
import { ORDENAR_OPTIONS } from "./types";

// =============================================================================
// ANIMACIONES PROFESIONALES
// =============================================================================

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.3,
      ease: "easeOut" as const
    } 
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2 }
  },
};

// =============================================================================
// TIPOS
// =============================================================================

interface BuscarContentProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================

export default function BuscarContent({ searchParams }: BuscarContentProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Estados
  const [loading, setLoading] = useState(true);
  const [escribanos, setEscribanos] = useState<Escribano[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filtros desde URL
  const [filtros, setFiltros] = useState<Filtros>(() => ({
    servicio: (searchParams.servicio as string) || "",
    ubicacion: (searchParams.ubicacion as string) || "",
    modalidad: (searchParams.modalidad as string) || "",
    calificacionMin: (searchParams.calificacionMin as string) || "",
    disponibilidad: (searchParams.disponibilidad as string) || "",
    ordenar: (searchParams.ordenar as string) || "relevancia",
  }));

  // =============================================================================
  // FUNCIÓN DE BÚSQUEDA
  // =============================================================================

  const fetchEscribanos = useCallback(async () => {
    setLoading(true);

    try {
      // Construir query params
      const params = new URLSearchParams();

      if (filtros.servicio) params.set("servicio", filtros.servicio);
      if (filtros.ubicacion) params.set("ubicacion", filtros.ubicacion);
      if (filtros.modalidad) params.set("modalidad", filtros.modalidad);
      if (filtros.calificacionMin) params.set("calificacionMin", filtros.calificacionMin);
      if (filtros.disponibilidad) params.set("disponibilidad", filtros.disponibilidad);
      if (filtros.ordenar) params.set("ordenar", filtros.ordenar);
      if (searchQuery) params.set("q", searchQuery);

      const response = await fetch(`/api/escribanos/buscar?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Error al buscar escribanos");
      }

      const data = await response.json();

      setEscribanos(data.escribanos || []);
      setTotalResults(data.total || 0);
    } catch (error) {
      console.error("Error fetching escribanos:", error);
      setEscribanos([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [filtros, searchQuery]);

  // =============================================================================
  // EFFECTS
  // =============================================================================

  // Fetch cuando cambian los filtros
  useEffect(() => {
    fetchEscribanos();
  }, [fetchEscribanos]);

  // Actualizar URL cuando cambian filtros
  useEffect(() => {
    const params = new URLSearchParams();

    if (filtros.servicio) params.set("servicio", filtros.servicio);
    if (filtros.ubicacion) params.set("ubicacion", filtros.ubicacion);
    if (filtros.modalidad) params.set("modalidad", filtros.modalidad);
    if (filtros.calificacionMin) params.set("calificacionMin", filtros.calificacionMin);
    if (filtros.disponibilidad) params.set("disponibilidad", filtros.disponibilidad);
    if (filtros.ordenar !== "relevancia") params.set("ordenar", filtros.ordenar);

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;

    router.replace(newUrl, { scroll: false });
  }, [filtros, pathname, router]);

  // =============================================================================
  // HANDLERS
  // =============================================================================

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      fetchEscribanos();
    },
    [fetchEscribanos]
  );

  const removeFilter = useCallback((key: keyof Filtros) => {
    setFiltros((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFiltros({
      servicio: "",
      ubicacion: "",
      modalidad: "",
      calificacionMin: "",
      disponibilidad: "",
      ordenar: "relevancia",
    });
    setSearchQuery("");
  }, []);

  // =============================================================================
  // COMPUTED VALUES
  // =============================================================================

  const hasActiveFilters = useMemo(() => {
    return Object.entries(filtros).some(
      ([key, value]) => key !== "ordenar" && value !== ""
    );
  }, [filtros]);

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-20 lg:pb-0">
        {/* Hero Profesional - Rediseñado */}
        <section className="bg-white border-b border-gray-200/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl mx-auto"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200/60 rounded-full mb-4">
                  <TrendingUp className="h-4 w-4 text-primary-700" strokeWidth={2.5} />
                  <span className="text-sm font-semibold text-primary-900 tracking-tight">
                    Plataforma Verificada
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight"
                >
                  Encontrá tu Escribano
                </motion.h1>
                
                <motion.p 
                  variants={fadeInUp} 
                  className="mt-4 text-lg text-gray-600 font-medium"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Buscando profesionales...
                    </span>
                  ) : (
                    `${pluralize(totalResults, "escribano verificado", "escribanos verificados")}`
                  )}
                </motion.p>
              </div>

              {/* Barra de búsqueda profesional */}
              <motion.div variants={fadeInUp}>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" strokeWidth={2} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar por nombre, servicio o ubicación..."
                      className={cn(
                        "w-full pl-12 pr-12 py-4 rounded-xl text-[15px]",
                        "bg-white border border-gray-300",
                        "text-gray-900 placeholder:text-gray-500 font-medium",
                        "focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20",
                        "transition-all duration-150 shadow-sm hover:border-gray-400"
                      )}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  {/* Botón de filtros móvil */}
                  <Button
                    size="lg"
                    className={cn(
                      "lg:hidden justify-center gap-2 font-semibold shadow-md h-[52px]",
                      "bg-white hover:bg-gray-50 text-gray-700",
                      "border-2 border-gray-300 hover:border-gray-400"
                    )}
                    onClick={() => setMobileFiltersOpen(true)}
                    type="button"
                  >
                    <SlidersHorizontal className="w-5 h-5" strokeWidth={2.5} />
                    Filtros
                  </Button>
                </form>
              </motion.div>

              {/* Stats rápidos */}
              <motion.div 
                variants={fadeInUp}
                className="mt-8 grid grid-cols-3 gap-4 sm:gap-6"
              >
                {[
                  { icon: Award, label: "Verificados", value: "100%" },
                  { icon: MapPin, label: "Todo el país", value: "AR" },
                  { icon: TrendingUp, label: "Respuesta", value: "<24h" },
                ].map((stat) => (
                  <div 
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-gray-50 border border-gray-200/60"
                  >
                    <stat.icon className="h-5 w-5 text-primary-700 mx-auto mb-2" strokeWidth={2.5} />
                    <div className="text-sm font-semibold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          {/* Controls bar profesional */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <ActiveFilters
              filtros={filtros}
              onRemove={removeFilter}
              onClearAll={clearAllFilters}
            />

            <div className="flex items-center gap-4">
              {/* Ordenar - Rediseñado */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                <ArrowUpDown className="w-4 h-4 text-gray-500" strokeWidth={2} />
                <select
                  value={filtros.ordenar}
                  onChange={(e) => setFiltros({ ...filtros, ordenar: e.target.value })}
                  className={cn(
                    "text-[15px] font-medium text-gray-700 bg-transparent",
                    "border-0 focus:outline-none cursor-pointer pr-8"
                  )}
                >
                  {ORDENAR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View toggle - Profesional */}
              <div className="hidden sm:flex items-center bg-white rounded-xl border border-gray-200 p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2.5 rounded-lg transition-all duration-150",
                    viewMode === "list"
                      ? "bg-gray-100 text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  )}
                  aria-label="Vista de lista"
                >
                  <List className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2.5 rounded-lg transition-all duration-150",
                    viewMode === "grid"
                      ? "bg-gray-100 text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  )}
                  aria-label="Vista de cuadrícula"
                >
                  <Grid3X3 className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid layout */}
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar - Desktop */}
            <SidebarFilters filtros={filtros} setFiltros={setFiltros} />

            {/* Results */}
            <div className="lg:col-span-3">
              {loading ? (
                <div
                  className={cn(
                    "grid gap-4",
                    viewMode === "grid"
                      ? "sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  )}
                >
                  {[...Array(6)].map((_, i) => (
                    <EscribanoCardSkeleton key={i} viewMode={viewMode} />
                  ))}
                </div>
              ) : escribanos.length === 0 ? (
                <EmptyState onReset={clearAllFilters} />
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className={cn(
                    "grid gap-4",
                    viewMode === "grid"
                      ? "sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  )}
                >
                  {escribanos.map((escribano) => (
                    <EscribanoCard
                      key={escribano.id}
                      escribano={escribano}
                      viewMode={viewMode}
                    />
                  ))}
                </motion.div>
              )}

              {/* Load more */}
              {!loading && escribanos.length > 0 && escribanos.length < totalResults && (
                <div className="mt-8 text-center">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    disabled
                    className="font-semibold"
                  >
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Cargar más resultados
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mobile Filters Drawer */}
        <MobileFiltersDrawer
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          filtros={filtros}
          setFiltros={setFiltros}
          onApply={() => setMobileFiltersOpen(false)}
        />
      </main>

      <Footer />
    </div>
  );
}