import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


//const urlH='https://gpr-espe.azurewebsites.net/api/v1/';
const urlH="http://localhost:8080/api/v1/"

@Injectable({
  providedIn: 'root'
})


export class RegistroService {
  constructor(private http: HttpClient) { 


  }

  registrarUsuario(body :any){
  const url= urlH+'docentes';
    return this.http.post(url,body)
  }

  obtenerDocentes(){
    const url= urlH+'docente';
    return this.http.get(url)
  }

  obtenerUsuarioPorIDEspe(idEspe:any){
    const url4= urlH+'usuarioid/'+idEspe;
    return this.http.get(url4); 
  }

 
  
}
