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
  templateUrl: './crear-subtarea.html'
})

export class CrearSubTareaComponent implements OnInit {
  //tarea: TareaDocente = {};
  getProyectos$: Observable<Proyecto[]>;
  descripcionIndicador: string="";
  getDocentes$: Observable<Docente[]>;
  validTypes: any[] = [];
  tareaDocente: TareaDocente = {};
  tarea: Tarea = {};
  indicador: Indicador= {};
  indicadores: Indicador[]= [];
  proyectos: Proyecto[] = [];
  docentes: Docente[] = [];
  docentesAsignados: any[] = [];
  indicadoresAsignados: any[] = [];
  prioridades: any[];
  pesoTarea: any[];
  getIndicadores$: Observable<Indicador[]>;
  tareaDocenteProyecto: TareaDocenteProyecto = {};
  ckequearIndicador: Boolean= false;
  getCargos$: Observable<Cargo[]>;
  cargos: Cargo[]=[];
  cargo: Cargo = {};

  selectedFiles: any;
  imageName = "";

  constructor(
    private router:Router,
    private cargoService:CargoService,
    private tareaService:TareaService,
    private proyectoService: ProyectoService
    ) {
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
    //this.getDocentes();
    this.getIndicadores();
  }

  getProyectos() {
    this.getProyectos$.subscribe(proyectos =>{
      this.proyectos = proyectos;
    });
  }

  getCargos() {
    this.getCargos$.subscribe(cargos =>{
      this.cargos = cargos;
    });
  }

  getDocentes(){
    this.getDocentes$.subscribe(docentes =>{
      this.docentes = docentes;  
    });
  }

  getIndicadores(){
    this.getIndicadores$.subscribe(indicadores =>{
      this.indicadores = indicadores;  
    });
  }

  save(){
    this.tareaDocenteProyecto.tarea = this.tarea;
    this.tareaDocenteProyecto.docentes = this.docentesAsignados;
    this.tareaDocenteProyecto.indicadors = this.indicadoresAsignados;
    if(this.selectedFiles ==undefined){
      this.tareaService.crearTarea(this.tareaDocenteProyecto)
      .subscribe(data=>{
        confirm("Se creo la tarea!!");
        this.router.navigate(["listar-tareas"]);
      })
    }else{
      this.tareaService.crearTareaConArchivo(this.tareaDocenteProyecto,this.selectedFiles[0])
      .subscribe(data=>{
        confirm("Se creo la tarea!!");
        this.router.navigate(["listar-tareas"]);
      })
    }
  }

  /*getValidPrioridades() {
    this.prioridades.forEach(prioridades => {
            this.validTypes.push(prioridades);
    });
  }*/
  
  agregarElementos(){
    this.docentesAsignados.push(this.tareaDocente.codigoDocente);
  }

  eliminarElementos(){
    this.docentesAsignados=this.docentesAsignados.filter((item) => item !== this.tareaDocente.codigoDocente );
  }

  agregarIndicador(){
    this.indicador.descripcionIndicador = this.descripcionIndicador;
    this.descripcionIndicador = "";
    this.indicadoresAsignados.push(this.indicador);
    this.ckequearIndicador = false;
  }

  eliminarIndicador(){
    this.indicadoresAsignados=this.indicadoresAsignados.filter((item) => item !== this.indicador );
  }

  visualizarIndicador(){
    this.ckequearIndicador = true;
  }

  buscarDocentesPorCargo(){
    //this.getDocentes$ = this.tareaService.obtenerDocentesPorCargo(this.cargo.codCargo);
    this.getDocentes$.subscribe(docentes =>{
      this.docentes = docentes;  
    });
  }

  selectFiles(event:any) {
    this.imageName = event.target.files[0].name;
    this.selectedFiles = event.target.files;
  }

}
