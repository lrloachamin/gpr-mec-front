import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/Cargo';
import { Docente } from 'src/app/models/Docente';
import { Indicador } from 'src/app/models/Indicador';
import { Proyecto } from 'src/app/models/Proyecto';
import { Tarea } from 'src/app/models/Tarea';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
import { CargoService } from 'src/app/servicios/cargo.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TareaService } from 'src/app/servicios/tarea.service';

const prioridadTarea: any[] = [
  {
    "id": "BAJA",
    "name": "BAJA"
  },
  {
    "id": "MEDIA",
    "name": "MEDIA"
  },
  {
    "id": "ALTA",
    "name": "ALTA"
  }
]

const pesoTarea: any[] = [
  {
    "id": "HORA",
    "name": "HORAS"
  },
  {
    "id": "DIA",
    "name": "DÍAS"
  },
  {
    "id": "MES",
    "name": "MESES"
  }
]

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.html',
  styleUrls:['./crear-tarea.component.css']
  
})

export class CrearTareaComponent implements OnInit {
  //tarea: TareaDocente = {};
  getProyectos$: Observable<Proyecto[]>;
  descripcionIndicador: string = "";
  getDocentes$: Observable<Docente[]>;
  validTypes: any[] = [];
  tareaDocente: TareaDocente = {};
  tarea: Tarea = {};
  indicador: Indicador = {};
  indicadores: Indicador[] = [];
  proyectos: Proyecto[] = [];
  docentes: Docente[] = [];
  docentesAsignados: any[] = [];
  indicadoresAsignados: any[] = [];
  prioridades: any[];
  pesoTarea: any[];
  getIndicadores$: Observable<Indicador[]>;
  tareaDocenteProyecto: TareaDocenteProyecto = {};
  ckequearIndicador: Boolean = false;
  getCargos$: Observable<Cargo[]>;
  cargos: Cargo[] = [];
  cargo: Cargo = {};

  selectedFiles: any;
  imageName = "";

  codCargo: any;
  codDocente: any;

  constructor(
    private router: Router,
    private cargoService: CargoService,
    private tareaService: TareaService,
    private proyectoService: ProyectoService
  ) {

    //this.codCargo = localStorage.getItem('codCargo');
    this.codDocente = localStorage.getItem('codigoDocente');
    this.getProyectos$ = this.proyectoService.obtenerProyectos();
    this.getCargos$ = this.cargoService.obtenerCargosModel();
    this.getDocentes$ = new Observable;
    this.prioridades = prioridadTarea;
    this.pesoTarea = pesoTarea;
    this.getIndicadores$ = this.tareaService.obtenerIndicadores();
  }

  ngOnInit(): void {
    this.getProyectos();
    this.getCargos();
    this.getIndicadores();
  }

  getProyectos() {
    this.getProyectos$.subscribe(proyectos => {
      this.proyectos = proyectos;
    });
  }

  getCargos() {
    this.getCargos$.subscribe(cargos => {
      this.cargos = cargos;
    });
  }

  getIndicadores() {
    this.getIndicadores$.subscribe(indicadores => {
      this.indicadores = indicadores;
    });
  }

  save() {
    this.tarea.idDocenteRevisor = localStorage.getItem('idDocenteRevisor');
    this.tarea.nombreDocenteRevisor = localStorage.getItem('nombreDocenteRevisor');
    this.tareaDocenteProyecto.tarea = this.tarea;
    this.tareaDocenteProyecto.docentes = this.docentesAsignados;
    this.tareaDocenteProyecto.indicadors = this.indicadoresAsignados;
    if (this.selectedFiles == undefined) {
      this.tareaService.crearTarea(this.tareaDocenteProyecto)
        .subscribe(data => {
          confirm("Se creo la tarea!!");
          this.router.navigate(["listar-tareas"]);
        })
    } else {
      this.tareaService.crearTareaConArchivo(this.tareaDocenteProyecto, this.selectedFiles[0])
        .subscribe(data => {
          confirm("Se creo la tarea!!");
          this.router.navigate(["listar-tareas"]);
        })
    }
  }

  /*agregarElementos() {
    this.docentesAsignados.push(this.tareaDocente.codigoDocente);
    
  }
  eliminarElementos() {
    this.docentesAsignados = this.docentesAsignados.filter((item) => item !== this.tareaDocente.codigoDocente);
  }
  */

  cambiarCheckDocente(docente: Docente) {
    docente.checked = !docente.checked;
    if (!docente.checked)
      this.docentesAsignados = this.docentesAsignados.filter((item) => item.codigoDocente !== docente.codigoDocente);
    else
      this.docentesAsignados.push(docente);
  }

  cambiarTodosDocentes() {
    this.docentes.forEach(docente => {
      docente.checked = !docente.checked;
      if (!docente.checked)
        this.docentesAsignados = this.docentesAsignados.filter((item) => item.codigoDocente !== docente.codigoDocente);
      else
        this.docentesAsignados.push(docente);
    });
  }
  agregarIndicador() {
    let indicador:Indicador = {
      codigoIndicador: this.indicador.codigoIndicador,
      nombreIndicador: this.indicador.nombreIndicador,
      estadoIndicador: this.indicador.estadoIndicador,
      descripcionIndicador: this.descripcionIndicador
    }
    this.indicador.descripcionIndicador = this.descripcionIndicador;
    this.descripcionIndicador = "";
    this.indicadoresAsignados.push(indicador);
    this.ckequearIndicador = false;
  }

  eliminarIndicador(indicador:Indicador) {
    this.indicadoresAsignados = this.indicadoresAsignados.filter((item) => ((item.descripcionIndicador !== indicador.descripcionIndicador) || (item.codigoIndicador !== indicador.codigoIndicador)));
  }

  visualizarIndicador() {
    this.ckequearIndicador = true;
  }

  buscarDocentesPorCargo() {
    this.getDocentes$ = this.tareaService.obtenerDocentesPorCargo(this.cargo.codCargo, this.codDocente);
    this.getDocentes$.subscribe(docentes => {
      this.docentes = docentes;
      if (this.docentesAsignados.length == 0) {
        this.docentes.forEach(docente => {
          docente.checked = false;
        });
      } else {
        this.docentes.forEach(docente => {
          docente.checked = false;
          if (this.docentesAsignados.find((item) => item.codigoDocente === docente.codigoDocente)) {
            docente.checked = true;
          }
        });
      }
    });
  }

  selectFiles(event: any) {
    this.imageName = event.target.files[0].name;
    this.selectedFiles = event.target.files;
  }

}
