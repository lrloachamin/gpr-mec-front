import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.html'
})
export class CrearTareaComponent implements OnInit {
  //tarea: TareaDocente = {};
  tarea: any = {};
  constructor(
    private router:Router,
    private tareaService:TareaService
    ) {
  }

  ngOnInit(): void {
  }

  save(){
    this.tareaService.crearTarea(this.tarea)
    .subscribe(data=>{
      confirm("Se agrego con éxito!!");
      this.router.navigate(["listar-proyectos"]);
    })
  }

}
