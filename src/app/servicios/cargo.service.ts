import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const urlH='https://gpr-espe.azurewebsites.net/api/v1/';
//const urlH="http://localhost:8080/api/v1/"

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(private http: HttpClient) { }

  
  obtenerCargos(){

     const url= urlH+'cargos';
     return this.http.get(url); 
   }


}


