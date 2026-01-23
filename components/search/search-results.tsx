import Link from "next/link";
import { MapPin, Video, BadgeCheck, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Rating } from "@/components/ui/rating";
import { formatPrecioARS } from "@/lib/utils";

// Datos de ejemplo - en producción vendrían de la DB
const escribanosEjemplo = [
  {
    id: "1",
    nombre: "María García López",
    matricula: "CBA1234",
    bio: "Escribana con más de 15 años de experiencia en escrituras públicas y sucesiones.",
    experiencia: 15,
    ubicacion: "Villa María",
    atencionPresencial: true,
    atencionVirtual: true,
    plan: "NOTARIO_PRO",
    calificacion: 4.8,
    totalReviews: 45,
    verificado: true,
    precioMinimo: 50000,
  },
  {
    id: "2",
    nombre: "Carlos Rodríguez",
    matricula: "CBA2345",
    bio: "Especialista en derecho inmobiliario y fideicomisos con 20 años de trayectoria.",
    experiencia: 20,
    ubicacion: "Villa María",
    atencionPresencial: true,
    atencionVirtual: true,
    plan: "NOTARIO",
    calificacion: 4.9,
    totalReviews: 78,
    verificado: true,
    precioMinimo: 60000,
  },
  {
    id: "3",
    nombre: "Laura Fernández",
    matricula: "CBA3456",
    bio: "Escribana joven especializada en testamentos y autorizaciones de viaje.",
    experiencia: 8,
    ubicacion: "Villa Nueva",
    atencionPresencial: true,
    atencionVirtual: true,
    plan: "NOTARIO",
    calificacion: 4.7,
    totalReviews: 32,
    verificado: true,
    precioMinimo: 40000,
  },
];

export function SearchResults() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">{escribanosEjemplo.length} escribanos encontrados</p>
      </div>

      <div className="space-y-4">
        {escribanosEjemplo.map((e) => (
          <Card key={e.id} className={`card-hover ${e.plan === "NOTARIO_PRO" ? "ring-2 ring-accent-500" : ""}`}>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0 relative">
                  <Avatar alt={e.nombre} size="xl" />
                  {e.verificado && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                      <div className="bg-green-500 rounded-full p-1">
                        <BadgeCheck className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-xl font-semibold font-serif text-primary-900">{e.nombre}</h3>
                        {e.plan === "NOTARIO_PRO" && <Badge variant="gold">Pro</Badge>}
                      </div>
                      <p className="text-sm text-gray-500">Mat. {e.matricula} · {e.experiencia} años exp.</p>
                    </div>
                    <Rating value={e.calificacion} showValue totalReviews={e.totalReviews} />
                  </div>

                  {e.bio && <p className="mt-3 text-sm text-gray-600 line-clamp-2">{e.bio}</p>}

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <MapPin className="h-4 w-4" /> {e.ubicacion}
                    </span>
                    {e.atencionPresencial && <Badge variant="outline">Presencial</Badge>}
                    {e.atencionVirtual && (
                      <Badge variant="outline">
                        <Video className="mr-1 h-3 w-3" /> Virtual
                      </Badge>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-500">
                        Desde <span className="text-lg font-semibold text-primary-900">{formatPrecioARS(e.precioMinimo)}</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/escribanos/${e.id}`}>
                        <Button variant="outline" size="sm">Ver perfil</Button>
                      </Link>
                      <Link href={`/escribanos/${e.id}/agendar`}>
                        <Button variant="accent" size="sm">
                          <Calendar className="mr-2 h-4 w-4" /> Agendar
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
