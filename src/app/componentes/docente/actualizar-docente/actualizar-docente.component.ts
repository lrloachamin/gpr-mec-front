import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  //variables de validacion
  validadorCedula: any;
  cedulaI: any;
  idEspeI: any;
  validadorIdEspe: any;

  listaDocentes: any;
  listaCargos!: any;
  nombreUsuario: any
  s: any;
  formularioActDoc!: FormGroup;
  constructor(private fb: FormBuilder, private _usuario: UsuarioService, private _docente: RegistroService, private _validaciones: ValidacionesService,private _scargo: CargoService) {
    
   
    this.validadorCedula=true;
   


  }

  ngOnInit(): void {
    this.nombreUsuario = localStorage.getItem('usuario');
    this.cargarCargos();
    this.cargarDocentes();
   
    this.iniciarFormulario();
    

  }

  iniciarFormulario() {
    this.formularioActDoc = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cargo:['',Validators.required]
    })

 


  }

  actualizarDocente() {
    this.cargarDocentes();
    
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
    this.docCargo=this.listaDocentes.codCargo.codCargo;
    console.log(this.listaDocentes)
  }

  validadorDeCedula(cedula: String) {

  this.validadorCedula= this._validaciones.validadorDeCedula(cedula);
  
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

  


}
