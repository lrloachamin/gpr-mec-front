import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cargo } from 'src/app/models/Cargo';
import { Perfil } from 'src/app/models/Perfil';
import { CargoService } from 'src/app/servicios/cargo.service';
import { UsuarioperfilService } from 'src/app/servicios/usuarioperfil.service';

@Component({
  selector: 'app-editar-cargo',
  templateUrl: './editar-cargo.html',
  styleUrls:['./editar-cargo.component.css']
})
export class EditarCargoComponent implements OnInit {
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
      console.log(this.perfiles);
    });
  }

  save(){ 
    console.log(this.cargo);
    /*this.cargoService.crearCargo(this.cargo)
    .subscribe(data=>{
      confirm("Se agrego con éxito!!");
      this.router.navigate(["listar-proyectos"]);
    })*/
  }

}
