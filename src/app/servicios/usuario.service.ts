import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { 


  }

  obtenerUsuario(){
    const url='https://gpr-espe.azurewebsites.net/api/v1/usuario';
    //const url= 'http://localhost:8080/api/v1/usuario';
    return this.http.get(url); 
  }

  IsLoggedin(){
    
    return localStorage.getItem('usuario')!=null;
  }
  
}
