import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TareaDocente } from 'src/app/models/TareaDocente';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@Component({
  selector: 'app-password-olvidado',
  templateUrl: './password-olvidado.component.html',
  styleUrls: ['./password-olvidado.component.css']
})
export class PasswordOlvidadoComponent implements OnInit {

  formulario2!: FormGroup;
  visible:boolean=true;
  changetype:boolean=true;
  user:any
  passwordService:any;
  flag:boolean=true;
  conf:boolean=true;
  docente: any;
  perfil:any;

  tareasDocente: TareaDocente[] = [];
  dataTable:any[] = [];

  constructor(
    private fb:FormBuilder, 
    private usuarioService: UsuarioService,
    private router: Router
    ) { 
    this.iniciarFormulario();
  }

  ngOnInit(): void {
  }

  iniciarFormulario(){
    this.formulario2=this.fb.group({
      usuario:['',Validators.required]
    })
  }

  resetearPassword(){
    this.usuarioService.resetearPassword(this.formulario2.value.usuario)
    .subscribe(
      data=>{
      confirm("Se ha enviado un mensaje al correo ingresado ");
      this.router.navigate(["listar-proyectos"]);
    },
      err => {
        alert("hubo un error al enviar el mensaje");
      }
    )
  }
  

}
