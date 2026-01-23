"use client";

import { Suspense } from "react";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Star,
  Clock,
  Video,
  Building2,
  ChevronDown,
  ChevronRight,
  ArrowUpDown,
  Grid3X3,
  List,
  Loader2,
  SearchX,
  RefreshCw,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { cn, formatPrecioARS, getEstrellas, pluralize } from "@/lib/utils";

// =============================================================================
// TIPOS
// =============================================================================

interface Escribano {
  id: string;
  nombre: string;
  apellido: string;
  foto: string | null;
  matricula: string;
  localidad: string;
  provincia: string;
  calificacion: number;
  totalReviews: number;
  precioConsulta: number | null;
  modalidades: ("presencial" | "virtual" | "domicilio")[];
  servicios: string[];
  verificado: boolean;
  destacado: boolean;
  disponibilidadInmediata: boolean;
}

interface Filtros {
  servicio: string;
  ubicacion: string;
  modalidad: string;
  precioMin: string;
  precioMax: string;
  calificacionMin: string;
  disponibilidad: string;
  ordenar: string;
}

type ViewMode = "grid" | "list";

// =============================================================================
// DATOS MOCK
// =============================================================================

const SERVICIOS_OPTIONS = [
  { value: "", label: "Todos los servicios" },
  { value: "ESCRITURAS", label: "Escrituras" },
  { value: "DECLARATORIA", label: "Sucesiones" },
  { value: "PODERES", label: "Poderes" },
  { value: "TESTAMENTOS", label: "Testamentos" },
  { value: "DONACIONES", label: "Donaciones" },
  { value: "SOCIEDADES", label: "Sociedades" },
  { value: "CERTIFICACIONES", label: "Certificaciones" },
];

const MODALIDAD_OPTIONS = [
  { value: "", label: "Todas las modalidades" },
  { value: "presencial", label: "Presencial" },
  { value: "virtual", label: "Virtual (Zoom/Meet)" },
  { value: "domicilio", label: "A domicilio" },
];

const ORDENAR_OPTIONS = [
  { value: "relevancia", label: "Más relevantes" },
  { value: "calificacion", label: "Mejor calificados" },
  { value: "precio_asc", label: "Menor precio" },
  { value: "precio_desc", label: "Mayor precio" },
  { value: "cercania", label: "Más cercanos" },
];

const MOCK_ESCRIBANOS: Escribano[] = [
  {
    id: "1",
    nombre: "María Laura",
    apellido: "González",
    foto: null,
    matricula: "MAT-1234",
    localidad: "Villa María",
    provincia: "Córdoba",
    calificacion: 4.9,
    totalReviews: 127,
    precioConsulta: 15000,
    modalidades: ["presencial", "virtual"],
    servicios: ["ESCRITURAS", "PODERES", "DECLARATORIA"],
    verificado: true,
    destacado: true,
    disponibilidadInmediata: true,
  },
  {
    id: "2",
    nombre: "Carlos Alberto",
    apellido: "Rodríguez",
    foto: null,
    matricula: "MAT-5678",
    localidad: "Villa María",
    provincia: "Córdoba",
    calificacion: 4.7,
    totalReviews: 89,
    precioConsulta: 12000,
    modalidades: ["presencial"],
    servicios: ["ESCRITURAS", "TESTAMENTOS", "DONACIONES"],
    verificado: true,
    destacado: false,
    disponibilidadInmediata: false,
  },
  {
    id: "3",
    nombre: "Ana Sofía",
    apellido: "Martínez",
    foto: null,
    matricula: "MAT-9012",
    localidad: "Córdoba Capital",
    provincia: "Córdoba",
    calificacion: 4.8,
    totalReviews: 203,
    precioConsulta: 18000,
    modalidades: ["presencial", "virtual", "domicilio"],
    servicios: ["ESCRITURAS", "SOCIEDADES", "PODERES"],
    verificado: true,
    destacado: true,
    disponibilidadInmediata: true,
  },
  {
    id: "4",
    nombre: "Roberto",
    apellido: "Fernández",
    foto: null,
    matricula: "MAT-3456",
    localidad: "Bell Ville",
    provincia: "Córdoba",
    calificacion: 4.5,
    totalReviews: 45,
    precioConsulta: 10000,
    modalidades: ["presencial", "virtual"],
    servicios: ["ESCRITURAS", "DECLARATORIA"],
    verificado: true,
    destacado: false,
    disponibilidadInmediata: false,
  },
];

// =============================================================================
// ANIMACIONES
// =============================================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// =============================================================================
// COMPONENTES UI
// =============================================================================

