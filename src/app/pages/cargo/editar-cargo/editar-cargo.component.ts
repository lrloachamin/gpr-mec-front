import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Proyecto } from 'src/app/models/Proyecto';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';

@Component({
  selector: 'app-editar-cargo',
  templateUrl: './editar-cargo.html'
})
export class EditarCargoComponent implements OnInit {
  proyecto: any = {};
  getProcesos$: Observable<TipoProceso[]>;
  tipoProcesos: TipoProceso[]=[];
  
  constructor(
    private router:Router,
    private proyectoService:ProyectoService,
    private tipoProcesoService: TipoProcesoService
    ) {
      this.proyectoService.proyecto$.subscribe((res) => {
        this.proyecto = res;
        if (this.proyecto == null) {
          this.back();
        }/* else {
          this.getAll();
        }*/
      });
      this.getProcesos$ = this.tipoProcesoService.obtenerTipoProcesos();

  }

  ngOnInit(): void {
    this.getProcesos();
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

  getProcesos(){
    this.getProcesos$.subscribe(tipoProcesos =>{
      this.tipoProcesos = tipoProcesos;
    });
  }

  compararProcesos( tipoProceso1:TipoProceso, tipoProceso2:TipoProceso) {
    if (tipoProceso1==null || tipoProceso2==null) {
      return false;
    }
    return tipoProceso1.nombreTipoProceso===tipoProceso2.nombreTipoProceso;
  }

}
