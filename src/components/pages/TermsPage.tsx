import { FileText, Shield, AlertCircle, CheckCircle, Lock, RefreshCw, Scale, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 selection:bg-rose-500 selection:text-white bg-[url('/grid.svg')] bg-fixed">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm font-semibold text-rose-600 ring-1 ring-inset ring-rose-100 mb-6">
                            <Scale className="h-4 w-4" />
                            Legal
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
                            Términos y Condiciones
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Por favor, lee detenidamente nuestras reglas de juego. Queremos mantener esta comunidad segura, honesta y útil para todos.
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
                                { name: '1. Aceptación', icon: CheckCircle },
                                { name: '2. Uso Responsable', icon: Shield },
                                { name: '3. Privacidad', icon: Lock },
                                { name: '4. Contenido', icon: FileText },
                                { name: '5. Modificaciones', icon: RefreshCw },
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={`#section-${item.name.split('.')[0]}`}
                                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-rose-600 hover:shadow-sm transition-all"
                                >
                                    <item.icon className="h-4 w-4 text-slate-400 group-hover:text-rose-500" />
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
                                        <CheckCircle className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">1. Aceptación de los Términos</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Bienvenido a <strong>Red Flag</strong>. Al acceder, navegar o utilizar nuestra plataforma, aceptas estar legalmente vinculado por estos términos. Si no estás de acuerdo con alguna parte de estos términos, te rogamos que no utilices nuestros servicios.
                                    </p>
                                    <p>
                                        Esta plataforma está diseñada con un propósito claro: <strong>compartir experiencias y verificar antecedentes</strong> para proteger a la comunidad de posibles riesgos en relaciones interpersonales.
                                    </p>
                                </div>
                            </section>

                            {/* Section 2 */}
                            <section id="section-2" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                                        <Shield className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">2. Uso Responsable</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        La confianza es la base de nuestra comunidad. Te comprometes a:
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex gap-2">
                                            <span className="font-bold text-emerald-600">✓</span>
                                            Publicar información veraz y basada exclusivamente en hechos reales y experiencias propias.
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-emerald-600">✓</span>
                                            Mantener un lenguaje respetuoso, incluso al describir situaciones difíciles.
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-rose-600">✕</span>
                                            No utilizar la plataforma para difamar, acosar o intimidar a ninguna persona.
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 3 */}
                            <section id="section-3" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                                        <Lock className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">3. Privacidad y Anonimato</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Entendemos la sensibilidad de la información compartida. <strong>Tu anonimato es una prioridad</strong>.
                                    </p>
                                    <p>
                                        Los reportes pueden realizarse de forma totalmente anónima. No revelaremos tu identidad a terceros salvo que sea requerido por una orden judicial válida o para prevenir un daño físico inminente.
                                    </p>
                                    <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-600 border border-slate-200">
                                        Para más detalles, revisa nuestra <Link href="/privacidad" className="text-rose-600 hover:underline">Política de Privacidad</Link>.
                                    </div>
                                </div>
                            </section>

                            {/* Section 4 */}
                            <section id="section-4" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">4. Contenido del Usuario</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Al publicar contenido, declaras y garantizas que eres el propietario o tienes los derechos necesarios para compartir dicha información.
                                    </p>

                                    <div className="my-6 rounded-2xl bg-rose-50 p-6 ring-1 ring-rose-100">
                                        <div className="flex gap-4">
                                            <AlertCircle className="h-6 w-6 text-rose-600 shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-rose-900 mb-1">Prohibición de Doxing</h4>
                                                <p className="text-sm text-rose-800 leading-relaxed">
                                                    Está terminantemente prohibido publicar información privada sensible como:
                                                    direcciones de domicilio exactas, números de teléfono personales, documentos de identidad,
                                                    o información financiera. El objetivo es alertar sobre conductas, no exponer la seguridad física de nadie.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <p>
                                        "Red Flag" actúa como un intermediario pasivo para la distribución de contenido generado por usuarios y no asume responsabilidad por la veracidad de los mismos, aunque nos reservamos el derecho de moderar y eliminar contenido que viole estas normas.
                                    </p>
                                </div>
                            </section>

                            {/* Section 5 */}
                            <section id="section-5" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-100">
                                        <RefreshCw className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">5. Modificaciones</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento. Te notificaremos sobre cambios significativos a través de la plataforma o por correo electrónico. El uso continuado de la plataforma después de dichos cambios constituye tu aceptación de los nuevos términos.
                                    </p>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
