import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';
import * as $ from 'jquery' 

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
    $(".search").keyup(function(){
      rastreator($(this));
    });
    $(".search").keydown(function(){
        rastreator($(this));
    });
    function rastreator(elem:any){
        var rastrear="#datos tbody tr ."+elem.attr("busqueda");
        var contenido=elem.val();
        $(rastrear).each(function(){
            var texto=$(this).text();
            if(texto.startsWith(contenido)){
                $(this).parents("tr").show();
            }else{
                $(this).parents("tr").hide();
            }
        });
    }
  }

  getTareas() {
    this.getTareasDocente$.subscribe(tareas =>{
      this.tareasDocente = tareas;  
      console.log(this.tareasDocente);
    });
  }

}
