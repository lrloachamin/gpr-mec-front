import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/models/Docente';
import { Proyecto } from 'src/app/models/Proyecto';
import { TareaDocente } from 'src/app/models/TareaDocente';
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
  tarea: any = {};
  proyectos: any ={};
  docentes: any ={};
  prioridades: any[];
  constructor(
    private router:Router,
    private tareaService:TareaService,
    private proyectoService: ProyectoService
    ) {
      this.getProyectos$ = this.proyectoService.obtenerProyectos();
      this.getDocentes$ = this.tareaService.obtenerDocentes();
      this.prioridades = prioridadTarea;
  }

  ngOnInit(): void {
    this.getProyectos();
    this.getDocentes
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

  save(){
    this.tareaService.crearTarea(this.tarea)
    .subscribe(data=>{
      confirm("Se agrego con éxito!!");
      this.router.navigate(["listar-proyectos"]);
    })
  }

  getValidPrioridades() {
    this.prioridades.forEach(prioridades => {
            this.validTypes.push(prioridades);
    });
  }

}
