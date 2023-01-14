import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { timeStamp } from 'console';
import { OpcionesporperfilService } from 'src/app/servicios/opcionesporperfil.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //Menus

  menusAdministrativo: any;
  menusCuenta: any;
  menusTareas: any;
  menusReportes: any;




  public isMenuCollapsed = true;
  usuario: any;
  descPerfil: any;
  nombreDocenteRevisor: any;

  menus: any;

  constructor(private router: Router, private usuarioService: UsuarioService, private _opcionperfil: OpcionesporperfilService) {
    this.usuario = localStorage.getItem('usuario');
    
    this.agregarMenus();
    //this.descPerfil=localStorage.getItem('descPerfil');
    /*this.usuarioService.descPerfil$.subscribe((res) => {
      this.descPerfil = res;
      console.log(this.descPerfil);
      });*/


  }


  cargarOpcionesPerfil(id: any) {
    this._opcionperfil.obtenerOpcionesPerfil(id).subscribe(respuesta => {


      this.procesarOpcionesPerfil(respuesta);

    })
  }
  procesarOpcionesPerfil(resp: any) {
    this.menus = resp.opcionPerfilResponse.opcper

    
    
    this.menus.forEach((element: {
      codigoOpcion: any

    }) => {


      

      switch(element.codigoOpcion.codSistema.descriSistema) {
        case "Administrativo":
          this.menusAdministrativo.push(element.codigoOpcion.descOpcion)
          break;
        case "Tareas":
          this.menusTareas.push(element.codigoOpcion.descOpcion)
          break;
        case "Cuenta":
          this.menusCuenta.push(element.codigoOpcion.descOpcion)
            break;

        case "Reportes":
          this.menusReportes.push(element.codigoOpcion.descOpcion)
          break;

        default:
          break;
      }
     

    })

    console.log(this.menusCuenta)

  }

  agregarMenus() {


    this.cargarOpcionesPerfil("1")

    this.cargarOpcionesPerfil("1")

    var listmenu = this.menus;




  }

  ngOnInit(): void {
    this.cargarOpcionesPerfil("1")
    /*if(this.descPerfil==null)
      setTimeout('document.location.reload()',1500);*/
  }
  IsLoggedout() {



    this.router.navigate(['./login']);
    localStorage.removeItem('descPerfil');
    localStorage.removeItem('codigoDocente');
    //localStorage.clear();
    return localStorage.removeItem('usuario')
  }

  navegarProyecto() {
    this.router.navigate(['/listar-proyectos']);
  }

  navegarTareas() {
    this.router.navigate(['/listar-tareas']);
  }

  navegarTareasDocente() {
    this.router.navigate(['/listar-tareas-docente']);
  }
  navegarPerfil() {
    this.router.navigate(['/actualizar-docente']);
  }
  navegarUsuarioPerfil() {
    this.router.navigate(['/usuario-perfil']);
  }
  navegarTareasDocenteEntregadas() {
    this.router.navigate(['/tareas-entregadas']);
  }
  navegarTareasAsignadasDocentes() {
    this.router.navigate(['/tareas-asignadas']);
  }
  navegarTiposProcesos() {
    this.router.navigate(['/listar-tipos-procesos']);
  }
  navegarListarTareasRevisar() {
    this.router.navigate(['/listar-tareas-revisar']);
  }
  navegarLogueosRealizados() {
    this.router.navigate(['/listar-logueo-usuarios']);
  }
  navegarListarTareasCargos(){
    this.router.navigate(['/listar-cargos']);
  }
}
