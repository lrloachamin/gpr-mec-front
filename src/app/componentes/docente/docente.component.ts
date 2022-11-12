import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  listaDocentes:any
  filterpost:any
  

  constructor(private _docente: RegistroService) { 
    
    this.cargarDocentes();
  }

  ngOnInit(): void {
  }

  cargarDocentes(){
    this._docente.obtenerDocentes().subscribe(respuesta=>{
      console.log(respuesta)
      this.filterpost='';
      this.procesarDocentes(respuesta);
      
    })
  }
  procesarDocentes(resp: any){
    this.listaDocentes=resp.docenteResponse.docente
  }

}
