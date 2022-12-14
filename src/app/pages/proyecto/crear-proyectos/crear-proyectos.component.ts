import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/app/models/Proyecto';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';

@Component({
  selector: 'app-crear-proyectos',
  templateUrl: './crear-proyectos.html'
})
export class CrearProyectosComponent implements OnInit {
  proyecto: Proyecto = {};
  getProcesos$: Observable<TipoProceso[]>;
  tipoProcesos: TipoProceso[]=[];

  constructor(
    private router:Router,
    private proyectoService:ProyectoService,
    private tipoProcesoService: TipoProcesoService
    ) {
      this.getProcesos$ = this.tipoProcesoService.obtenerTipoProcesos();
  }

  ngOnInit(): void {
    this.getProcesos();
  }

  getProcesos(){
    this.getProcesos$.subscribe(tipoProcesos =>{
      this.tipoProcesos = tipoProcesos;
    });
  }

  save(){
    this.proyectoService.crearProyecto(this.proyecto)
    .subscribe(data=>{
      confirm("Se agrego con éxito!!");
      this.router.navigate(["listar-proyectos"]);
    })
  }

}
