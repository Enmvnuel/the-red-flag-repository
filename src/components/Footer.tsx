import { AlertTriangle, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-rose-600">
              <AlertTriangle className="h-6 w-6" />
              <span>Red Flag</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Plataforma de denuncias públicas para proteger a la comunidad.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/terminos" className="hover:text-rose-600 transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-rose-600 transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/conducta" className="hover:text-rose-600 transition-colors">
                  Código de Conducta
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">Contacto</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>denuncias@redflag.pe</li>
              <li>Soporte 24/7</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
          <p className="flex items-center justify-center gap-1">
            Hecho con <Heart className="h-4 w-4 fill-rose-500 text-rose-500" /> en Perú
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Red Flag. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
