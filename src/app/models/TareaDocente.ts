import { Docente } from "./Docente";
import { Tarea } from "./Tarea";

export type TareaDocente = {
    codigoTareaDocente?: number;
    archivoTareaDocente?: string;
    descripcionTareadocente?: string;
    estadoTareaDocente?: string;
    codigoDocente?: Docente;
    codigoTarea?: Tarea;
    //private List<TareaIndicador> tareaIndicadorList;
};
