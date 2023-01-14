import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/Cargo';
import { Perfil } from 'src/app/models/Perfil';
import { Proyecto } from 'src/app/models/Proyecto';
import { TipoProceso } from 'src/app/models/TipoProceso';
import { CargoService } from 'src/app/servicios/cargo.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TipoProcesoService } from 'src/app/servicios/tipo-proceso.service';
import { UsuarioperfilService } from 'src/app/servicios/usuarioperfil.service';

@Component({
  selector: 'app-crear-cargo',
  templateUrl: './crear-cargo.html'
})
export class CrearCargoComponent implements OnInit {
  cargo: Cargo = {};
  //getCargos$: Observable<Cargo[]>;
  cargos: Cargo[]=[];
  perfil:Perfil= {};
  getPerfiles$: Observable<Perfil[]>;
  perfiles: Perfil[]=[];
  
  constructor(
    private router:Router,
    private perfilesService:UsuarioperfilService,
    private cargoService: CargoService
    ) {
      //this.getCargos$ = this.cargoService.obtenerCargosModel();
      this.getPerfiles$ = this.perfilesService.obtenerPerfiles();
  }

  ngOnInit(): void {
    //this.getCargos();
    this.getPerfiles();
  }

  getCargos(){
    /*this.getCargos$.subscribe(cargo =>{
      this.cargos = cargo;
    });*/
  }

  getPerfiles(){
    this.getPerfiles$.subscribe(perfiles =>{
      this.perfiles = perfiles;
    });
  }

  save(){
    this.cargoService.crearCargo(this.cargo)
    .subscribe(data=>{
      confirm("Se agrego con éxito!!");
      this.router.navigate(["listar-proyectos"]);
    })
  }

}
