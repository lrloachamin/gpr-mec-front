import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { Docente } from 'src/app/models/Docente';

@Component({
  selector: 'app-listar-tareas-asignadas',
  templateUrl: './listar-tareas-asignadas.html'
})
export class ListarTareasAsignadasComponent implements OnInit {

  getDocente$: Observable<Docente[]>;
  docentes: Docente[] = [];
  getTareaDocente$: Observable<TareaDocente[]>;
  tareaDocentes: any[] = [];
  constructor(
    private tareaService: TareaService,
    private router: Router,
  ) {
    this.getTareaDocente$ = new Observable;
    this.getDocente$ = this.tareaService.obtenerDocentes();
  }

  ngOnInit(): void {
   this.getTareas();
  }

  getTareas() {
    this.getDocente$.subscribe(tareas =>{
      this.docentes = tareas;  
      this.docentes.forEach(t => {
        
      this.getTareaDocente$ = this.tareaService.obtenerTareasAsignadasDocentes(t.codigoDocente);
      this.getTareasDocente(t);  
      //t.tareaDocenteList = this.tareaDocentes;
      });
      //console.log(this.docentes);
    });
  }

  getTareasDocente(t:Docente) {
    this.getTareaDocente$.subscribe(tareaDocentes =>{
      t.tareaDocenteList = tareaDocentes;
      t.cantidadTarea = tareaDocentes.length;
      //console.log(t.tareaDocenteList);
    })
  }    
}
