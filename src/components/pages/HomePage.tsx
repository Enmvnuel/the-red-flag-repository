import Link from "next/link";
import { TrendingUp, Users, Shield, AlertTriangle, Search, Flag, ChevronRight, Activity } from "lucide-react";
import { StatsCard } from "@/components/ui/StatsCard";
import { StepCard } from "@/components/ui/StepCard";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-rose-200 opacity-20 blur-3xl" />
          <div className="absolute top-1/2 right-0 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-orange-100 opacity-30 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-rose-100 bg-white/80 px-4 py-1.5 text-sm font-medium text-rose-600 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
            </span>
            #1 Plataforma de Transparencia en Relaciones
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-black tracking-tight text-slate-900 sm:text-7xl lg:leading-tight">
            Descubre la verdad, <br />
            <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
              protege tu corazón
            </span>
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-600 sm:text-xl">
            La base de datos colaborativa más grande para reportar y consultar antecedentes de infidelidad. 
            Únete a miles de usuarios que buscan transparencia.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/buscar"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 hover:shadow-2xl sm:w-auto"
            >
              <Search className="h-5 w-5" />
              Buscar Personas
            </Link>
            
            <Link
              href="/denunciar"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-rose-600 shadow-lg shadow-rose-100 transition-all hover:bg-rose-50 hover:shadow-xl sm:w-auto"
            >
              <Flag className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Hacer una Denuncia
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-60 grayscale transition-all hover:grayscale-0">
            {/* Placeholder for logos or trust text */}
            <span className="text-sm font-semibold text-slate-400">100% Anónimo</span>
            <span className="text-sm font-semibold text-slate-400">•</span>
            <span className="text-sm font-semibold text-slate-400">Verificado por la comunidad</span>
            <span className="text-sm font-semibold text-slate-400">•</span>
            <span className="text-sm font-semibold text-slate-400">Seguro y Confidencial</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <StatsCard 
              icon={Users}
              value="+12,847"
              label="Denuncias Activas"
              colorClass="text-rose-600"
              bgClass="bg-rose-100"
            />
            <StatsCard 
              icon={Shield}
              value="+8,523"
              label="Usuarios Protegidos"
              colorClass="text-emerald-600"
              bgClass="bg-emerald-100"
            />
            <StatsCard 
              icon={Activity}
              value="24/7"
              label="Monitoreo Continuo"
              colorClass="text-blue-600"
              bgClass="bg-blue-100"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              ¿Cómo funciona Red Flag?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Transparencia en 3 simples pasos
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <StepCard 
              number={1}
              title="Busca o Reporta"
              description="Consulta nuestra base de datos o comparte tu experiencia de forma anónima."
            />
            <StepCard 
              number={2}
              title="Verificación"
              description="Nuestro sistema y la comunidad validan la información para asegurar su veracidad."
            />
            <StepCard 
              number={3}
              title="Ayuda a Otros"
              description="Tu aporte ayuda a otras personas a tomar decisiones informadas."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-center shadow-2xl sm:px-16">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-rose-500 blur-3xl" />
              <div className="absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-500 blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                ¿Tienes una historia que contar?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
                Tu silencio no protege a nadie. Comparte tu experiencia y ayuda a construir una comunidad más honesta.
              </p>
              <div className="mt-10">
                <Link
                  href="/denunciar"
                  className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-rose-500 hover:scale-105"
                >
                  Comenzar Reporte
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
