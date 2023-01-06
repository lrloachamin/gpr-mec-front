import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed = true;
  usuario:any;
  descPerfil:any;

  constructor(private router:Router,private usuarioService: UsuarioService) { 
    this.usuario=localStorage.getItem('usuario');
    //this.descPerfil=localStorage.getItem('descPerfil');
    /*this.usuarioService.descPerfil$.subscribe((res) => {
      this.descPerfil = res;
      console.log(this.descPerfil);
      });*/
  }

  ngOnInit(): void {
    /*if(this.descPerfil==null)
      setTimeout('document.location.reload()',1500);*/
  }
  IsLoggedout(){
    this.router.navigate(['./login']);
    localStorage.removeItem('descPerfil');
    localStorage.removeItem('codigoDocente');
    //localStorage.clear();
    return localStorage.removeItem('usuario')
  }

  navegarProyecto(){
    this.router.navigate(['/listar-proyectos']);
  }

  navegarTareas(){
    this.router.navigate(['/listar-tareas']);
  }

  navegarTareasDocente(){
    this.router.navigate(['/listar-tareas-docente']);
  }
  navegarPerfil(){
    this.router.navigate(['/actualizar-docente']);
  }
  navegarUsuarioPerfil(){
    this.router.navigate(['/usuario-perfil']);
  }
  navegarTareasDocenteEntregadas(){
    this.router.navigate(['/tareas-entregadas']);
  }
  navegarTareasAsignadasDocentes(){
    this.router.navigate(['/tareas-asignadas']);
  }
  navegarTiposProcesos(){
    this.router.navigate(['/listar-tipos-procesos']);
  }
  navegarListarTareasRevisar(){
    this.router.navigate(['/listar-tareas-revisar']);
  }

}
