// app/buscar/components/sidebar-filters.tsx
"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, RefreshCw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterSelect, FilterInput, RatingFilter } from "./filter-inputs";
import { Filtros, SERVICIOS_OPTIONS, MODALIDAD_OPTIONS } from "../types";

interface SidebarFiltersProps {
  filtros: Filtros;
  setFiltros: (filtros: Filtros) => void;
}

export function SidebarFilters({ filtros, setFiltros }: SidebarFiltersProps) {
  const handleReset = () => {
    setFiltros({
      servicio: "",
      ubicacion: "",
      modalidad: "",
      calificacionMin: "",
      disponibilidad: "",
      ordenar: "relevancia",
    });
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:block space-y-6"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5 sticky top-24">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </h3>

        <FilterSelect
          label="Servicio"
          value={filtros.servicio}
          onChange={(v) => setFiltros({ ...filtros, servicio: v })}
          options={SERVICIOS_OPTIONS}
        />

        <FilterInput
          label="Ubicación"
          value={filtros.ubicacion}
          onChange={(v) => setFiltros({ ...filtros, ubicacion: v })}
          placeholder="Ciudad o zona"
          icon={MapPin}
        />

        <FilterSelect
          label="Modalidad"
          value={filtros.modalidad}
          onChange={(v) => setFiltros({ ...filtros, modalidad: v })}
          options={MODALIDAD_OPTIONS}
        />

        <RatingFilter
          value={filtros.calificacionMin}
          onChange={(v) => setFiltros({ ...filtros, calificacionMin: v })}
        />

        <Button variant="ghost" size="sm" className="w-full" onClick={handleReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Button>
      </div>
    </motion.aside>
  );
}