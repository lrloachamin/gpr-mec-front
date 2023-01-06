import { Cargo } from "./Cargo";
import { TareaDocente } from "./TareaDocente";

export type Docente = {
  codigoDocente?: number;
  idDocente?: string;
  nombreDocente?: string;
  apellidoDocente?: string;
  cedulaDocente?: string;
  telefonoDocente?: string;
  correoDocente?: string;
  codCargo?:Cargo;
  tareaDocenteList?: TareaDocente[];
  cantidadTarea?: number;
  cargaHoraria?: number;
};
