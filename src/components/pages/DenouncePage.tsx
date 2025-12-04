"use client";

import { useState } from "react";
import { Flag, Upload, X, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DenouncePage() {
  const [formData, setFormData] = useState({
    nombreDenunciado: "",
    apellidoDenunciado: "",
    edad: "",
    ciudad: "",
    genero: "",
    redSocial: "",
    descripcion: "",
  });

  const [evidencias, setEvidencias] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Formulario enviado:", formData, evidencias);
      setIsSubmitting(false);
      // Here you would typically redirect or show a success message
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEvidencias([...evidencias, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setEvidencias(evidencias.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
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

        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
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
                  <label htmlFor="ciudad" className="mb-2 block text-sm font-semibold text-slate-700">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="ciudad"
                    required
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all"
                    placeholder="Lima"
                  />
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

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Evidencias (opcional)
                </label>
                <div className="mt-2">
                  <label
                    htmlFor="file-upload"
                    className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-10 transition-all hover:border-rose-500 hover:bg-rose-50"
                  >
                    <div className="rounded-full bg-white p-3 shadow-sm ring-1 ring-slate-200 transition-all group-hover:ring-rose-200">
                      <Upload className="h-6 w-6 text-slate-400 group-hover:text-rose-500" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-rose-700">
                        Haz clic para subir archivos
                      </span>
                      <p className="mt-1 text-xs text-slate-500">
                        Imágenes, capturas de pantalla (Max. 5MB)
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {evidencias.length > 0 && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {evidencias.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                          </div>
                          <span className="truncate text-sm font-medium text-slate-700">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="rounded-full p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
