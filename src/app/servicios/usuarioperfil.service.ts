import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const urlH="http://localhost:8080/api/v1/"
@Injectable({
  providedIn: 'root'
})
export class UsuarioperfilService {

  

  constructor(private http: HttpClient) { }

  obtenerUsuario(){

    const url= urlH+'perfil';
    return this.http.get(url); 
  }
}
