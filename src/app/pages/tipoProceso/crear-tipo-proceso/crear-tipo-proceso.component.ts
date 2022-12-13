import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';

@Component({
  selector: 'app-crear-tipo-proceso',
  templateUrl: './crear-tipo-proceso.html'
})
export class CrearTipoProcesoComponent implements OnInit {
  tipoProceso: TipoProceso = {};
  constructor(
    private router:Router,
    private tipoProcesoService:TipoProcesoService
    ) {
  }

  ngOnInit(): void {
  }

  save(){
    this.tipoProcesoService.crear(this.tipoProceso)
    .subscribe(data=>{
      confirm("Se agrego con éxito!!");
      this.router.navigate(["listar-tipos-procesos"]);
    })
  }

}
