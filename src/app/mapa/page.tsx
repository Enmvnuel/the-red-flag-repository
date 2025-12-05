import InteractiveMap from "@/components/map/InteractiveMap";

export default function Page() {
    return (
        <main className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                        Mapa de Infieles del Perú 🇵🇪
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Descubre las estadísticas de infidelidad en tiempo real por departamento.
                        ¿Dónde están los más fieles? ¿Y los más "jugadores"?
                    </p>
                </div>

                <InteractiveMap />
            </div>
        </main>
    );
}
