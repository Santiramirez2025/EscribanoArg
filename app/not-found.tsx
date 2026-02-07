import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 mb-6">
          <FileQuestion className="h-8 w-8 text-slate-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Página no encontrada
        </h2>
        
        <p className="text-slate-600 mb-8">
          La página que buscás no existe o fue movida.
        </p>
        
        <Link href="/">
          <Button variant="accent">
            Volver al inicio
          </Button>
        </Link>
      </div>
    </div>
  );
}