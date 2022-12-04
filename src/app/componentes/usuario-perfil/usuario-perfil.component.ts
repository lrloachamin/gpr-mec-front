import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/servicios/registro.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {

  //variables perfil
   codPerfil:any;
   descPerfil:any;
   ObsPerfil:any;
   up!:usuarioperfil;
   perfil:any;

   listaDocentes:any;
   dataDocentes!:usuarioperfil[];

  constructor(
    private _docente: RegistroService
  ) { 

    this.cargarDocentes();
   // this.asignarDocentesCheck();
  }

  ngOnInit(): void {
    this.cargarDocentes();

  }


  cargarPerfiles(){


  }

  cargarDocentes(){
    this._docente.obtenerDocentes().subscribe(respuesta=>{
      
      this.procesarDocentes(respuesta);
      
    })
  }
  procesarDocentes(resp: any){
    this.listaDocentes=resp.docenteResponse.docente
  }

  asignarDocentesCheck(){
    this.cargarDocentes()
  this.dataDocentes=new Array();

    this.listaDocentes.forEach((element: {
      codigoUsuario:any,nombreDocente:any;apellidoDocente:any;

    }) => {
      console.log(element)
       this.up=new usuarioperfil(element.codigoUsuario.codigoUsuario,element.nombreDocente+" "+element.apellidoDocente,false);

      this.dataDocentes.push(this.up)
       
      })

      console.log(this.dataDocentes)

  }

  
 

}

class usuarioperfil{

  idUsuario!:string;
  nombreUsuario!:string;
  isSelected!:boolean;

  constructor(idUsuario:string,nombreUsuario:string,isSelected:boolean ){
    this.idUsuario=idUsuario
    this.nombreUsuario=nombreUsuario
    this.isSelected=isSelected

  }

  
}
