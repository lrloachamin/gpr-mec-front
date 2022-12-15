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
  guardarUsuarioPerfil(codigoperfil:any,codigousuario:any,idusuper:any){

    const url= urlH+'usuarioperfil/'+codigoperfil+'/'+codigousuario+'/'+idusuper;
    return this.http.post(url,null) 
  }

  quitarrUsuarioPerfil(codigouperfil:any,idusuper:any){

    const url= urlH+'usuarioperfil/'+codigouperfil+'/'+idusuper;
    return this.http.delete(url)
  }


}
