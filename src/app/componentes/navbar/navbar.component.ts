import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isMenuCollapsed = true;
  usuario:any

  constructor(private router:Router) { 
    this.usuario=localStorage.getItem('usuario')
  }

  ngOnInit(): void {
  }
  IsLoggedout(){
    this.router.navigate(['./login']);
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
}
