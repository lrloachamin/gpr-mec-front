import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  
  obtenerCargos(){
    //const url='https://gpr-espe.azurewebsites.net/api/v1/usuario';
     const url= 'http://localhost:8080/api/v1/cargos';
     return this.http.get(url); 
   }


}


