export type Genero = "hombre" | "mujer";
export type TipoReporte = "infiel" | "cachudo";

export interface Reporte {
  id: string;
  nombre: string;
  apellido?: string;
  edad: number;
  ciudad: string;
  genero: Genero;
  fecha: string;
  descripcion: string;
  denuncias: number;
  redSocial?: string;
  tipoReporte?: TipoReporte;
}
