"use client";

import { useState } from "react";
import { Flag, Upload, X } from "lucide-react";
import Link from "next/link";

export default function DenunciarPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData, evidencias);
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Hacer una Denuncia</h1>
          <p className="mt-4 text-lg text-gray-600">
            Completa el formulario con toda la información posible
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="nombreDenunciado" className="block text-sm font-semibold text-gray-900">
                  Nombre del denunciado/a
                </label>
                <input
                  type="text"
                  id="nombreDenunciado"
                  required
                  value={formData.nombreDenunciado}
                  onChange={(e) => setFormData({ ...formData, nombreDenunciado: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="Ej: Juan"
                />
              </div>

              <div>
                <label htmlFor="apellidoDenunciado" className="block text-sm font-semibold text-gray-900">
                  Apellido del denunciado/a
                </label>
                <input
                  type="text"
                  id="apellidoDenunciado"
                  required
                  value={formData.apellidoDenunciado}
                  onChange={(e) => setFormData({ ...formData, apellidoDenunciado: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="Ej: Pérez"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <label htmlFor="edad" className="block text-sm font-semibold text-gray-900">
                  Edad aproximada
                </label>
                <input
                  type="number"
                  id="edad"
                  required
                  value={formData.edad}
                  onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="25"
                />
              </div>

              <div>
                <label htmlFor="genero" className="block text-sm font-semibold text-gray-900">
                  Género
                </label>
                <select
                  id="genero"
                  required
                  value={formData.genero}
                  onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                >
                  <option value="">Seleccionar</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                </select>
              </div>

              <div>
                <label htmlFor="ciudad" className="block text-sm font-semibold text-gray-900">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="ciudad"
                  required
                  value={formData.ciudad}
                  onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  placeholder="Lima"
                />
              </div>
            </div>

            <div>
              <label htmlFor="redSocial" className="block text-sm font-semibold text-gray-900">
                Red Social / Contacto
              </label>
              <input
                type="text"
                id="redSocial"
                value={formData.redSocial}
                onChange={(e) => setFormData({ ...formData, redSocial: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="@usuario o enlace"
              />
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-900">
                Descripción de los hechos
              </label>
              <textarea
                id="descripcion"
                required
                rows={6}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                placeholder="Describe detalladamente lo sucedido..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900">Evidencias (opcional)</label>
              <div className="mt-2">
                <label
                  htmlFor="file-upload"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 transition-colors hover:border-red-500 hover:bg-red-50"
                >
                  <Upload className="h-6 w-6 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">
                    Seleccionar archivos (imágenes, capturas)
                  </span>
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
                <div className="mt-4 space-y-2">
                  {evidencias.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                    >
                      <span className="truncate text-sm text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 transition-colors hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 font-bold text-white shadow-lg shadow-red-600/40 transition-all hover:bg-red-700 hover:shadow-xl"
            >
              <Flag className="h-5 w-5" />
              Publicar Denuncia
            </button>
            <Link
              href="/"
              className="flex flex-1 items-center justify-center rounded-full border-2 border-gray-300 bg-white px-8 py-4 font-semibold text-gray-900 transition-all hover:border-gray-400"
            >
              Cancelar
            </Link>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Al publicar, aceptas que la información será pública y verificable.
          </p>
        </form>
      </div>
    </div>
  );
}
