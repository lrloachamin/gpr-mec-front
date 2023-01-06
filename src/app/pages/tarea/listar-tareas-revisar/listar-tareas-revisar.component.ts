import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-listar-tareas-revisar',
  templateUrl: './listar-tareas-revisar.html'
})
export class ListarTareasRevisarComponent implements OnInit {

  getTareasDocente$: Observable<TareaDocente[]>;
  tareasDocente: TareaDocente[] = [];
  cedulaDocenteRevisor:any;

  constructor(
    private tareaService: TareaService,
  ) {
    this.getTareasDocente$ = this.tareaService.obtenerTodasTareasRevisar();
  }

  ngOnInit(): void {
   this.getTareas();
  }

  getTareas() {
    this.getTareasDocente$.subscribe(tareas =>{
      this.tareasDocente = tareas;  
      console.log(this.tareasDocente);
    });
  }

}
