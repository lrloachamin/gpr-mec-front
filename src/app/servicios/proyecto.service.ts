import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/Proyecto';

const URL='https://gpr-espe.azurewebsites.net';
const PROYECTO = URL + '/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private http: HttpClient) { }

  public obtenerProyectos(): Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${PROYECTO}/listarProyectos`); 
  }
}
