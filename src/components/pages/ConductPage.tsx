import { Heart, Users, MessageCircleOff, Ban, FileCheck, Gavel, HandHeart, RefreshCw, ShieldAlert, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ConductPage() {
    return (
        <div className="min-h-screen bg-slate-50 selection:bg-indigo-500 selection:text-white bg-[url('/grid.svg')] bg-fixed">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-100 mb-6">
                            <Users className="h-4 w-4" />
                            Comunidad Segura
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
                            Código de Conducta
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Exponme es más que una base de datos; es una comunidad. Estas son las reglas que nos mantienen unidos y seguros.
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
                            <RefreshCw className="h-4 w-4" />
                            Última actualización: Diciembre 2025
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Sidebar Navigation (Sticky) */}
                    <div className="hidden lg:col-span-3 lg:block">
                        <nav className="sticky top-8 space-y-1">
                            {[
                                { name: '1. Valores', icon: Heart },
                                { name: '2. Tolerancia Cero', icon: Ban },
                                { name: '3. Contenido', icon: FileCheck },
                                { name: '4. Consecuencias', icon: Gavel },
                                { name: '5. Tu Rol', icon: HandHeart },
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={`#section-${item.name.split('.')[0]}`}
                                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all"
                                >
                                    <item.icon className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <div className="space-y-12">

                            {/* Section 1 */}
                            <section id="section-1" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                                        <Heart className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">1. Nuestros Valores</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Detrás de cada reporte y cada usuario hay una persona real con sentimientos reales. Nuestra comunidad se basa en tres pilares fundamentales:
                                    </p>
                                    <div className="grid sm:grid-cols-3 gap-4 mt-6">
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                            <div className="mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-2xl">🤝</div>
                                            <h4 className="font-bold text-slate-900 mb-1">Empatía</h4>
                                            <p className="text-xs text-slate-500">Entendemos el dolor ajeno sin juzgar.</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                            <div className="mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-2xl">⚖️</div>
                                            <h4 className="font-bold text-slate-900 mb-1">Verdad</h4>
                                            <p className="text-xs text-slate-500">Buscamos hechos, no chismes.</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                                            <div className="mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-2xl">🛡️</div>
                                            <h4 className="font-bold text-slate-900 mb-1">Protección</h4>
                                            <p className="text-xs text-slate-500">Cuidamos a nuestra manada.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 2 */}
                            <section id="section-2" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
                                        <Ban className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">2. Lo que NO toleramos</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Queremos ser muy claros: <strong>Exponme no es un lugar para el odio.</strong> Serás expulsado inmediatamente si participas en:
                                    </p>
                                    <ul className="mt-4 space-y-3">
                                        <li className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100">
                                            <MessageCircleOff className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                            <span className="text-sm font-medium text-red-800"><strong>Acoso y Bullying:</strong> Intimidar, amenazar o avergonzar públicamente a otros usuarios.</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100">
                                            <ShieldAlert className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                            <span className="text-sm font-medium text-red-800"><strong>Discurso de Odio:</strong> Ataques basados en raza, etnia, religión, discapacidad, género u orientación sexual.</span>
                                        </li>
                                        <li className="flex items-start gap-3 p-3 rounded-xl bg-red-50/50 border border-red-100">
                                            <Ban className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                            <span className="text-sm font-medium text-red-800"><strong>Doxing Malicioso:</strong> Publicar información privada con la intención de causar daño físico o acoso en la vida real.</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 3 */}
                            <section id="section-3" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                                        <FileCheck className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">3. Reglas de Contenido</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Para mantener la calidad de la plataforma, todo reporte debe cumplir con estándares básicos:
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex gap-2">
                                            <span className="font-bold text-indigo-600">✓</span>
                                            Debe basarse en una experiencia directa, no en rumores de terceros.
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-indigo-600">✓</span>
                                            No debe contener contenido sexualmente explícito ni "porno de venganza".
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-indigo-600">✓</span>
                                            No debe promocionar servicios comerciales ni spam.
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 4 */}
                            <section id="section-4" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                                        <Gavel className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">4. Consecuencias</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Nos tomamos estas reglas en serio. Dependiendo de la gravedad de la infracción, podemos tomar las siguientes medidas:
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-4">
                                        <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Advertencia Formal</span>
                                        <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-800 ring-1 ring-inset ring-orange-600/20">Eliminación de Contenido</span>
                                        <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-800 ring-1 ring-inset ring-red-600/20">Suspensión Temporal</span>
                                        <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-slate-700">Expulsión Permanente</span>
                                    </div>
                                </div>
                            </section>

                            {/* Section 5 */}
                            <section id="section-5" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                                        <HandHeart className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">5. Tu Rol en la Comunidad</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Esta comunidad la construimos todos. Si ves algo que viola este código, no mires hacia otro lado.
                                    </p>
                                    <div className="mt-6 rounded-2xl bg-indigo-50 p-6 border border-indigo-100 flex items-center justify-between gap-4">
                                        <div>
                                            <h4 className="font-bold text-indigo-900">¿Viste una infracción?</h4>
                                            <p className="text-sm text-indigo-700">Ayúdanos a mantener el espacio seguro reportándolo.</p>
                                        </div>
                                        <button className="shrink-0 rounded-full bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500 transition-colors">
                                            Reportar
                                        </button>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
