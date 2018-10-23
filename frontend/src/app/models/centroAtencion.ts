import { Tipo } from './tipo';

export class CentroAtencion {
  id: number;
  nombre: string;
  latitud?: string;
  longitud?: string;
  nombreUbicacion: string;
  createdAt: Date;
  updatedAt: Date;
  tipo: Tipo;
}
