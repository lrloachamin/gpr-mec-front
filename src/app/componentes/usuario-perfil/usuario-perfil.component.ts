import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/servicios/registro.service';
import { UsuarioperfilService } from 'src/app/servicios/usuarioperfil.service';

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
   listaPerfiles:any;
   dataDocenteseleccionados!:usuarioperfil[];
   dataDocenteNoseleccionados!:usuarioperfil[];
   dataDocenteFinal!:usuarioperfil[];

   formularioUsuPer!: FormGroup;

  constructor(
    private _docente: RegistroService,
    private _usuarioperfil:UsuarioperfilService,
    private fb: FormBuilder
  ) { 

    this.cargarDocentes();
   

    this.iniciarFormulario();
   // this.asignarDocentesCheck();
  }

  ngOnInit(): void {
   // this.cargarDocentes();
   this.cargarPerfiles();

  }

  iniciarFormulario(){
    this.formularioUsuPer = this.fb.group({
      id: ['', Validators.required],
 
    })

  }




  cargarDocentes(){
    this._docente.obtenerDocentes().subscribe(respuesta=>{
      
      this.procesarDocentes(respuesta);
      
    })
  }
  procesarDocentes(resp: any){
    this.listaDocentes=resp.docenteResponse.docente
  }

  cargarPerfiles(){
    this._usuarioperfil.obtenerUsuario().subscribe(respuesta=>{
      
      this.procesarPerfiles(respuesta);
      
    })
  }
  procesarPerfiles(resp: any){
    this.listaPerfiles=resp.perfilResponse.perfil

    console.log(this.listaPerfiles)


  }

  asignarDocentesCheck(){
    this.cargarDocentes()
    //this.cargarPerfiles();

  console.log("combo"+this.perfil.usuperList)

  this.dataDocenteNoseleccionados=new Array();


  var usuperList=this.perfil.usuperList
  this.dataDocenteseleccionados=new Array();

  usuperList.forEach((element: {
    codigoUsuario:any,nombreUsuario:any;

  }) => {

    this.up=new usuarioperfil(element.codigoUsuario.codigoUsuario,element.codigoUsuario.nombreUsuario,true);

      this.dataDocenteseleccionados.push(this.up)
     
    })

    this.listaDocentes.forEach((element: {
      codigoUsuario:any,nombreDocente:any;apellidoDocente:any;

    }) => {
      console.log(element)

      this.up=new usuarioperfil(element.codigoUsuario.codigoUsuario,element.codigoUsuario.nombreUsuario,false); 

      console.log("array"+this.dataDocenteseleccionados);
      console.log("obj"+this.up);

      const resultado=this.dataDocenteseleccionados.find(up=>up.codigoUsuario===element.codigoUsuario.codigoUsuario)
     
      console.log("resultadp"+resultado)
      if(resultado===undefined){
        this.dataDocenteNoseleccionados.push(this.up)

      }
    
       
      })

      console.log(this.dataDocenteNoseleccionados)


  }


}

class usuarioperfil{

  codigoUsuario!:string;
  nombreUsuario!:string;
  isSelected!:boolean;

  constructor(codigoUsuario:string,nombreUsuario:string,isSelected:boolean ){
    this.codigoUsuario=codigoUsuario
    this.nombreUsuario=nombreUsuario
    this.isSelected=isSelected

  }

  
}
