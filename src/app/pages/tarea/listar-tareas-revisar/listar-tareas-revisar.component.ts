import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { TareaService } from 'src/app/servicios/tarea.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, AbstractControl} from '@angular/forms';
//
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-listar-tareas-revisar',
  templateUrl: './listar-tareas-revisar.html',
  styleUrls: ['./listar-tareas-revisar.component.css']
})

export class ListarTareasRevisarComponent implements OnInit {

  //getTareasDocente$: Observable<TareaDocente[]>;
  //tareasDocente: TareaDocente[] = [];
  tareasDocente:any[]| undefined = [] ;
  cedulaDocenteRevisor:any;
  dataTable:any | null;//[] = [];
  data:any;
  //sum:number=0;

  //
  displayedColumns: string[] = ['id','revisor', 'proceso', 'proyecto', 'tarea','prioridad','peso','fechaInicio','fechaVencimiento','responsable'];
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource:any;
  
  readonly formControl: AbstractControl;
  //

  constructor(
    private tareaService: TareaService,
    //
    formBuilder: FormBuilder
  ) {
    //this.getTareasDocente$ = this.tareaService.obtenerTodasTareasRevisar();
    //
    /*this.tareaService.tareasDocente$.subscribe((res) => {
      this.tareasDocente = res;
      console.log(this.tareasDocente);
      
      
    });*/
    if(localStorage.getItem('dataTable')!=null){
      this.data= localStorage.getItem('dataTable');
      this.dataTable =JSON.parse(this.data);
      this.dataSource = new MatTableDataSource(this.dataTable); 
    }
      
    
    //this.getTareas();
    
    this.dataSource.filterPredicate = ((data, filter) => {
      console.log(data)
      const a = !filter.revisor || data.revisor === filter.revisor;
      const b = !filter.proceso || data.proceso.toLowerCase().includes(filter.proceso);
      const c = !filter.proyecto || data.proyecto === filter.proyecto;
      return a && b && c;
    }) as (PeriodicElement:any, string:any) => boolean;

    this.formControl = formBuilder.group({
      revisor: '',
      proceso: '',
      proyecto: '',
    })
    this.formControl.valueChanges.subscribe(value => {
      const filter = {...value, proceso: value.proceso.trim().toLowerCase()} as string;
      this.dataSource.filter = filter;
    });
  }

  ngOnInit(): void {
    
   //this.getTareas();
   /*
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
    }*/
  }

  /*getTareas() {
    this.getTareasDocente$.subscribe(tareas =>{
      this.tareasDocente = tareas;  
      this.tareasDocente.forEach(tareaDocent => {
          let objetoTarea = {
            "revisor":tareaDocent.codigoTarea?.nombreDocenteRevisor,
            "proceso":tareaDocent.codigoTarea?.codigoProyecto?.tipoProceso?.nombreTipoProceso,
            "proyecto":tareaDocent.codigoTarea?.codigoProyecto?.nombreProyecto,
            "tarea":tareaDocent.codigoTarea?.nombreTarea, 
            "prioridad":tareaDocent.codigoTarea?.prioridadTarea,
            "peso":tareaDocent.codigoTarea?.valorPesoTarea+" "+ tareaDocent.codigoTarea?.pesoTarea,
            "fechaInicio":tareaDocent.codigoTarea?.nombreDocenteRevisor, 
            "fechaVencimiento":tareaDocent.codigoTarea?.nombreDocenteRevisor, 
            "responsable":tareaDocent.codigoDocente?.nombreDocente +" "+ tareaDocent.codigoDocente?.apellidoDocente
          }
          this.dataTable.push(objetoTarea);
      });
      console.log(this.dataTable);
      console.log(ELEMENT_DATA2);
      //this.dataSource = new MatTableDataSource(this.dataTable);
    });
  }*/
}
