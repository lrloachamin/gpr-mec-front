import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { DatePipe } from '@angular/common'
import { TareaDocente } from 'src/app/models/TareaDocente';
import { Indicador } from 'src/app/models/Indicador';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
import { Docente } from 'src/app/models/Docente';
import { Tarea } from 'src/app/models/Tarea';
import { Cargo } from 'src/app/models/Cargo';
import { CargoService } from 'src/app/servicios/cargo.service';

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

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.html'
})
export class EditarTareaComponent implements OnInit {
  pipe = new DatePipe('en-US');
  getProyectos$: Observable<Proyecto[]>;
  proyectos: Proyecto[] = [];
  prioridades: any[];
  getIndicadores$: Observable<Indicador[]>;
  indicadores: Indicador[]= [];
  indicadoresAsignados: any[] = [];
  tareaDocenteProyecto: any = {};
  getDocentes$: Observable<Docente[]>;
  docentes: Docente[] = [];
  docentesAsignados: any[] = [];
  docente: Docente = {};
  tarea: Tarea = {};
  indicador: Indicador= {};
  ckequearIndicador: Boolean= false;
  getCargos$: Observable<Cargo[]>;
  cargos: Cargo[]=[];
  cargo: Cargo = {};
  cargodefault: Cargo = {
    codCargo:'0',
    nombreCargo:'Seleccione un cargo'
  };

  descripcionIndicador: string="";

  checkPanelEliminar:Boolean = false;

  constructor(
    private router:Router,
    private cargoService:CargoService,
    private tareaService:TareaService,
    private proyectoService: ProyectoService
    ) {
      this.getProyectos$ = this.proyectoService.obtenerProyectos();
      this.getCargos$ = this.cargoService.obtenerCargosModel();
      this.prioridades = prioridadTarea;
      this.tareaService.tareas$.subscribe((res) => {
        this.tareaDocenteProyecto = res;
        if (this.tareaDocenteProyecto == null) {
          this.back();
        }
        this.tarea = this.tareaDocenteProyecto.tarea;
        this.indicadoresAsignados = this.tareaDocenteProyecto.indicadors;
        this.docentesAsignados = this.tareaDocenteProyecto.docentes;

        //this.tareaDocente.fechaEntrega = new Date(this.tareaDocente.fechaEntrega);
        //this.tareaDocente.fechaEntrega = this.pipe.transform(this.tareaDocente.fechaEntrega, 'yyyy-MM-ddTHH:mm:ss');
      });
      this.getDocentes$ = this.tareaService.obtenerDocentes();
      this.getIndicadores$ = this.tareaService.obtenerIndicadores();
  }

  ngOnInit(): void {
    
    if(this.tarea.fechaEntregaTarea){
      //this.tarea.fechaEntregaTarea = new Date(this.tarea.fechaEntregaTarea);
      this.tarea.fechaEntregaTarea = this.pipe.transform(this.tarea.fechaEntregaTarea, 'yyyy-MM-ddTHH:mm:ss','UTC');
    }
    this.getProyectos();
    this.getCargos();
    //this.getDocentes();
    this.getIndicadores();
  }

  getCargos() {
    this.getCargos$.subscribe(cargos =>{
      this.cargos = cargos;
      this.cargos.unshift(this.cargodefault);
      this.cargo = this.cargodefault;
    });
  }

  getProyectos() {
    this.getProyectos$.subscribe(proyectos =>{
      this.proyectos = proyectos;
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
    this.tareaService.editarTarea(this.tareaDocenteProyecto)
    .subscribe(data=>{
      confirm("Se editaron los datos con éxito!!");
      this.router.navigate(["listar-tareas"]);
    })
  }

  back() {
    this.router.navigate(['listar-tareas']);
  }

  compararNombres( proyecto1:Proyecto, proyecto2:Proyecto) {
    if (proyecto1==null || proyecto2==null) {
      return false;
    }
    return proyecto1.nombreProyecto===proyecto2.nombreProyecto;
  }

  agregarElementos(){
    this.docentesAsignados.push(this.docente);
  }

  eliminarElementos(){
    this.docentesAsignados=this.docentesAsignados.filter((item) => item.codigoDocente !== this.docente.codigoDocente);
  }

  agregarIndicador(){
    this.indicador.descripcionIndicador = this.descripcionIndicador;
    this.descripcionIndicador = "";
    this.indicadoresAsignados.push(this.indicador);
    this.ckequearIndicador = false;
  }

  cancelarIndicador(){
    this.ckequearIndicador = false;
  }

  eliminarIndicador(){
    this.checkPanelEliminar = false;
    this.indicadoresAsignados=this.indicadoresAsignados.filter((item) => (item.codigoIndicador !== this.indicador.codigoIndicador || item.descripcionIndicador !== this.indicador.descripcionIndicador));
  }

  cancelarEliminarIndicador(){
    this.checkPanelEliminar=false;
  }

  visualizarPanelEliminar(){
    this.checkPanelEliminar = true;
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

}
