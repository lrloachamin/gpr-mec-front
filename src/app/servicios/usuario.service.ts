import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url='https://gpr-espe.azurewebsites.net/api/v1/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { 


  }

  obtenerUsuario(){

    //const url= 'http://localhost:8080/api/v1/usuario';
    return this.http.get(url); 
  }

  actualizarUsuario(body:any ,id:any){
    const url2= 'https://gpr-espe.azurewebsites.net/api/v1/usuario/'+id;
    return this.http.put(url,body); 
  }

  IsLoggedin(){
    
    return localStorage.getItem('usuario')!=null;
  
  }
  
}
