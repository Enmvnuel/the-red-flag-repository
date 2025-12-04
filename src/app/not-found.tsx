import Link from "next/link";
import { AlertTriangle, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-6">
      <div className="text-center">
        <div className="mb-8 inline-flex items-center justify-center rounded-full bg-red-100 p-6">
          <AlertTriangle className="h-20 w-20 text-red-600" />
        </div>

        <h1 className="mb-4 text-9xl font-extrabold text-gray-900">404</h1>
        
        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Página no encontrada
        </h2>
        
        <p className="mb-8 text-lg text-gray-600">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 font-bold text-white shadow-lg shadow-red-600/40 transition-all hover:bg-red-700 hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            Ir al inicio
          </Link>
          
          <Link
            href="/buscar"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 font-semibold text-gray-900 transition-all hover:border-gray-400"
          >
            <Search className="h-5 w-5" />
            Buscar denuncias
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          ¿Crees que esto es un error? <Link href="/" className="text-red-600 hover:underline">Contáctanos</Link>
        </div>
      </div>
    </div>
  );
}
