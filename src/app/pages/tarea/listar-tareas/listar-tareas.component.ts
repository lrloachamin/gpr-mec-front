import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.html'
})
export class ListarTareasComponent implements OnInit {

  getTareas$: Observable<TareaDocente[]>;
  tareas: TareaDocente[] = [];
  
  constructor(
    private tareaService: TareaService,
    private router: Router,
  ) {
    this.getTareas$ = this.tareaService.obtenerTareas();
  }

  ngOnInit(): void {
   this.getTareas();
  }

  getTareas() {
    this.getTareas$.subscribe(tareas =>{
      this.tareas = tareas;  
    });
  }

  navegarCrearTarea(){
    this.router.navigate(['crear-tareas']);
  }

  editar(tareaDocente:TareaDocente){
    this.tareaService.setTarea(tareaDocente);
    this.router.navigate(['editar-tarea']);
  }
}
