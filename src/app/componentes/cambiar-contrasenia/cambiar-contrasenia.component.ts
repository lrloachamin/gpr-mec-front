import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent implements OnInit {

  
  listaDocentes:any;
  nombreUsuario:any;

  formularioContrasenia!: FormGroup;

  constructor(private fb:FormBuilder,private _usuario:UsuarioService, private router:Router) {
    
    this.iniciarFormulario();
    
    this.nombreUsuario=localStorage.getItem('usuario');
    this.cargarDocentes();
    
    
   
  }

  ngOnInit(): void {
    
  }

  iniciarFormulario(){
    this.formularioContrasenia=this.fb.group({
      passwordAnt:['',Validators.required],
      passwordNew:['',Validators.required],
      passwordConf:['',Validators.required]
    })
    
  }

  cambiarContrasenia(){
    this.cargarDocentes();
   console.log (this.formularioContrasenia.value.passwordNew)
   console.log(this.listaDocentes.passwUsuario)

   let usuariodata={
    codigoUsuario: this.listaDocentes.codigoUsuario,
    nombreUsuario: this.listaDocentes.nombreUsuario,
    passwUsuario: this.formularioContrasenia.value.passwordNew,
    fechaCreUsu: this.listaDocentes.fechaCreUsu,
    fechaModUsuario: this.listaDocentes.fechaModUsuario,
    estadoUsuario: this.listaDocentes.estadoUsuario
  }
  console.log(usuariodata)

  this._usuario.actualizarUsuario(usuariodata,this.listaDocentes.codigoUsuario).subscribe(respuesta=>{

  },(error:any)=>{
    console.log(error)
  })


  }


  cargarDocentes(){
    
    this._usuario.obtenerUsuarioPorNombre(this.nombreUsuario).subscribe(respuesta=>{
      
      this.procesarDocentes(respuesta);
      
    })
  }
  procesarDocentes(resp: any){
    this.listaDocentes=resp.docenteResponse.docente[0].codigoUsuario
    
    console.log(this.listaDocentes.passwUsuario)
  }

}
