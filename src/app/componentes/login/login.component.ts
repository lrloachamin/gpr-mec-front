import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms'
import{UsuarioService} from '../../servicios/usuario.service'
import { Router } from '@angular/router';
import { Docente } from 'src/app/models/Docente';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario2!: FormGroup;
  visible:boolean=true;
  changetype:boolean=true;
  user:any
  usuarioService:any;
  passwordService:any;
  flag:boolean=true;
  conf:boolean=true;
  docente: any;
  perfil:any;

  constructor(
    private fb:FormBuilder, 
    private _usuario: UsuarioService,
    private router: Router) { 
    this.iniciarFormulario();
  }

  ngOnInit(): void {
  }

  iniciarFormulario(){
    this.formulario2=this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required],
    })
    
  }

  consultar(){
    
    console.log(this.formulario2);

    this._usuario.login(this.formulario2.value.usuario,this.formulario2.value.password).subscribe(respuesta=>{
      console.log(respuesta)
      this.procesarUsuarios2(respuesta)
    })
  }


  procesarUsuarios2(resp:any){
    let listusuarios=resp.categoryResponse.category
    this.conf=false;

    listusuarios.forEach((element: {
      passwUsuario: any; nombreUsuario: any; codigoUsuario: any;estadoUsuario: any
      }) => {
        //console.log(element.nombreUsuario)
        if(element.nombreUsuario!=null){
          localStorage.setItem('usuario',element.nombreUsuario);
          localStorage.setItem('est', element.estadoUsuario);
          //console.log("ingresa");
          
          //obtenerperfilUsuario
          this.perfil = this._usuario.obtenerPerfil(element.codigoUsuario).subscribe({
            next: (res) => {
              if(res) {
                this.perfil =res;
                //this._usuario.setCodigoDocente(this.docente);
                //console.log(this.docente.codigoDocente);
                localStorage.setItem('codigoPerfil',this.perfil.codigoPerfil);
              }
            }
          });

          localStorage.setItem('codUsuario',element.codigoUsuario);
          if(element.nombreUsuario!='admin'){
            this.docente = this._usuario.obtenerDocente(element.codigoUsuario).subscribe({
              next: (res) => {
                if(res) {
                  this.docente =res;
                  this._usuario.setCodigoDocente(this.docente);
                  localStorage.setItem('codigoDocente',this.docente.codigoDocente);
                }
              }
            });
          }  
        }

    });
    if (localStorage.getItem('usuario') != null) {
      if (localStorage.getItem('est') == '0') {
        this.router.navigate(['./pagina-validador']);

      }else if(localStorage.getItem('est') == '2'){
        this.router.navigate(['./cambiar-contrasenia']);
      }     
      else {
        this.router.navigate(['./home']);
      }


    } else {
      this.flag = false;
      this.router.navigate(['./login']);
    }




  }
  mostrarcontrasenia(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
 
  }

}