function FilterSelect({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  icon?: React.ElementType;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-primary-700">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-xl border-2 border-gray-200 bg-white",
            "py-3 pr-10 text-sm text-primary-900",
            "focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20",
            "transition-all duration-200",
            Icon ? "pl-10" : "pl-4"
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400 pointer-events-none" />
      </div>
    </div>
  );
}

function FilterInput({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: React.ElementType;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-primary-700">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border-2 border-gray-200 bg-white",
            "py-3 pr-4 text-sm text-primary-900 placeholder:text-primary-400",
            "focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20",
            "transition-all duration-200",
            Icon ? "pl-10" : "pl-4"
          )}
        />
      </div>
    </div>
  );
}

function RatingFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const ratings = ["", "4", "4.5"];
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-primary-700">Calificación mínima</label>
      <div className="flex gap-2">
        {ratings.map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(rating)}
            className={cn(
              "flex-1 py-2.5 px-3 rounded-xl text-sm font-medium",
              "border-2 transition-all duration-200",
              value === rating
                ? "border-amber-400 bg-amber-50 text-amber-700"
                : "border-gray-200 bg-white text-primary-600 hover:border-gray-300"
            )}
          >
            {rating === "" ? "Todas" : `${rating}+`}
            {rating && <Star className="inline w-3 h-3 ml-1 fill-amber-400 text-amber-400" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function ActiveFilters({
  filtros,
  onRemove,
  onClearAll,
}: {
  filtros: Filtros;
  onRemove: (key: keyof Filtros) => void;
  onClearAll: () => void;
}) {
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
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="flex flex-wrap items-center gap-2"
    >
      <span className="text-sm text-primary-500">Filtros activos:</span>
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
          >
            <X className="w-3 h-3" />
          </button>
        </motion.span>
      ))}
      <button
        onClick={onClearAll}
        className="text-sm text-primary-500 hover:text-primary-700 underline"
      >
        Limpiar todos
      </button>
    </motion.div>
  );
}

// =============================================================================
// ESCRIBANO CARD
// =============================================================================

