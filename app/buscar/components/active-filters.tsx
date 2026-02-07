// app/buscar/components/active-filters.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Filtros, SERVICIOS_OPTIONS, MODALIDAD_OPTIONS } from "../types";

interface ActiveFiltersProps {
  filtros: Filtros;
  onRemove: (key: keyof Filtros) => void;
  onClearAll: () => void;
}

export function ActiveFilters({ filtros, onRemove, onClearAll }: ActiveFiltersProps) {
  const activeFilters: { key: keyof Filtros; label: string }[] = [];

  if (filtros.servicio) {
    const servicio = SERVICIOS_OPTIONS.find((s) => s.value === filtros.servicio);
    activeFilters.push({ key: "servicio", label: servicio?.label || filtros.servicio });
  }
  if (filtros.ubicacion) {
    activeFilters.push({ key: "ubicacion", label: filtros.ubicacion });
  }
  if (filtros.modalidad) {
    const modalidad = MODALIDAD_OPTIONS.find((m) => m.value === filtros.modalidad);
    activeFilters.push({ key: "modalidad", label: modalidad?.label || filtros.modalidad });
  }
  if (filtros.calificacionMin) {
    activeFilters.push({ key: "calificacionMin", label: `${filtros.calificacionMin}+ ★` });
  }

  if (activeFilters.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="flex flex-wrap items-center gap-2"
      >
        <span className="text-sm text-slate-500">Filtros activos:</span>
        {activeFilters.map((filter) => (
          <motion.span
            key={filter.key}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-amber-100 text-amber-800"
          >
            {filter.label}
            <button
              onClick={() => onRemove(filter.key)}
              className="hover:bg-amber-200 rounded-full p-0.5 transition-colors"
              aria-label={`Eliminar filtro ${filter.label}`}
            >
              <X className="w-3 h-3" />
            </button>
          </motion.span>
        ))}
        <button
          onClick={onClearAll}
          className="text-sm text-slate-500 hover:text-slate-700 underline transition-colors"
        >
          Limpiar todos
        </button>
      </motion.div>
    </AnimatePresence>
  );
}