// app/buscar/components/empty-state.tsx
"use client";

import { motion } from "framer-motion";
import { SearchX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
        <SearchX className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-800 mb-2">
        No encontramos escribanos
      </h3>
      <p className="text-slate-500 max-w-md mx-auto mb-6">
        Probá ajustando los filtros o buscando en otra zona. También podés limpiar
        los filtros para ver todos los profesionales disponibles.
      </p>
      <Button variant="outline" onClick={onReset}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Limpiar filtros
      </Button>
    </motion.div>
  );
}