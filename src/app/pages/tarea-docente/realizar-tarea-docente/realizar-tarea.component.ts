import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Indicador } from 'src/app/models/Indicador';
import { Tarea } from 'src/app/models/Tarea';
import { TareaIndicador } from 'src/app/models/TareaIndicador';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-realizar-tarea',
  templateUrl: './realizar-tarea.html'
})
export class RealizarTareaComponent implements OnInit {
  indicadoresAsignados: any[] = [];
  valorIndicadores:any[] = [];
  getIndicadorTarea$: Observable<TareaIndicador[]>;
  tareaDocente: any = {};
  tarea: Tarea = {};
  tareaIndicadors:TareaIndicador[]=[];

  constructor(
    private router:Router,
    private tareaService:TareaService
    ) {
      this.tareaService.tareaDocente$.subscribe((res) => {
        this.tareaDocente = res;
        if (this.tareaDocente == null) {
          this.back();
        }
        this.tarea = this.tareaDocente.codigoTarea;
        
        
      });
      this.getIndicadorTarea$ = this.tareaService.obtenerIndicadoresTarea(this.tareaDocente.codigoTareaDocente);
      //this.indicadoresAsignados  = this.tareaDocente.tareaIndicadorList;
  }

  ngOnInit(): void {
    this.getIndicadorTarea();
  }

  getIndicadorTarea() {
    this.getIndicadorTarea$.subscribe(tareasIndicador =>{
      tareasIndicador.forEach(t => {
        this.indicadoresAsignados.push(t);
      });
    });
  }

  save(){
    this.tareaService.guardarTareaAsignadaAlDocente(this.tareaIndicadors)
    .subscribe(data=>{
      confirm("Se guardaron sus datos con éxito!!");
      this.router.navigate(["listar-tareas-docente"]);
    })
  }

  back() {
    this.router.navigate(['listar-tareas-docente']);
  }

  asignarIndicador(tareaIndicador:any){
    if(!this.tareaIndicadors.includes(tareaIndicador.codigoTareaIndicador))
      this.tareaIndicadors=this.tareaIndicadors.filter((item) => item.codigoTareaIndicador !== tareaIndicador.codigoTareaIndicador );
    this.tareaIndicadors.push(tareaIndicador);
  }

}
