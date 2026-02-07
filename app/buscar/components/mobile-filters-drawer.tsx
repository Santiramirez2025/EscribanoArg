// app/buscar/components/mobile-filters-drawer.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterSelect, FilterInput, RatingFilter } from "./filter-inputs";
import { Filtros, SERVICIOS_OPTIONS, MODALIDAD_OPTIONS } from "../types";

interface MobileFiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filtros: Filtros;
  setFiltros: (filtros: Filtros) => void;
  onApply: () => void;
}

export function MobileFiltersDrawer({
  isOpen,
  onClose,
  filtros,
  setFiltros,
  onApply,
}: MobileFiltersDrawerProps) {
  const handleClear = () => {
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-auto lg:hidden"
          >
            {/* Handle */}
            <div className="sticky top-0 bg-white pt-3 pb-2 px-4 border-b border-slate-100 z-10">
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-800">Filtros</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                  aria-label="Cerrar filtros"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Filters Content */}
            <div className="p-4 space-y-5">
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
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 flex gap-3 z-10">
              <Button variant="outline" className="flex-1" onClick={handleClear}>
                Limpiar
              </Button>
              <Button variant="accent" className="flex-1" onClick={onApply}>
                Aplicar filtros
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}