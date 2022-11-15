import { Docente } from "./Docente";
import { Tarea } from "./Tarea";

export type TareaDocente = {
    codigoTareaDocente?: number,
    fechaEntrega?: Date;
    archivoTareaDocente?: string,
    indicadorTareadocente?: number;
    descripcionTareadocente?: string;
    estadoTareaDocente?: string;
    codigoDocente?: Docente;
    codigoTarea?: Tarea;
};
