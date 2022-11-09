import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/servicios/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formulario!: FormGroup;
  constructor(private fb:FormBuilder,private _docente: RegistroService) { 
    this.iniciarFormulario();
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
      console.log("correcto");


    })
  }

}
