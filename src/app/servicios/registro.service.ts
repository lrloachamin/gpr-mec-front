import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  constructor(private http: HttpClient) { 


  }

  registrarUsuario(body :any){
    const url='https://gpr-espe.azurewebsites.net/api/v1/usuario';
    //const url= 'http://localhost:8080/api/v1/docentes';
    return this.http.post(url,body)
  }

  obtenerDocentes(){
   const url='https://gpr-espe.azurewebsites.net/api/v1/docente';
    //const url= 'http://localhost:8080/api/v1/docente';
    return this.http.get(url)
  }

 
  
}
