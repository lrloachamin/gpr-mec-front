import { Proyecto } from "./Proyecto";

export type Tarea = {
  codigoTarea?: number,
  nombreTarea?: string;
  fechaCreaciontarea?: Date,
  prioridadTarea?: string;
  descripicionTarea?: string;//indicador numerico,etc
  estadoTarea?: string;
  codigoProyecto?: Proyecto;
};
