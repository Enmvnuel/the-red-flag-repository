"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, AlertTriangle, User, Flag, Share2 } from "lucide-react";

const mockReporte = {
  id: "1",
  nombre: "Carlos Mendoza",
  apellido: "García",
  edad: 28,
  ciudad: "Lima",
  redSocial: "@carlosmendoza",
  fecha: "2025-12-01",
  descripcion:
    "Persona reportada por múltiples casos de infidelidad comprobada. Mantenía relaciones paralelas con al menos 3 personas diferentes, utilizando perfiles falsos en redes sociales. Las víctimas han proporcionado evidencias de conversaciones y encuentros. Se ha confirmado que engañó a su pareja principal durante más de 2 años, mientras mantenía relaciones activas con otras personas bajo promesas de compromiso serio.",
  denuncias: 5,
  evidencias: [
    "Capturas de conversaciones comprometedoras",
    "Testimonios de 3 personas afectadas",
    "Fotos en lugares con diferentes personas",
  ],
};

export default function ReportePage() {
  const params = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/buscar"
          className="mb-8 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-red-600"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a búsqueda
        </Link>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 px-8 py-12 text-white">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">{mockReporte.denuncias} denuncias</span>
            </div>

            <h1 className="text-4xl font-extrabold">
              {mockReporte.nombre} {mockReporte.apellido}
            </h1>

            <div className="mt-6 flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{mockReporte.edad} años</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{mockReporte.ciudad}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(mockReporte.fecha).toLocaleDateString("es-PE")}</span>
              </div>
            </div>

            {mockReporte.redSocial && (
              <div className="mt-4">
                <span className="text-sm text-white/80">Red Social:</span>
                <p className="mt-1 font-semibold">{mockReporte.redSocial}</p>
              </div>
            )}
          </div>

          <div className="p-8">
            <section className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <Flag className="h-6 w-6 text-red-600" />
                Descripción de los hechos
              </h2>
              <p className="leading-relaxed text-gray-700">{mockReporte.descripcion}</p>
            </section>

            {mockReporte.evidencias.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">Evidencias reportadas</h2>
                <div className="space-y-3">
                  {mockReporte.evidencias.map((evidencia, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{evidencia}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-6">
              <h3 className="mb-2 font-bold text-yellow-900">⚠️ Importante</h3>
              <p className="text-sm text-yellow-800">
                Esta información es de carácter público y ha sido reportada por usuarios de la plataforma.
                Si consideras que hay información incorrecta, puedes reportarlo al equipo de moderación.
              </p>
            </section>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition-all hover:bg-red-700">
                <Flag className="h-5 w-5" />
                Agregar denuncia
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-all hover:border-gray-400">
                <Share2 className="h-5 w-5" />
                Compartir
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/denunciar"
            className="inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-red-600"
          >
            ¿Conoces más información? Haz una denuncia →
          </Link>
        </div>
      </div>
    </div>
  );
}
