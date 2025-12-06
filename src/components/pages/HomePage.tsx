import Link from "next/link";
import { Activity, ShieldCheck, FileStack, ChevronRight, Lock, UserCheck, Search, Siren, Eye } from "lucide-react";
import { StepCard } from "@/components/ui/StepCard";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans selection:bg-rose-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-40 bg-[url('/grid.svg')] bg-fixed">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/10 blur-[100px] rounded-full opacity-50" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full opacity-30" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-rose-200 bg-white/80 px-4 py-1.5 text-sm font-bold text-rose-600 shadow-lg shadow-rose-500/10 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500"></span>
            </span>
            Red de Transparencia y Seguridad
          </div>

          <h1 className="mx-auto max-w-5xl text-6xl font-black tracking-tight text-slate-900 sm:text-7xl lg:text-8xl lg:leading-[0.9]">
            ¿Es el indicado o <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600">
              una Infidelidad? 🚩
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-600 font-medium leading-relaxed">
            Investiga antes de ilusionarte. La comunidad donde exponemos las mentiras para que tú no tengas que vivirlas.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/buscar"
              className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-slate-900/20 transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-2xl sm:w-auto overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
              <Search className="h-5 w-5" />
              Iniciar Búsqueda
            </Link>

            <Link
              href="/denunciar"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-rose-600 shadow-xl shadow-rose-500/10 ring-1 ring-rose-100 transition-all hover:bg-rose-50 hover:ring-rose-200 hover:scale-105 sm:w-auto"
            >
              <Siren className="h-5 w-5 transition-transform group-hover:rotate-12" />
              Reportar Caso
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-80">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white/50 px-4 py-2 rounded-full border border-slate-200/50 backdrop-blur-sm">
              <Lock className="h-4 w-4 text-emerald-500" />
              100% Anónimo y Encriptado
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-white/50 px-4 py-2 rounded-full border border-slate-200/50 backdrop-blur-sm">
              <UserCheck className="h-4 w-4 text-blue-500" />
              Verificación Comunitaria
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - "Community Impact" */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12 flex items-end justify-between border-b border-slate-800 pb-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Impacto de la Comunidad</h2>
              <p className="text-slate-400 mt-1">Miles de personas compartiendo sus historias para proteger a otros.</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Comunidad Activa
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Stat Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:border-rose-500/50 hover:bg-slate-800">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileStack className="h-24 w-24 text-rose-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                  <FileStack className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Historias Reales</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight text-white">+12,847</span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                  <Activity className="h-3 w-3" /> +12%
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Casos reportados y verificados esta semana</p>

              {/* Fake Graph */}
              <div className="mt-6 flex items-end gap-1 h-8 opacity-30">
                {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-rose-500 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:bg-slate-800">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShieldCheck className="h-24 w-24 text-emerald-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Personas Alertadas</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight text-white">+8,523</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">Usuarios que evitaron una relación engañosa</p>

              <div className="mt-6 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[85%] rounded-full" />
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/50 p-6 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-slate-800">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Eye className="h-24 w-24 text-blue-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                  <Eye className="h-6 w-6" />
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Nuevos Reportes</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tight text-white">24/7</span>
              </div>
              <p className="mt-2 text-sm text-slate-400">La comunidad nunca duerme</p>

              <div className="mt-6 flex gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping delay-75" />
                <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping delay-150" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Protocolo de Transparencia
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Cómo funciona nuestro sistema de verificación y reporte
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <StepCard
              number={1}
              title="Identificación"
              description="Busca en nuestra base de datos o reporta un nuevo caso con evidencia."
            />
            <StepCard
              number={2}
              title="Verificación"
              description="Nuestro sistema y la comunidad validan la información cruzando datos."
            />
            <StepCard
              number={3}
              title="Alerta"
              description="La información se publica para proteger a otros usuarios de riesgos potenciales."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-16 text-center shadow-2xl sm:px-16 ring-1 ring-white/10">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-rose-500 blur-3xl" />
              <div className="absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 rounded-full bg-indigo-500 blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                ¿Tienes evidencia?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
                Tu silencio es su mejor aliado. Comparte tu historia de forma anónima y ayuda a otros a ver las señales.
              </p>
              <div className="mt-10">
                <Link
                  href="/denunciar"
                  className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-rose-500 hover:scale-105 shadow-lg shadow-rose-600/20"
                >
                  Iniciar Reporte
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
