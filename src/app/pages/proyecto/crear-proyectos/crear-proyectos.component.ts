import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/Proyecto';

@Component({
  selector: 'app-crear-proyectos',
  templateUrl: './crear-proyectos.html'
})
export class CrearProyectosComponent implements OnInit {
  proyecto: Proyecto = {};
  constructor() { }

  ngOnInit(): void {
  }

  save(){
    
  }

}