function EscribanoCard({
  escribano,
  viewMode,
}: {
  escribano: Escribano;
  viewMode: ViewMode;
}) {
  const estrellas = getEstrellas(escribano.calificacion);
  const initials = `${escribano.nombre[0]}${escribano.apellido[0]}`;

  if (viewMode === "list") {
    return (
      <motion.div
        variants={fadeInUp}
        whileHover={{ y: -2 }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div className="p-5 flex flex-col sm:flex-row gap-5">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              {escribano.foto ? (
                <img
                  src={escribano.foto}
                  alt={`${escribano.nombre} ${escribano.apellido}`}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">{initials}</span>
                </div>
              )}
              {escribano.verificado && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-primary-900">
                    {escribano.nombre} {escribano.apellido}
                  </h3>
                  {escribano.destacado && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                      Destacado
                    </span>
                  )}
                </div>
                <p className="text-sm text-primary-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {escribano.localidad}, {escribano.provincia}
                </p>
              </div>

              {/* Precio */}
              <div className="text-right">
                <p className="text-sm text-primary-500">Consulta desde</p>
                <p className="text-xl font-bold text-primary-900">
                  {formatPrecioARS(escribano.precioConsulta)}
                </p>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {estrellas.map((tipo, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      tipo === "full"
                        ? "fill-amber-400 text-amber-400"
                        : tipo === "half"
                        ? "fill-amber-400/50 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    )}
                  />
                ))}
                <span className="ml-1 font-semibold text-primary-900">
                  {escribano.calificacion.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-primary-500">
                ({pluralize(escribano.totalReviews, "opinión", "opiniones")})
              </span>
              {escribano.disponibilidadInmediata && (
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  Disponible hoy
                </span>
              )}
            </div>

            {/* Modalidades */}
            <div className="flex flex-wrap gap-2 mt-3">
              {escribano.modalidades.includes("presencial") && (
                <span className="inline-flex items-center gap-1 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                  <Building2 className="w-3 h-3" />
                  Presencial
                </span>
              )}
              {escribano.modalidades.includes("virtual") && (
                <span className="inline-flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
                  <Video className="w-3 h-3" />
                  Virtual
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="flex sm:flex-col gap-2 sm:justify-center">
            <Button variant="accent" size="md" className="flex-1 sm:flex-none">
              Ver perfil
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="md" className="flex-1 sm:flex-none">
              Agendar
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.01 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Header con avatar */}
      <div className="relative p-5 pb-0">
        {escribano.destacado && (
          <span className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full z-10">
            Destacado
          </span>
        )}
        <div className="flex items-center gap-4">
          <div className="relative">
            {escribano.foto ? (
              <img
                src={escribano.foto}
                alt={`${escribano.nombre} ${escribano.apellido}`}
                className="w-16 h-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                <span className="text-xl font-bold text-primary-600">{initials}</span>
              </div>
            )}
            {escribano.verificado && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-primary-900 truncate">
              {escribano.nombre} {escribano.apellido}
            </h3>
            <p className="text-sm text-primary-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{escribano.localidad}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {estrellas.slice(0, 5).map((tipo, i) => (
              <Star
                key={i}
                className={cn(
                  "w-4 h-4",
                  tipo === "full"
                    ? "fill-amber-400 text-amber-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            ))}
          </div>
          <span className="font-semibold text-primary-900">{escribano.calificacion.toFixed(1)}</span>
          <span className="text-sm text-primary-500">({escribano.totalReviews})</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {escribano.disponibilidadInmediata && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
              <Clock className="w-3 h-3" />
              Hoy
            </span>
          )}
          {escribano.modalidades.includes("virtual") && (
            <span className="inline-flex items-center gap-1 text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
              <Video className="w-3 h-3" />
              Virtual
            </span>
          )}
        </div>

        {/* Precio */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-primary-500">Desde</p>
            <p className="text-lg font-bold text-primary-900">
              {formatPrecioARS(escribano.precioConsulta)}
            </p>
          </div>
          <Button
            variant="accent"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Ver más
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// =============================================================================
// SKELETON LOADERS
// =============================================================================

function EscribanoCardSkeleton({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse">
        <div className="flex gap-5">
          <div className="w-20 h-20 bg-gray-200 rounded-2xl" />
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="space-y-2">
            <div className="h-10 w-24 bg-gray-200 rounded-xl" />
            <div className="h-10 w-24 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <div className="h-6 bg-gray-200 rounded w-20" />
        <div className="h-8 bg-gray-200 rounded-xl w-16" />
      </div>
    </div>
  );
}

// =============================================================================
// EMPTY STATE
// =============================================================================

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-4"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-100 flex items-center justify-center">
        <SearchX className="w-10 h-10 text-primary-400" />
      </div>
      <h3 className="text-xl font-semibold text-primary-900 mb-2">
        No encontramos escribanos
      </h3>
      <p className="text-primary-500 max-w-md mx-auto mb-6">
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

// =============================================================================
// MOBILE FILTERS DRAWER
// =============================================================================

function MobileFiltersDrawer({
  isOpen,
  onClose,
  filtros,
  setFiltros,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  filtros: Filtros;
  setFiltros: (filtros: Filtros) => void;
  onApply: () => void;
}) {
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring" as const, damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-auto lg:hidden"
          >
            {/* Handle */}
            <div className="sticky top-0 bg-white pt-3 pb-2 px-4 border-b border-gray-100">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary-900">Filtros</h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X className="w-5 h-5 text-primary-600" />
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

              <div className="grid grid-cols-2 gap-3">
                <FilterInput
                  label="Precio mín."
                  value={filtros.precioMin}
                  onChange={(v) => setFiltros({ ...filtros, precioMin: v })}
                  placeholder="$0"
                  type="number"
                />
                <FilterInput
                  label="Precio máx."
                  value={filtros.precioMax}
                  onChange={(v) => setFiltros({ ...filtros, precioMax: v })}
                  placeholder="$999.999"
                  type="number"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setFiltros({
                    servicio: "",
                    ubicacion: "",
                    modalidad: "",
                    precioMin: "",
                    precioMax: "",
                    calificacionMin: "",
                    disponibilidad: "",
                    ordenar: "relevancia",
                  });
                }}
              >
                Limpiar
              </Button>
              <Button
                variant="accent"
                className="flex-1"
                onClick={() => {
                  onApply();
                  onClose();
                }}
              >
                Aplicar filtros
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// =============================================================================
// SIDEBAR FILTERS (Desktop)
// =============================================================================

function SidebarFilters({
  filtros,
  setFiltros,
}: {
  filtros: Filtros;
  setFiltros: (filtros: Filtros) => void;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:block space-y-6"
    >
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-5 sticky top-24">
        <h3 className="font-semibold text-primary-900 flex items-center gap-2">
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

        <div>
          <label className="text-sm font-medium text-primary-700 mb-2 block">
            Rango de precios
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={filtros.precioMin}
              onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
              placeholder="Mín"
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none"
            />
            <input
              type="number"
              value={filtros.precioMax}
              onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
              placeholder="Máx"
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          onClick={() =>
            setFiltros({
              servicio: "",
              ubicacion: "",
              modalidad: "",
              precioMin: "",
              precioMax: "",
              calificacionMin: "",
              disponibilidad: "",
              ordenar: "relevancia",
            })
          }
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Limpiar filtros
        </Button>
      </div>
    </motion.aside>
  );
}

// =============================================================================
// COMPONENTE DE CONTENIDO (usa useSearchParams - debe estar en Suspense)
// =============================================================================

function BuscarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estados
  const [loading, setLoading] = useState(true);
  const [escribanos, setEscribanos] = useState<Escribano[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filtros, setFiltros] = useState<Filtros>({
    servicio: searchParams.get("servicio") || "",
    ubicacion: searchParams.get("ubicacion") || "",
    modalidad: searchParams.get("modalidad") || "",
    precioMin: searchParams.get("precioMin") || "",
    precioMax: searchParams.get("precioMax") || "",
    calificacionMin: searchParams.get("calificacionMin") || "",
    disponibilidad: searchParams.get("disponibilidad") || "",
    ordenar: searchParams.get("ordenar") || "relevancia",
  });

  // Simular carga
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setEscribanos(MOCK_ESCRIBANOS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filtros]);

  // Limpiar un filtro específico
  const removeFilter = useCallback((key: keyof Filtros) => {
    setFiltros((prev) => ({ ...prev, [key]: "" }));
  }, []);

  // Limpiar todos los filtros
  const clearAllFilters = useCallback(() => {
    setFiltros({
      servicio: "",
      ubicacion: "",
      modalidad: "",
      precioMin: "",
      precioMax: "",
      calificacionMin: "",
      disponibilidad: "",
      ordenar: "relevancia",
    });
  }, []);

  return (
    <main className="pb-20 lg:pb-0">
      {/* Hero compacto */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-950 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif"
            >
              Buscar Escribano
            </motion.h1>
            <motion.p variants={fadeInUp} className="mt-2 text-primary-200">
              {loading
                ? "Buscando profesionales..."
                : `${pluralize(escribanos.length, "escribano encontrado", "escribanos encontrados")}`}
            </motion.p>
          </motion.div>

          {/* Barra de búsqueda rápida */}
          <motion.div variants={fadeInUp} className="mt-6 max-w-2xl">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, servicio o zona..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-primary-300 focus:bg-white/20 focus:border-white/40 focus:outline-none transition-all"
                />
              </div>
              <Button
                variant="accent"
                size="lg"
                className="lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Active filters & controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <ActiveFilters
            filtros={filtros}
            onRemove={removeFilter}
            onClearAll={clearAllFilters}
          />

          <div className="flex items-center gap-3">
            {/* Ordenar */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-primary-500" />
              <select
                value={filtros.ordenar}
                onChange={(e) => setFiltros({ ...filtros, ordenar: e.target.value })}
                className="text-sm text-primary-700 bg-transparent border-0 focus:outline-none cursor-pointer"
              >
                {ORDENAR_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View toggle */}
            <div className="hidden sm:flex items-center bg-white rounded-xl border border-gray-200 p-1">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "list"
                    ? "bg-primary-100 text-primary-700"
                    : "text-primary-400 hover:text-primary-600"
                )}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  viewMode === "grid"
                    ? "bg-primary-100 text-primary-700"
                    : "text-primary-400 hover:text-primary-600"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
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
            {!loading && escribanos.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg">
                  <Loader2 className="w-4 h-4 mr-2" />
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
        onApply={() => {}}
      />
    </main>
  );
}

// =============================================================================
// LOADING FALLBACK
// =============================================================================

function BuscarPageLoading() {
  return (
    <main className="pb-20 lg:pb-0">
      <section className="bg-gradient-to-br from-primary-900 to-primary-950 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="h-10 bg-white/10 rounded-lg w-64 mb-2 animate-pulse" />
            <div className="h-6 bg-white/10 rounded-lg w-48 animate-pulse" />
          </div>
          <div className="mt-6 max-w-2xl">
            <div className="h-14 bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 grid gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// =============================================================================
// PÁGINA PRINCIPAL (con Suspense)
// =============================================================================

export default function BuscarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Suspense fallback={<BuscarPageLoading />}>
        <BuscarContent />
      </Suspense>

      <Footer />
    </div>
  );
}