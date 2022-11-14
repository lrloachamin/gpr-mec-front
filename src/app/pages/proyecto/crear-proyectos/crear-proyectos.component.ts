import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-crear-proyectos',
  templateUrl: './crear-proyectos.html'
})
export class CrearProyectosComponent implements OnInit {
  proyecto: Proyecto = {};
  constructor(
    private router:Router,
    private proyectoService:ProyectoService
    ) {
  }

  ngOnInit(): void {
  }

  save(){
    this.proyectoService.crearProyecto(this.proyecto)
    .subscribe(data=>{
      confirm("Se agrego con éxito!!");
      this.router.navigate(["listar-proyectos"]);
    })
  }

}
