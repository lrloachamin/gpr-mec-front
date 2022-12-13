import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';

@Component({
  selector: 'app-editar-tipo-proceso',
  templateUrl: './editar-tipo-proceso.html'
})
export class EditarTipoProcesoComponent implements OnInit {
  tipoProceso: any = {};

  constructor(
    private router:Router,
    private tipoProcesoService:TipoProcesoService
    ) {
      this.tipoProcesoService.tipoProceso$.subscribe((res) => {
        this.tipoProceso = res;
        if (this.tipoProceso == null) {
          this.back();
        }
      });
  }

  ngOnInit(): void {
  }

  save(){
    this.tipoProcesoService.editarTipoProceso(this.tipoProceso)
    .subscribe(data=>{
      confirm("Se editaron los datos con éxito!!");
      this.router.navigate(["listar-tipos-procesos"]);
    })
  }

  back() {
    this.router.navigate(['listar-tipos-procesos']);
  }

}
