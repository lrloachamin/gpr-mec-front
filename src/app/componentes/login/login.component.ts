import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators} from '@angular/forms'
import{UsuarioService} from '../../servicios/usuario.service'
import { Router } from '@angular/router';


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

  constructor(private fb:FormBuilder, private _usuario: UsuarioService,private router: Router) { 
    
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
    this._usuario.obtenerUsuario().subscribe(respuesta=>{
      console.log(respuesta)
      this.procesarUsuarios(respuesta)
    })
   
  }

  procesarUsuarios(resp:any){
    let listusuarios=resp.categoryResponse.category

    listusuarios.forEach((element: {
      passwUsuario: any; nombreUsuario: any; 
  }) => {
      if(element.nombreUsuario==this.formulario2.value.usuario){
        if(element.passwUsuario==this.formulario2.value.password){
          
          localStorage.setItem('usuario',element.nombreUsuario);
          console.log("ingres")
          this.router.navigate(['./home']);
          
        }else{
          this.flag=false;
          this.router.navigate(['./login']);
          
          
        }
        
      }else{
        this.flag=false;
        this.router.navigate(['./login']);
   
      }
    });


  }
  mostrarcontrasenia(){
    this.visible=!this.visible;
    this.changetype=!this.changetype;
 
  }


}
