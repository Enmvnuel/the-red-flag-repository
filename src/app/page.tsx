import Link from "next/link";
import { TrendingUp, Users, Shield, AlertTriangle, Search, Flag } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <section className="relative overflow-hidden px-6 py-20 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.red.100),white)] opacity-20" />
        
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            <TrendingUp className="h-4 w-4" />
            #1 en tendencia Perú
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
            Expone la <span className="text-red-600">Infidelidad</span>
          </h1>
          
          <p className="mt-6 text-xl leading-8 text-gray-600 sm:text-2xl">
            Plataforma pública para denunciar y descubrir personas infieles.
            <br />
            <span className="font-semibold text-gray-900">Protege a la comunidad.</span>
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/denunciar"
              className="group flex items-center gap-2 rounded-full bg-red-600 px-8 py-4 text-lg font-bold text-white shadow-2xl shadow-red-600/40 transition-all hover:scale-105 hover:bg-red-700"
            >
              <Flag className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Hacer una Denuncia
            </Link>
            
            <Link
              href="/buscar"
              className="flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-all hover:border-red-600 hover:text-red-600"
            >
              <Search className="h-5 w-5" />
              Buscar Personas
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-red-50 p-8 transition-all hover:border-red-300 hover:shadow-xl">
              <div className="mb-4 inline-flex rounded-full bg-red-100 p-3">
                <Users className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">+12,847</h3>
              <p className="mt-2 text-gray-600">Denuncias registradas</p>
            </div>

            <div className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-orange-50 p-8 transition-all hover:border-orange-300 hover:shadow-xl">
              <div className="mb-4 inline-flex rounded-full bg-orange-100 p-3">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">+8,523</h3>
              <p className="mt-2 text-gray-600">Usuarios protegidos</p>
            </div>

            <div className="group rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-yellow-50 p-8 transition-all hover:border-yellow-300 hover:shadow-xl">
              <div className="mb-4 inline-flex rounded-full bg-yellow-100 p-3">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">100%</h3>
              <p className="mt-2 text-gray-600">Transparencia total</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900">¿Cómo funciona?</h2>
          <p className="mt-4 text-lg text-gray-600">Tres pasos simples para proteger a otros</p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="relative">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">Denuncia</h3>
              <p className="mt-2 text-gray-600">Completa el formulario con información detallada</p>
            </div>

            <div className="relative">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">Verifica</h3>
              <p className="mt-2 text-gray-600">Proporciona evidencias para validar tu reporte</p>
            </div>

            <div className="relative">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">Publica</h3>
              <p className="mt-2 text-gray-600">Tu denuncia será visible públicamente</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
