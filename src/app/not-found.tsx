import Link from "next/link";
import { AlertTriangle, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-slate-50 px-6">
      <div className="text-center">
        <div className="mb-8 inline-flex items-center justify-center rounded-full bg-rose-100 p-6 animate-bounce">
          <AlertTriangle className="h-20 w-20 text-rose-600" />
        </div>

        <h1 className="mb-4 text-9xl font-black text-slate-900 tracking-tighter">404</h1>
        
        <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Página no encontrada
        </h2>
        
        <p className="mb-8 text-lg text-slate-600 max-w-md mx-auto">
          Parece que te has perdido. La página que buscas no existe o ha sido movida a otra ubicación.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 px-8 py-4 font-bold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-700 hover:shadow-xl hover:-translate-y-1"
          >
            <Home className="h-5 w-5" />
            Ir al inicio
          </Link>
          
          <Link
            href="/buscar"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition-all hover:border-rose-200 hover:text-rose-600 hover:shadow-md"
          >
            <Search className="h-5 w-5" />
            Buscar denuncias
          </Link>
        </div>

        <div className="mt-12 text-sm text-slate-500">
          ¿Crees que esto es un error? <Link href="/" className="text-rose-600 font-medium hover:underline">Contáctanos</Link>
        </div>
      </div>
    </div>
  );
}
