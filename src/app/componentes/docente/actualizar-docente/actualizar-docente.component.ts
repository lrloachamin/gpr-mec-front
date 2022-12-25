import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { CargoService } from 'src/app/servicios/cargo.service';
import { RegistroService } from 'src/app/servicios/registro.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-actualizar-docente',
  templateUrl: './actualizar-docente.component.html',
  styleUrls: ['./actualizar-docente.component.css']
})
export class ActualizarDocenteComponent implements OnInit {

  //variable del model
  docNombres: any;
  docApellidos: any;
  docCedula: any;
  docTelefono: any;
  docCorreo: any;
  docCargo:any;
  docIdEspe:any;
  docSexo:any;
  docPuestoTrabajo:any;

  comboSexo:any;

  //variables de validacion
  validadorCedula: any;
  cedulaI: any;
  idEspeI: any;
  validadorIdEspe: any;
  selectedId:any;
  mensajeConfirmacion:any
  validadorCargo!:boolean;

  listaDocentes: any;
  listaCargos!: any;
  nombreUsuario: any
  tipoUsuario:any;
  docCorreo2:any;
  s: any;
  formularioActDoc!: FormGroup;
  constructor(private fb: FormBuilder,
     private _usuario: UsuarioService, 
     private _docente: RegistroService,
      private _validaciones: ValidacionesService,
      private _scargo: CargoService,
      private router: Router) { 
   
    this.validadorCedula=true;
    this.mensajeConfirmacion=false;
  }

  ngOnInit(): void {

    this.tipoUsuario=localStorage.getItem('usuario')
    if(this.tipoUsuario==="admin"){
      this.nombreUsuario = localStorage.getItem('usuarioAct');
      this.validadorCargo=false;
    }else{
      this.nombreUsuario = localStorage.getItem('usuario');
      this.validadorCargo=true;
    }
    
    
    this.cargarCargos();
    this.cargarDocentes();
   
    this.iniciarFormulario();
    

  }

  iniciarFormulario() {

    this.comboSexo=["Femenino","Masculino","Otro"]
    this.formularioActDoc = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      id: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cargo:[''],
      sexo:['',],
      puesto:['',Validators.required],
    })
  }

  cargarDocentes() {

    this._usuario.obtenerUsuarioPorNombre(this.nombreUsuario).subscribe(respuesta => {

      this.procesarDocentes(respuesta);

    })
  }
  procesarDocentes(resp: any) {
    this.listaDocentes = resp.docenteResponse.docente[0]
    this.docNombres=this.listaDocentes.nombreDocente;
    this.docApellidos=this.listaDocentes.apellidoDocente
    this.docCedula=this.listaDocentes.cedulaDocente;
    this.docTelefono=this.listaDocentes.telefonoDocente;
    this.docCorreo=this.listaDocentes.correoDocente;
    this.docCargo=this.listaDocentes.codCargo
    this.docIdEspe=this.listaDocentes.idDocente
    this.docSexo=this.listaDocentes.sexo;
    this.docPuestoTrabajo=this.listaDocentes.puestoTrabajoDocente;
    this.selectedId=this.docCargo.codCargo;
  }

  validadorDeCedula(cedula: String) {

  this.validadorCedula= this._validaciones.validadorDeCedula(cedula);
  
  }

  cargarCargos(){
    this._scargo.obtenerCargos().subscribe(respuesta=>{
      this.procesarCargos(respuesta);
      
    })
  }
  procesarCargos(resp: any){
    this.listaCargos=resp.cargoResponse.cargo
  }

  actualizarDocente(){
    
   var usuariodata={

    codigoDocente: this.listaDocentes.codigoDocente,
    idDocente: this.formularioActDoc.value.id,
    nombreDocente: this.formularioActDoc.value.nombres,
    apellidoDocente: this.formularioActDoc.value.apellidos,
    cedulaDocente: this.formularioActDoc.value.cedula,
    telefonoDocente: this.formularioActDoc.value.telefono,
    correoDocente: this.formularioActDoc.value.correo,
    sexo:this.formularioActDoc.value.sexo,
    puestoTrabajoDocente:this.formularioActDoc.value.puesto,
    codCargo:this.formularioActDoc.value.cargo
  }
  console.log("data"+usuariodata.codCargo.codCargo)
  
  this._usuario.actualizarDocente(usuariodata,this.listaDocentes.codigoDocente).subscribe(respuesta=>{
    alert("Usuario actualizado con éxito!")
    location.reload();
    
  },(error:any)=>{
    alert("Ha ocurrido un problema, contactese con su adminitrador!")
    console.log(error)
  })
  


  }

 
  cancelarActualizar(){
    this.router.navigate(['./docentes']);

    return localStorage.removeItem('usuarioAct');

  }

  


}
