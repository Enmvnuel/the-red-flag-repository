import { Reporte } from "@/types";

// Función para generar reportes mock basados en las estadísticas reales
function generateMockReportes(): Reporte[] {
  const reportes: Reporte[] = [];
  let id = 1;

  // Distribución por departamento (nombre, hombres, mujeres)
  const departamentos = [
    { nombre: "Lima", hombres: 8500, mujeres: 6200 },
    { nombre: "Arequipa", hombres: 3200, mujeres: 2400 },
    { nombre: "Cusco", hombres: 2800, mujeres: 2100 },
    { nombre: "La Libertad", hombres: 3100, mujeres: 2000 },
    { nombre: "Piura", hombres: 2600, mujeres: 1900 },
    { nombre: "Lambayeque", hombres: 2400, mujeres: 1700 },
    { nombre: "Junín", hombres: 2200, mujeres: 1600 },
    { nombre: "Cajamarca", hombres: 1900, mujeres: 1400 },
    { nombre: "Áncash", hombres: 2100, mujeres: 1400 },
    { nombre: "Puno", hombres: 1800, mujeres: 1300 },
    { nombre: "Ica", hombres: 1600, mujeres: 1200 },
    { nombre: "Huánuco", hombres: 1400, mujeres: 1000 },
    { nombre: "San Martín", hombres: 1500, mujeres: 1100 },
    { nombre: "Ucayali", hombres: 1300, mujeres: 900 },
    { nombre: "Loreto", hombres: 1200, mujeres: 850 },
    { nombre: "Ayacucho", hombres: 1100, mujeres: 800 },
    { nombre: "Tacna", hombres: 900, mujeres: 650 },
    { nombre: "Apurímac", hombres: 800, mujeres: 600 },
    { nombre: "Huancavelica", hombres: 700, mujeres: 500 },
    { nombre: "Pasco", hombres: 650, mujeres: 450 },
    { nombre: "Tumbes", hombres: 600, mujeres: 400 },
    { nombre: "Moquegua", hombres: 550, mujeres: 380 },
    { nombre: "Amazonas", hombres: 500, mujeres: 350 },
    { nombre: "Madre de Dios", hombres: 450, mujeres: 320 },
    { nombre: "Callao", hombres: 2000, mujeres: 1500 },
  ];

  const nombres = ["Carlos", "Luis", "Diego", "Pedro", "Andrés", "José", "Miguel", "Juan", "Roberto", "Fernando"];
  const nombresMujer = ["Ana", "María", "Sofia", "Valentina", "Camila", "Isabella", "Lucía", "Martina", "Victoria", "Emma"];
  const apellidos = ["García", "López", "Martínez", "Rodríguez", "Pérez", "González", "Fernández", "Torres", "Ramírez", "Flores"];

  departamentos.forEach(dept => {
    // Generar reportes de hombres
    for (let i = 0; i < dept.hombres; i++) {
      reportes.push({
        id: String(id++),
        nombre: nombres[Math.floor(Math.random() * nombres.length)],
        apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
        edad: Math.floor(Math.random() * 25) + 18, // 18-42 años
        ciudad: dept.nombre,
        genero: "hombre",
        fecha: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        descripcion: "Reportado por comportamiento infiel y engañoso.",
        denuncias: Math.floor(Math.random() * 10) + 1,
      });
    }

    // Generar reportes de mujeres
    for (let i = 0; i < dept.mujeres; i++) {
      reportes.push({
        id: String(id++),
        nombre: nombresMujer[Math.floor(Math.random() * nombresMujer.length)],
        apellido: apellidos[Math.floor(Math.random() * apellidos.length)],
        edad: Math.floor(Math.random() * 25) + 18, // 18-42 años
        ciudad: dept.nombre,
        genero: "mujer",
        fecha: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        descripcion: "Reportada por comportamiento infiel y engañoso.",
        denuncias: Math.floor(Math.random() * 10) + 1,
      });
    }
  });

  return reportes;
}

export const mockReportes: Reporte[] = generateMockReportes();
