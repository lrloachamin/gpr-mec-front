import { Docente } from "./Docente";

export type Cargo = {
  codCargo?: string;
  nombreCargo?: string;
  descriCargo?: string;
  //apellidoDocente?: string;
  codCargoPadre?:Cargo;
  codPerfilPadre?: string;
  nombrePerfilCargo?: string;
  docenteList?: Docente[];
};
  