"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SERVICIOS_NOTARIALES, UBICACIONES_AÑO_1 } from "@/types";

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/buscar?${params.toString()}`);
  };

  const clearFilters = () => router.push("/buscar");

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5" /> Filtros
          </CardTitle>
          {searchParams.toString() && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="mr-1 h-4 w-4" /> Limpiar
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Servicio</Label>
          <Select value={searchParams.get("servicio") || ""} onChange={(e) => updateFilter("servicio", e.target.value)}>
            <option value="">Todos los servicios</option>
            {Object.entries(SERVICIOS_NOTARIALES).map(([key, s]) => (
              <option key={key} value={key}>{s.nombre}</option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Ubicación</Label>
          <Select value={searchParams.get("ubicacion") || ""} onChange={(e) => updateFilter("ubicacion", e.target.value)}>
            <option value="">Todas las ubicaciones</option>
            {UBICACIONES_AÑO_1.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Modalidad</Label>
          <Select value={searchParams.get("modalidad") || ""} onChange={(e) => updateFilter("modalidad", e.target.value)}>
            <option value="">Todas</option>
            <option value="PRESENCIAL">Presencial</option>
            <option value="VIRTUAL">Virtual</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Calificación mínima</Label>
          <Select value={searchParams.get("calificacion") || ""} onChange={(e) => updateFilter("calificacion", e.target.value)}>
            <option value="">Cualquiera</option>
            <option value="4.5">4.5+ estrellas</option>
            <option value="4">4+ estrellas</option>
            <option value="3.5">3.5+ estrellas</option>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
