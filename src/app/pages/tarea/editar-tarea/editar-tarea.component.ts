import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { DatePipe } from '@angular/common'
import { TareaDocente } from 'src/app/models/TareaDocente';

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
  tareaDocente: any = {};
  getProyectos$: Observable<Proyecto[]>;
  proyectos: Proyecto[] = [];
  prioridades: any[];
  pipe = new DatePipe('en-US');

  constructor(
    private router:Router,
    private tareaService:TareaService,
    private proyectoService: ProyectoService
    ) {
      this.getProyectos$ = this.proyectoService.obtenerProyectos();
      this.prioridades = prioridadTarea;
      this.tareaService.tareas$.subscribe((res) => {
        this.tareaDocente = res;
        if (this.tareaDocente == null) {
          this.back();
        }
        //this.tareaDocente.fechaEntrega = new Date(this.tareaDocente.fechaEntrega);
        this.tareaDocente.fechaEntrega = this.pipe.transform(this.tareaDocente.fechaEntrega, 'yyyy-MM-dd');
      });
  }

  ngOnInit(): void {
    this.getProyectos();
  }

  getProyectos() {
    this.getProyectos$.subscribe(proyectos =>{
      this.proyectos = proyectos;
    });
  }

  save(){
    this.tareaService.editarTarea(this.tareaDocente)
    .subscribe(data=>{
      confirm("Se editaron los datos con éxito!!");
      this.router.navigate(["listar-tareas"]);
    })
  }

  back() {
    this.router.navigate(['listar-tareas']);
  }

  compararNombres( tareaDocente1:TareaDocente, tareaDocente2:TareaDocente) {
    return tareaDocente1.codigoTarea?.codigoProyecto===tareaDocente2.codigoTarea?.codigoProyecto;
  }

}
