"use client";

import Link from "next/link";
import { AlertTriangle, Search, Flag, Menu, X, Map } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-rose-100 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-rose-600">
          <AlertTriangle className="h-7 w-7" />
          <span>Red Flag</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/hombres"
            className="text-slate-600 transition-colors hover:text-rose-600 font-medium"
          >
            Hombres
          </Link>
          <Link
            href="/mujeres"
            className="text-slate-600 transition-colors hover:text-rose-600 font-medium"
          >
            Mujeres
          </Link>
          <Link
            href="/mapa"
            className="flex items-center gap-2 text-slate-600 transition-colors hover:text-rose-600 font-medium"
          >
            <Map className="h-5 w-5" />
            <span>Mapa</span>
          </Link>
          <Link
            href="/buscar"
            className="flex items-center gap-2 text-slate-600 transition-colors hover:text-rose-600 font-medium"
          >
            <Search className="h-5 w-5" />
            <span>Buscar</span>
          </Link>
          <Link
            href="/denunciar"
            className="flex items-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-700 hover:shadow-xl hover:-translate-y-0.5"
          >
            <Flag className="h-5 w-5" />
            <span>Denunciar</span>
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-700"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-rose-100 bg-white px-6 py-4 md:hidden animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            <Link
              href="/hombres"
              onClick={() => setMenuOpen(false)}
              className="text-slate-600 transition-colors hover:text-rose-600 font-medium"
            >
              Hombres
            </Link>
            <Link
              href="/mujeres"
              onClick={() => setMenuOpen(false)}
              className="text-slate-600 transition-colors hover:text-rose-600 font-medium"
            >
              Mujeres
            </Link>
            <Link
              href="/mapa"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-slate-600 transition-colors hover:text-rose-600 font-medium"
            >
              <Map className="h-5 w-5" />
              <span>Mapa</span>
            </Link>
            <Link
              href="/buscar"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 text-slate-600 transition-colors hover:text-rose-600 font-medium"
            >
              <Search className="h-5 w-5" />
              <span>Buscar</span>
            </Link>
            <Link
              href="/denunciar"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-rose-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-rose-600/30"
            >
              <Flag className="h-5 w-5" />
              <span>Denunciar</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
