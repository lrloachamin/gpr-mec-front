import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { BehaviorSubject, Observable } from 'rxjs';
import { TareaDocente } from '../models/TareaDocente';

const URL='https://gpr-espe.azurewebsites.net';
const TAREA_DOCENE = URL + '/tareaDocente';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private tareas$$ = new BehaviorSubject<TareaDocente | null>(null);
  tareas$ = this.tareas$$.asObservable();

  constructor(private http: HttpClient) { }

  public obtenerTareas(): Observable<TareaDocente[]>{
    return this.http.get<TareaDocente[]>(`${TAREA_DOCENE}/listarTareas`); 
  }

  public crearTarea(tarea:TareaDocente){
    return this.http.post<Proyecto>(TAREA_DOCENE,tarea); 
  }

  public setTarea(tarea: TareaDocente) {
    this.tareas$$.next(tarea);
  }

  public obtenerProyectoPorId(idProyecto:number){
    return this.http.get<Proyecto>(`${TAREA_DOCENE}/${idProyecto}`);
  }
/*
  public editarProyecto(proyecto:Proyecto){
    return this.http.put<Proyecto>(`${PROYECTO}/modificar`, proyecto);
  }

  public cambiarEstadoProyecto(codigoProyecto:any){
    return this.http.put<Proyecto>(`${PROYECTO}/cambiarEstado/${codigoProyecto}`,codigoProyecto);
  }*/

}
