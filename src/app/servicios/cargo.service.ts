import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../models/Cargo';

const urlH='https://gpr-mec-espe.azurewebsites.net/api/v1/';
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

  public obtenerCargosModel(): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${urlH}cargoModel`); 
  }

  public obtenerCargosPorPerfil(codCargo:any): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${urlH}obtenerCargosPorCodCargo/${codCargo}`); 
  }

  public crearCargo(cargo:Cargo){
    return this.http.post<Cargo>(urlH+"crearCargo",cargo); 
  }

}


