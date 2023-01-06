import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TareaService } from 'src/app/servicios/tarea.service';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { Docente } from 'src/app/models/Docente';

@Component({
  selector: 'app-listar-tareas-asignadas',
  templateUrl: './listar-tareas-asignadas.html',
  styleUrls: ['./listar-tareas-asignadas.component.css']
})
export class ListarTareasAsignadasComponent implements OnInit {

  getDocente$: Observable<Docente[]>;
  docentes: Docente[] = [];
  getTareaDocente$: Observable<TareaDocente[]>;
  tareaDocentes: any[] = [];
  pesoTarea:any;

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
      var sum=0;
      var pesoTransformado;
      t.tareaDocenteList.forEach(tareaDocent => {
        if(tareaDocent.codigoTarea?.pesoTarea == "HORA"){
          if(tareaDocent.codigoTarea?.valorPesoTarea)
            sum+=tareaDocent.codigoTarea?.valorPesoTarea; 
        }else if(tareaDocent.codigoTarea?.pesoTarea == "DIA"){
          if(tareaDocent.codigoTarea?.valorPesoTarea){
            pesoTransformado=tareaDocent.codigoTarea?.valorPesoTarea*24;
            sum+=pesoTransformado; 
          }
        }else if(tareaDocent.codigoTarea?.pesoTarea == "MES"){
          if(tareaDocent.codigoTarea?.valorPesoTarea){
            pesoTransformado=tareaDocent.codigoTarea?.valorPesoTarea*720;
            sum+=pesoTransformado; 
          }
        }
      });
      if(sum==0)
        t.cargaHoraria=0;
      else if(sum>0 && sum<=72)
        t.cargaHoraria=25;
      else if(sum>72 && sum<=120)
        t.cargaHoraria=50;
      else if(sum>120 && sum<=168)
        t.cargaHoraria=75;
      else
        t.cargaHoraria=100;
    })
  }    
}
