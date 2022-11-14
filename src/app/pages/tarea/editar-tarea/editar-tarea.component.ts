import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.html'
})
export class EditarTareaComponent implements OnInit {
  proyecto: any = {};

  constructor(
    private router:Router,
    private proyectoService:ProyectoService
    ) {
      this.proyectoService.proyecto$.subscribe((res) => {
        this.proyecto = res;
        if (this.proyecto == null) {
          this.back();
        }
      });
  }

  ngOnInit(): void {
  }

  save(){
    this.proyectoService.editarProyecto(this.proyecto)
    .subscribe(data=>{
      confirm("Se editaron los datos con éxito!!");
      this.router.navigate(["listar-proyectos"]);
    })
  }

  back() {
    this.router.navigate(['listar-proyectos']);
  }

}
