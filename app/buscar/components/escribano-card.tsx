// app/buscar/components/escribano-card.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, MapPin, Clock, Video, Building2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatPrecioARS, getEstrellas, pluralize } from "@/lib/utils";
import { Escribano, ViewMode } from "../types";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface EscribanoCardProps {
  escribano: Escribano;
  viewMode: ViewMode;
}

export function EscribanoCard({ escribano, viewMode }: EscribanoCardProps) {
  const estrellas = getEstrellas(escribano.calificacion);
  const initials = `${escribano.nombre[0]}${escribano.apellido[0]}`;

  if (viewMode === "list") {
    return (
      <motion.article
        variants={fadeInUp}
        whileHover={{ y: -2 }}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden"
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
                  loading="lazy"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-500">{initials}</span>
                </div>
              )}
              {escribano.verificado && (
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white"
                  title="Perfil verificado"
                >
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
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {escribano.nombre} {escribano.apellido}
                  </h3>
                  {escribano.destacado && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                      Destacado
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {escribano.localidad}, {escribano.provincia}
                </p>
              </div>

              {/* Precio */}
              {escribano.precioConsulta && (
                <div className="text-right">
                  <p className="text-sm text-slate-500">Consulta desde</p>
                  <p className="text-xl font-bold text-slate-800">
                    {formatPrecioARS(escribano.precioConsulta)}
                  </p>
                </div>
              )}
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
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
                        : "fill-slate-200 text-slate-200"
                    )}
                  />
                ))}
                <span className="ml-1 font-semibold text-slate-800">
                  {escribano.calificacion.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-slate-500">
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
                <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
                  <Building2 className="w-3 h-3" />
                  Presencial
                </span>
              )}
              {escribano.modalidades.includes("virtual") && (
                <span className="inline-flex items-center gap-1 text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">
                  <Video className="w-3 h-3" />
                  Virtual
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="flex sm:flex-col gap-2 sm:justify-center">
            <Link href={`/escribano/${escribano.id}`} className="flex-1 sm:flex-none">
              <Button variant="accent" size="md" className="w-full">
                Ver perfil
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href={`/agendar/${escribano.id}`} className="flex-1 sm:flex-none">
              <Button variant="outline" size="md" className="w-full">
                Agendar
              </Button>
            </Link>
          </div>
        </div>
      </motion.article>
    );
  }

  // Grid view
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -4, scale: 1.01 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden group"
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
                loading="lazy"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <span className="text-xl font-bold text-slate-500">{initials}</span>
              </div>
            )}
            {escribano.verificado && (
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white"
                title="Perfil verificado"
              >
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 truncate">
              {escribano.nombre} {escribano.apellido}
            </h3>
            <p className="text-sm text-slate-500 flex items-center gap-1">
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
                    : "fill-slate-200 text-slate-200"
                )}
              />
            ))}
          </div>
          <span className="font-semibold text-slate-800">{escribano.calificacion.toFixed(1)}</span>
          <span className="text-sm text-slate-500">({escribano.totalReviews})</span>
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
            <span className="inline-flex items-center gap-1 text-xs text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">
              <Video className="w-3 h-3" />
              Virtual
            </span>
          )}
        </div>

        {/* Precio */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            {escribano.precioConsulta ? (
              <>
                <p className="text-xs text-slate-500">Desde</p>
                <p className="text-lg font-bold text-slate-800">
                  {formatPrecioARS(escribano.precioConsulta)}
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-500">Consultar precio</p>
            )}
          </div>
          <Link href={`/escribano/${escribano.id}`}>
            <Button
              variant="accent"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}