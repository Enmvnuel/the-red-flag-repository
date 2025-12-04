import { Lock, Eye, ShieldCheck, Database, Fingerprint, Cookie, UserCheck, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 selection:bg-emerald-500 selection:text-white bg-[url('/grid.svg')] bg-fixed">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600 ring-1 ring-inset ring-emerald-100 mb-6">
                            <Lock className="h-4 w-4" />
                            Seguridad y Confianza
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
                            Política de Privacidad
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Tu privacidad no es negociable. Aquí te explicamos claramente qué hacemos (y qué no hacemos) con tu información.
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
                                { name: '1. Recopilación', icon: Database },
                                { name: '2. Uso de Info', icon: Fingerprint },
                                { name: '3. Protección', icon: ShieldCheck },
                                { name: '4. Cookies', icon: Cookie },
                                { name: '5. Derechos', icon: UserCheck },
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={`#section-${item.name.split('.')[0]}`}
                                    className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-white hover:text-emerald-600 hover:shadow-sm transition-all"
                                >
                                    <item.icon className="h-4 w-4 text-slate-400 group-hover:text-emerald-500" />
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
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                                        <Database className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">1. Recopilación de Datos</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        En <strong>Red Flag</strong>, creemos en el principio de "mínimos datos necesarios". Solo recopilamos la información estrictamente necesaria para que la plataforma funcione de manera segura y eficiente.
                                    </p>
                                    <p>
                                        Esto puede incluir datos básicos de registro (si decides crear una cuenta) y, por supuesto, la información que tú voluntariamente decides compartir en tus reportes. <strong>Nunca recopilamos datos biométricos ni ubicación en tiempo real sin tu consentimiento explícito.</strong>
                                    </p>
                                </div>
                            </section>

                            {/* Section 2 */}
                            <section id="section-2" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 ring-1 ring-purple-100">
                                        <Fingerprint className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">2. Uso de la Información</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Utilizamos la información con tres propósitos fundamentales:
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex gap-2">
                                            <span className="font-bold text-emerald-600">1.</span>
                                            <span><strong>Verificación:</strong> Para asegurar que los reportes provienen de personas reales y no de bots.</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-emerald-600">2.</span>
                                            <span><strong>Seguridad:</strong> Para detectar y prevenir abusos, acoso o actividades maliciosas en la comunidad.</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="font-bold text-emerald-600">3.</span>
                                            <span><strong>Mejora:</strong> Para entender cómo se usa la plataforma y optimizar la experiencia de usuario.</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Section 3 */}
                            <section id="section-3" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">3. Protección de Datos</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Implementamos medidas de seguridad de nivel industrial. Tu confianza es nuestro activo más valioso.
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-4 my-6">
                                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-200 transition-colors">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Eye className="h-5 w-5 text-blue-500" />
                                                <h4 className="font-bold text-slate-900">Control Total</h4>
                                            </div>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                Tú decides qué es público. Ofrecemos opciones para reportar de forma anónima o bajo un seudónimo.
                                            </p>
                                        </div>
                                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-200 transition-colors">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Lock className="h-5 w-5 text-emerald-500" />
                                                <h4 className="font-bold text-slate-900">Encriptación</h4>
                                            </div>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                Los datos sensibles se almacenan encriptados. Ni siquiera nuestro equipo puede ver tus contraseñas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section 4 */}
                            <section id="section-4" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                                        <Cookie className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">4. Cookies y Rastreo</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Usamos cookies, pero no de las malas. Solo utilizamos cookies <strong>esenciales</strong> para mantener tu sesión iniciada y recordar tus preferencias de idioma o tema.
                                    </p>
                                    <p>
                                        <strong>No vendemos tus datos a terceros.</strong> No utilizamos cookies de rastreo invasivas para perseguirte con publicidad por todo internet.
                                    </p>
                                </div>
                            </section>

                            {/* Section 5 */}
                            <section id="section-5" className="scroll-mt-24 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                                        <UserCheck className="h-6 w-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900">5. Tus Derechos</h2>
                                </div>
                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <p>
                                        Tus datos son tuyos. Tienes derecho absoluto a:
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-2 mt-4">
                                        <li className="flex items-center gap-2 text-sm font-medium bg-slate-50 px-3 py-2 rounded-lg">
                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                            Acceder a toda tu información
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium bg-slate-50 px-3 py-2 rounded-lg">
                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                            Rectificar datos incorrectos
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium bg-slate-50 px-3 py-2 rounded-lg">
                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                            Eliminar tu cuenta y datos
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium bg-slate-50 px-3 py-2 rounded-lg">
                                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                                            Exportar tu historial
                                        </li>
                                    </ul>
                                    <p className="mt-6 text-sm text-slate-500">
                                        Para ejercer cualquiera de estos derechos, solo necesitas enviar un correo a nuestro equipo de soporte.
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
