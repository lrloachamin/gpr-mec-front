import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CargoService } from 'src/app/servicios/cargo.service';
import { RegistroService } from 'src/app/servicios/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  template:'./confirmacion.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario!: FormGroup;
  listaCargos!: any;
  mensaje!:any;
  tituloMensajeVal:any;
  constructor(private fb:FormBuilder,private _docente: RegistroService, private _scargo: CargoService,private router: Router) { 
    this.iniciarFormulario();
    this.cargarCargos();
    this.mensaje="";
  }

  

  ngOnInit(): void {
  }
  iniciarFormulario(){
    this.formulario=this.fb.group({
      id:['',Validators.required],
      nombres:['',Validators.required],
      apellidos:['',Validators.required],
      cedula:['',Validators.required],
      telefono:['',Validators.required],
      correo:['',Validators.required],
      cargo:['',Validators.required],
    })
    
  }

  cargarCargos(){
    this._scargo.obtenerCargos().subscribe(respuesta=>{
      console.log(respuesta)

      this.procesarCargos(respuesta);
      
    })
  }
  procesarCargos(resp: any){
    this.listaCargos=resp.cargoResponse.cargo
  }

  guardar(){
    let data={
      idDocente:this.formulario.value.id,
      nombreDocente:this.formulario.value.nombres,
      apellidoDocente:this.formulario.value.apellidos,
      cedulaDocente:this.formulario.value.cedula,
      telefonoDocente:this.formulario.value.telefono,
      correoDocente:this.formulario.value.correo,
      codCargo:this.formulario.value.cargo
    }

    const uploaddata=new FormData();
    uploaddata.append('idDocente',data.idDocente);
    uploaddata.append('nombreDocente',data.nombreDocente);
    uploaddata.append('apellidoDocente',data.apellidoDocente);
    uploaddata.append('cedulaDocente',data.cedulaDocente);
    uploaddata.append('telefonoDocente',data.telefonoDocente);
    uploaddata.append('correoDocente',data.correoDocente);
    uploaddata.append('codCargo',data.codCargo);

    this._docente.registrarUsuario(uploaddata).subscribe((data:any)=>{
      console.log(data);
      if(data.metadata.code="000"){
        this.tituloMensajeVal="Usuario Creado Correctamente"
        this.mensaje="Espere hasta que el administrador acepte sus solicitud! ";
        

      }else{
        this.tituloMensajeVal="Error"
        this.mensaje="Ha ocurrido un error al crear el usuario, Contactese con su administrador!"
      }


    },(error:any)=>{
      this.tituloMensajeVal="Error"
      this.mensaje="Ha ocurrido un error al crear el usuario, Contactese con su administrador!"

    })
  


}

cerrarModal(){
  this.router.navigate(['./login']);
}

}



