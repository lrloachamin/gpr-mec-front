import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/models/Docente';
import { Indicador } from 'src/app/models/Indicador';
import { Proyecto } from 'src/app/models/Proyecto';
import { Tarea } from 'src/app/models/Tarea';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaDocenteProyecto } from 'src/app/models/TareaDocenteProyecto';
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

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.html'
})

export class CrearTareaComponent implements OnInit {
  //tarea: TareaDocente = {};
  getProyectos$: Observable<Proyecto[]>;
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
  getIndicadores$: Observable<Indicador[]>;
  tareaDocenteProyecto: TareaDocenteProyecto = {};
  constructor(
    private router:Router,
    private tareaService:TareaService,
    private proyectoService: ProyectoService
    ) {
      this.getProyectos$ = this.proyectoService.obtenerProyectos();
      this.getDocentes$ = this.tareaService.obtenerDocentes();
      this.prioridades = prioridadTarea;
      this.getIndicadores$ = this.tareaService.obtenerIndicadores();
  }

  ngOnInit(): void {
    this.getProyectos();
    this.getDocentes();
    this.getIndicadores();
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
    this.tareaService.crearTarea(this.tareaDocenteProyecto)
    .subscribe(data=>{
      confirm("Se creo la tarea!!");
      this.router.navigate(["listar-tareas"]);
    })
    
  }

  getValidPrioridades() {
    this.prioridades.forEach(prioridades => {
            this.validTypes.push(prioridades);
    });
  }
  
  agregarElementos(){
    this.docentesAsignados.push(this.tareaDocente.codigoDocente);
  }

  eliminarElementos(){
    this.docentesAsignados=this.docentesAsignados.filter((item) => item !== this.tareaDocente.codigoDocente );
  }

  agregarIndicador(){
    this.indicadoresAsignados.push(this.indicador);
  }

  eliminarIndicador(){
    this.indicadoresAsignados=this.indicadoresAsignados.filter((item) => item !== this.indicador );
  }
}
