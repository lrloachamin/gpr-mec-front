import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { BehaviorSubject, Observable } from 'rxjs';
import { TareaDocente } from '../models/TareaDocente';
import { Docente } from '../models/Docente';
import { TareaDocenteProyecto } from '../models/TareaDocenteProyecto';

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

  public crearTarea(tarea:TareaDocenteProyecto){
    return this.http.post<Proyecto>(TAREA_DOCENE,tarea); 
  }

  public setTarea(tarea: TareaDocente) {
    this.tareas$$.next(tarea);
  }

  public obtenerProyectoPorId(idProyecto:number){
    return this.http.get<Proyecto>(`${TAREA_DOCENE}/${idProyecto}`);
  }

  public obtenerDocentes(): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENE}/listarDocentes`); 
  }

/*
  public editarProyecto(proyecto:Proyecto){
    return this.http.put<Proyecto>(`${PROYECTO}/modificar`, proyecto);
  }

  public cambiarEstadoProyecto(codigoProyecto:any){
    return this.http.put<Proyecto>(`${PROYECTO}/cambiarEstado/${codigoProyecto}`,codigoProyecto);
  }*/
  
}
