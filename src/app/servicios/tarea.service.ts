import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/Proyecto';
import { BehaviorSubject, Observable } from 'rxjs';
import { TareaDocente } from '../models/TareaDocente';
import { Docente } from '../models/Docente';
import { TareaDocenteProyecto } from '../models/TareaDocenteProyecto';
import { Indicador } from '../models/Indicador';
import { TareaIndicador } from '../models/TareaIndicador';
import { Cargo } from '../models/Cargo';
import { TareaIndicadorFile } from '../models/TareaIndicadorFile';
import { Tarea } from '../models/Tarea';

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
  private proyecto$$ = new BehaviorSubject<Proyecto | null>(null);
  proyecto$ = this.proyecto$$.asObservable();
  private tarea$$ = new BehaviorSubject<Tarea | null>(null);
  tarea$ = this.tarea$$.asObservable();

  constructor(private http: HttpClient) { }

  public obtenerTareas(idDocente:string): Observable<TareaDocenteProyecto[]>{
    return this.http.get<TareaDocenteProyecto[]>(`${TAREA_DOCENTE}/listarTareas/${idDocente}`); 
  }

  public obtenerTareasEntregadas(idDocente:string): Observable<TareaDocente[]>{
    return this.http.get<TareaDocente[]>(`${TAREA_DOCENTE}/listarTareasEntregadas/${idDocente}`); 
  }

  public obtenerTareasPorDocente(codigoDocente:number): Observable<TareaDocente[]>{
    return this.http.get<TareaDocente[]>(`${TAREA_DOCENTE}/listarTareaAsignadaPorDocente/${codigoDocente}`); 
  }

  public obtenerIndicadoresTarea(codigoTareaDocente:number): Observable<TareaIndicador[]>{
    return this.http.get<TareaIndicador[]>(`${TAREA_DOCENTE}/listarIndicadoresPorTarea/${codigoTareaDocente}`); 
  }

  public obtenerTareasAsignadasDocentes(codigoTareaDocente:any):Observable<TareaDocente[]>{
    return this.http.get<TareaDocente[]>(`${TAREA_DOCENTE}/listarDocentesTareasAsignadas/${codigoTareaDocente}`); 
  }

  public crearTareaConArchivo(tarea:TareaDocenteProyecto,file:File){
    const formData: FormData = new FormData();
    formData.append("tareaDocenteProyecto",JSON.stringify(tarea));
    formData.append('file', file);
    return this.http.post<any>(`${TAREA_DOCENTE}/crearTareaConArchivo`,formData); 
  }

  public crearTarea(tarea:TareaDocenteProyecto){ 
    return this.http.post<any>(`${TAREA_DOCENTE}/crearTarea`,tarea); 
  }

  public setTarea(tarea: TareaDocenteProyecto) {
    this.tareas$$.next(tarea);
  }

  public setTareaDocente(tarea: TareaDocente) {
    this.tareaDocente$$.next(tarea);
  }

  public setProyecto(proyecto: Proyecto) {
    this.proyecto$$.next(proyecto);
  }

  public setTareaModel(tarea: Tarea) {
    this.tarea$$.next(tarea);
  }

  public obtenerProyectoPorId(idProyecto:number){
    return this.http.get<Proyecto>(`${TAREA_DOCENTE}/${idProyecto}`);
  }

  public obtenerDocentes(): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentes`); 
  }

  public obtenerDocentesPorCargo(idCargo:any,codigoPerfil:any): Observable<Docente[]>{
    return this.http.get<Docente[]>(`${TAREA_DOCENTE}/listarDocentesPorCargo/${idCargo}/${codigoPerfil}`); 
  }

  public obtenerIndicadores(): Observable<Indicador[]>{
    return this.http.get<Indicador[]>(`${TAREA_DOCENTE}/listarIndicadores`); 
  }
  
  public editarTarea(tareaDocente:TareaDocenteProyecto){
    return this.http.put<Proyecto>(`${TAREA_DOCENTE}/modificar`, tareaDocente);
  }

  public guardarTareaAsignadaAlDocente(tareaIndicadors:TareaIndicador[]){
    return this.http.put<String>(`${TAREA_DOCENTE}/guardarTareaAsignadaAlProfesor`,tareaIndicadors); 
  }

  public guardarArchivoTareaAsignadaAlDocente(file:File,codigoTareaDocente:any): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('codigoTareaDocente', codigoTareaDocente);
    console.log(formData);
    const req = new HttpRequest('PUT', `${TAREA_DOCENTE}/guardarArchivoTareaAsignadaAlProfesor`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);

    //return this.http.put<Proyecto>(`${TAREA_DOCENTE}/guardarTareaAsignadaAlProfesor`,tareaIndicadors); 
  }

  public aprobarTareaDocente(tareaDocente:TareaDocente){
    return this.http.put<String>(`${TAREA_DOCENTE}/aprobarTareaDocente`,tareaDocente); 
  }

  public denegarTareaDocente(tareaDocente:TareaDocente){
    return this.http.put<String>(`${TAREA_DOCENTE}/denegarTareaDocente`,tareaDocente); 
  }

  /*
  public cambiarEstadoProyecto(codigoProyecto:any){
    return this.http.put<Proyecto>(`${PROYECTO}/cambiarEstado/${codigoProyecto}`,codigoProyecto);
  }
  */
}
