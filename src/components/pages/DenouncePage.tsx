"use client";

import { useState } from "react";
import { Flag, AlertCircle } from "lucide-react";
import Link from "next/link";

const DEPARTAMENTOS = [
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Callao",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
];

export default function DenouncePage() {
  const [formData, setFormData] = useState({
    nombreDenunciado: "",
    apellidoDenunciado: "",
    edad: "",
    departamento: "",
    genero: "",
    redSocial: "",
    tipoReporte: "infiel", // Nuevo campo
    descripcion: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/reportes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombreDenunciado,
          apellido: formData.apellidoDenunciado || null,
          edad: parseInt(formData.edad),
          ciudad: formData.departamento,
          genero: formData.genero as 'hombre' | 'mujer',
          descripcion: formData.descripcion,
          redSocial: formData.redSocial || null,
          tipoReporte: formData.tipoReporte as 'infiel' | 'cachudo',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Limpiar formulario
        setFormData({
          nombreDenunciado: "",
          apellidoDenunciado: "",
          edad: "",
          departamento: "",
          genero: "",
          redSocial: "",
          tipoReporte: "infiel",
          descripcion: "",
        });
        
        // Scroll al top para ver mensaje de éxito
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError(data.error || 'Error al enviar la denuncia');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 bg-grid-pattern">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-rose-100 p-3 text-rose-600">
            <Flag className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Hacer una Denuncia
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Tu reporte ayuda a proteger a la comunidad. Completa el formulario con responsabilidad.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-2xl bg-green-50 border border-green-200 p-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-900 mb-1">¡Denuncia enviada exitosamente!</h3>
                <p className="text-green-700">
                  Tu reporte ha sido registrado y ahora está disponible en la plataforma. Gracias por contribuir a la seguridad de la comunidad.
                </p>
                <div className="mt-4 flex gap-3">
                  <Link
                    href="/buscar"
                    className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                  >
                    Ver en búsqueda
                  </Link>
                  <button
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-white border border-green-300 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors"
                  >
                    Hacer otra denuncia
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-2xl bg-rose-50 border border-rose-200 p-6 animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white flex-shrink-0">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-rose-900 mb-1">Error al enviar la denuncia</h3>
                <p className="text-rose-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-3 text-sm font-semibold text-rose-600 hover:text-rose-700 underline"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-md sm:p-10">
          <div className="space-y-8">
            {/* Personal Info Section */}
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-xs text-white">1</span>
                Información del Denunciado
              </h3>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="nombreDenunciado" className="mb-2 block text-sm font-semibold text-slate-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombreDenunciado"
                    required
                    value={formData.nombreDenunciado}
                    onChange={(e) => setFormData({ ...formData, nombreDenunciado: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="Ej: Juan"
                  />
                </div>

                <div>
                  <label htmlFor="apellidoDenunciado" className="mb-2 block text-sm font-semibold text-slate-700">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="apellidoDenunciado"
                    required
                    value={formData.apellidoDenunciado}
                    onChange={(e) => setFormData({ ...formData, apellidoDenunciado: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="Ej: Pérez"
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="edad" className="mb-2 block text-sm font-semibold text-slate-700">
                    Edad aprox.
                  </label>
                  <input
                    type="number"
                    id="edad"
                    required
                    value={formData.edad}
                    onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="25"
                  />
                </div>

                <div>
                  <label htmlFor="genero" className="mb-2 block text-sm font-semibold text-slate-700">
                    Género
                  </label>
                  <select
                    id="genero"
                    required
                    value={formData.genero}
                    onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                  >
                    <option value="">Seleccionar</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="departamento" className="mb-2 block text-sm font-semibold text-slate-700">
                    Departamento
                  </label>
                  <select
                    id="departamento"
                    required
                    value={formData.departamento}
                    onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                  >
                    <option value="">Seleccionar</option>
                    {DEPARTAMENTOS.map((dep) => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="redSocial" className="mb-2 block text-sm font-semibold text-slate-700">
                  Red Social / Contacto
                </label>
                <input
                  type="text"
                  id="redSocial"
                  value={formData.redSocial}
                  onChange={(e) => setFormData({ ...formData, redSocial: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                  placeholder="@usuario o enlace al perfil"
                />
              </div>

              <div>
                <label htmlFor="tipoReporte" className="mb-2 block text-sm font-semibold text-slate-700">
                  Tipo de Reporte
                </label>
                <select
                  id="tipoReporte"
                  required
                  value={formData.tipoReporte}
                  onChange={(e) => setFormData({ ...formData, tipoReporte: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                >
                  <option value="infiel">🔴 Infiel - Persona que fue infiel</option>
                  <option value="cachudo">🟡 Cachudo - Persona a quien le fueron infiel</option>
                </select>
                <p className="mt-2 text-xs text-slate-500">
                  Selecciona si la persona denunciada fue infiel o si le fueron infiel
                </p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Details Section */}
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-600 text-xs text-white">2</span>
                Detalles del Reporte
              </h3>

              <div>
                <label htmlFor="descripcion" className="mb-2 block text-sm font-semibold text-slate-700">
                  Descripción de los hechos
                </label>
                <textarea
                  id="descripcion"
                  required
                  rows={6}
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
                  placeholder="Describe detalladamente lo sucedido. Incluye fechas y lugares si es posible..."
                />
              </div>


            </div>

            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800 border border-amber-100 flex gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
              <p>
                Al publicar, confirmas que la información proporcionada es verídica. Las denuncias falsas pueden tener consecuencias legales y ser eliminadas de la plataforma.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-rose-600 px-8 py-4 font-bold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-700 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>Enviando...</>
              ) : (
                <>
                  <Flag className="h-5 w-5" />
                  Publicar Denuncia
                </>
              )}
            </button>
            <Link
              href="/"
              className="flex flex-1 items-center justify-center rounded-full border-2 border-slate-200 bg-white px-8 py-4 font-semibold text-slate-700 transition-all hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
