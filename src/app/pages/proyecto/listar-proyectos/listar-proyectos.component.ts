import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/Proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-listar-proyectos',
  templateUrl: './listar-proyectos.html'
})
export class ListarProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];
  
  constructor(
    private proyectoService: ProyectoService
  ) { }

  ngOnInit(): void {
   // this.getDataAccount();
  }

  /*getDataAccount() {
    this.cAccountService.obtainActivesByGroup(this.authenticationService.authenticatedUser.groupInternalId)
      .subscribe(
        res => {
          if(res.length > 0) {
            this.account = res[0];
            this.getOrders();
          }
        }
      );
  }*/

  getProyecto() {
    this.proyectoService.obtenerProyectos().subscribe(
      res => {
        console.log(res);
        this.proyectos = res;
      },
      err => {
        //this.messageService.add({key: 'gl', severity:'error', summary:'Error', detail:'Error al obtener los pagos pendientes'});
      }
    );
  }

}
