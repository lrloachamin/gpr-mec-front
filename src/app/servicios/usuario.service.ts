import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocenteComponent } from '../componentes/docente/docente.component';
import { Docente } from '../models/Docente';

const url='https://gpr-espe.azurewebsites.net/api/v1/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private codigoDocente$$ = new BehaviorSubject<DocenteComponent | null>(null);
  codigoDocente$ = this.codigoDocente$$.asObservable();

  constructor(private http: HttpClient) { 

  }

  obtenerUsuario(){

    //const url= 'http://localhost:8080/api/v1/usuario';
    return this.http.get(url); 
  }

  actualizarUsuario(body:any ,id:any){
    const url2= 'https://gpr-espe.azurewebsites.net/api/v1/usuario/'+id;
    return this.http.put(url2,body); 
  }

  IsLoggedin(){
    return localStorage.getItem('usuario')!=null;
  }

  public obtenerDocente(codeUser:number){
    const url2= 'https://gpr-espe.azurewebsites.net/api/v1';
    return this.http.get<Docente>(`${url2}/obtenerDocente/${codeUser}`);
  }

  public setCodigoDocente(codigoDocente: DocenteComponent) {
    this.codigoDocente$$.next(codigoDocente);
  }

  obtenerUsuarioPorNombre(nombreUsuario:any){

    const url3= 'https://gpr-espe.azurewebsites.net/api/v1/usuario/'+nombreUsuario;
    return this.http.get(url3); 
  }
  
}
