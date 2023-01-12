import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { Docente } from 'src/app/models/Docente';

@Component({
  selector: 'app-listar-logueo-usuarios',
  templateUrl: './listar-logueo-usuarios.html',
  styleUrls: ['./listar-logueo-usuarios.component.css']
})
export class ListarLogueoUsuariosComponent implements OnInit {

  getDocente$: Observable<Docente[]>;
  docentes: Docente[] = [];
  tareaDocentes: any[] = [];
  pesoTarea:any;

  constructor(
    private tareaService: TareaService
  ) {
    this.getDocente$ = this.tareaService.obtenerDocentes();
  }

  ngOnInit(): void {
   this.getDocentes();
  }

  getDocentes() {
    this.getDocente$.subscribe(docentes =>{
      this.docentes = docentes;
      this.docentes.forEach(docente => {
        this.getTareasDocente(docente);  
        });
    });
  }

  getTareasDocente(docente:Docente) {
    if(docente.numLogueo==null){
      docente.cargaHoraria=0;
    }else if(docente.numLogueo >0 && docente.numLogueo<=25){
      docente.cargaHoraria=25;
      docente.claseEstiloProgress="rojo";
    }else if(docente.numLogueo>25 && docente.numLogueo<=50){
      docente.cargaHoraria=50;
      docente.claseEstiloProgress="amarillo";
    }else if(docente.numLogueo>50 && docente.numLogueo<=75){
      docente.cargaHoraria=75;
      docente.claseEstiloProgress="casiverde";
    }else{
      docente.cargaHoraria=100;
      docente.claseEstiloProgress="verde";
    }
  }    
}
