'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 mb-6">
          <AlertCircle className="h-8 w-8 text-rose-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Algo salió mal
        </h2>
        
        <p className="text-slate-600 mb-8">
          Por favor intentá de nuevo más tarde o contactanos si el problema persiste.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="accent">
            Intentar nuevamente
          </Button>
          
          <Link href="/">
            <Button variant="outline">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}