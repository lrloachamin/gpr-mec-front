import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.html'
})
export class EditarProyectoComponent implements OnInit {
  proyecto: any = {};

  constructor(
    private router:Router,
    private proyectoService:ProyectoService
    ) {
      this.proyectoService.proyecto$.subscribe((res) => {
        this.proyecto = res;
        if (this.proyecto == null) {
          this.back();
        }/* else {
          this.getAll();
        }*/
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

  /*getAll() {
    this.proyectoService.obtenerProyectoPorId(this.proyecto.codigoProyecto).subscribe({
      next: (res) => {
        if(res) {
          this.collectionsOrder = res;
          this.loadOptions();
        }
      }
    });
  }
  */
}
