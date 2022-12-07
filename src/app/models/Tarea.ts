import { Proyecto } from "./Proyecto";
import { TareaDocente } from "./TareaDocente";

export type Tarea = {
  codigoTarea?: number;
  nombreTarea?: string;
  fechaCreaciontarea?: Date;
  prioridadTarea?: string;
  descripicionTarea?: string;//indicador numerico,etc
  estadoTarea?: string;
  codigoProyecto?: Proyecto;
  fechaEntregaTarea?: Date |null|string;
  tareaDocenteList?:TareaDocente[] ;
};
