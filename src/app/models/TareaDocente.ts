import { Docente } from "./Docente";
import { Tarea } from "./Tarea";

export type TareaDocente = {
    codigoTareaDocente?: number,
    fechaEntrega?: string;
    archivoTareaDocente?: Date,
    indicadorTareadocente?: string;
    descripcionTareadocente?: string;
    estadoTareaDocente?: string;
    codigoDocente?: Docente;
    codigoTarea: Tarea;
};
