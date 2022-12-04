import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { BehaviorSubject, Observable } from 'rxjs';
import { TareaDocente } from '../models/TareaDocente';
import { Docente } from '../models/Docente';
import { TareaDocenteProyecto } from '../models/TareaDocenteProyecto';
import { Indicador } from '../models/Indicador';
import { TareaIndicador } from '../models/TareaIndicador';
import { Cargo } from '../models/Cargo';

//const URL='https://gpr-espe.azurewebsites.net';
const URL='http://localhost:8080';
const TAREA_DOCENTE = URL + '/tareaDocente';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private tareas$$ = new BehaviorSubject<TareaDocenteProyecto | null>(null);
  tareas$ = this.tareas$$.asObservable();
  private tareaDocente$$ = new BehaviorSubject<TareaDocente | null>(null);
  tareaDocente$ = this.tareaDocente$$.asObservable();

  constructor(private http: HttpClient) { }

  public obtenerTareas(): Observable<TareaDocenteProyecto[]>{
    return this.http.get<TareaDocenteProyecto[]>(`${TAREA_DOCENTE}/listarTareas`); 
  }

  public obtenerTareasPorDocente(codigoDocente:number): Observable<TareaDocente[]>{
    return this.http.get<TareaDocente[]>(`${TAREA_DOCENTE}/listarTareaAsignadaPorDocente/${codigoDocente}`); 
  }

  public obtenerIndicadoresTarea(codigoTareaDocente:number): Observable<TareaIndicador[]>{
    return this.http.get<TareaIndicador[]>(`${TAREA_DOCENTE}/listarIndicadoresPorTarea/${codigoTareaDocente}`); 
  }

  public crearTarea(tarea:TareaDocenteProyecto){
    return this.http.post<Proyecto>(TAREA_DOCENTE,tarea); 
  }

  public setTarea(tarea: TareaDocenteProyecto) {
    this.tareas$$.next(tarea);
  }

  public setTareaDocente(tarea: TareaDocente) {
    this.tareaDocente$$.next(tarea);
  }

  public obtenerProyectoPorId(idProyecto:number){
    return this.http.get<Proyecto>(`${TAREA_DOCENTE}/${idProyecto}`);
  }

  public obtenerDocentes(): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentes`); 
  }

  public obtenerDocentesPorCargo(idCargo:any): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentesPorCargo/${idCargo}`); 
  }

  public obtenerIndicadores(): Observable<Indicador[]>{
    return this.http.get<Indicador[]>(`${TAREA_DOCENTE}/listarIndicadores`); 
  }
  
  public editarTarea(tareaDocente:TareaDocenteProyecto){
    return this.http.put<Proyecto>(`${TAREA_DOCENTE}/modificar`, tareaDocente);
  }

  public guardarTareaAsignadaAlDocente(tareaIndicadors:TareaIndicador[]){
    return this.http.put<Proyecto>(`${TAREA_DOCENTE}/guardarTareaAsignadaAlProfesor`,tareaIndicadors); 
  }
  /*
  public cambiarEstadoProyecto(codigoProyecto:any){
    return this.http.put<Proyecto>(`${PROYECTO}/cambiarEstado/${codigoProyecto}`,codigoProyecto);
  }
  */
}
