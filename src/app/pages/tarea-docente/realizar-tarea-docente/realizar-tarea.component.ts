/*import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Indicador } from 'src/app/models/Indicador';
import { Tarea } from 'src/app/models/Tarea';
import { TareaIndicador } from 'src/app/models/TareaIndicador';
import { TareaService } from 'src/app/servicios/tarea.service';

@Component({
  selector: 'app-realizar-tarea',
  templateUrl: './realizar-tarea.html'
})
export class RealizarTareaComponent implements OnInit {
  indicadoresAsignados: any[] = [];
  valorIndicadores:any[] = [];
  getIndicadorTarea$: Observable<TareaIndicador[]>;
  tareaDocente: any = {};
  tarea: Tarea = {};
  tareaIndicadors:TareaIndicador[]=[];

  constructor(
    private router:Router,
    private tareaService:TareaService
    ) {
      this.tareaService.tareaDocente$.subscribe((res) => {
        this.tareaDocente = res;
        if (this.tareaDocente == null) {
          this.back();
        }
        this.tarea = this.tareaDocente.codigoTarea;
        
        
      });
      this.getIndicadorTarea$ = this.tareaService.obtenerIndicadoresTarea(this.tareaDocente.codigoTareaDocente);
      //this.indicadoresAsignados  = this.tareaDocente.tareaIndicadorList;
  }

  ngOnInit(): void {
    this.getIndicadorTarea();
  }

  getIndicadorTarea() {
    this.getIndicadorTarea$.subscribe(tareasIndicador =>{
      tareasIndicador.forEach(t => {
        this.indicadoresAsignados.push(t);
      });
    });
  }

  save(){
    this.tareaService.guardarTareaAsignadaAlDocente(this.tareaIndicadors)
    .subscribe(data=>{
      confirm("Se guardaron sus datos con éxito!!");
      this.router.navigate(["listar-tareas-docente"]);
    })
  }

  back() {
    this.router.navigate(['listar-tareas-docente']);
  }

  asignarIndicador(tareaIndicador:any){
    if(!this.tareaIndicadors.includes(tareaIndicador.codigoTareaIndicador))
      this.tareaIndicadors=this.tareaIndicadors.filter((item) => item.codigoTareaIndicador !== tareaIndicador.codigoTareaIndicador );
    this.tareaIndicadors.push(tareaIndicador);
  }

}
*/


import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { UploadFilesService } from 'src/app/servicios/file.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { Router } from '@angular/router';
import { TareaIndicador } from 'src/app/models/TareaIndicador';
import { Tarea } from 'src/app/models/Tarea';
import { TareaIndicadorFile } from 'src/app/models/TareaIndicadorFile';

@Component({
  selector: 'app-realizar-tarea',
  templateUrl: './realizar-tarea.html',
  styleUrls: ['./realizar-tarea.component.css']
})
export class RealizarTareaComponent implements OnInit {

  indicadoresAsignados: any[] = [];
  valorIndicadores:any[] = [];
  getIndicadorTarea$: Observable<TareaIndicador[]>;
  tareaDocente: any = {};
  tarea: Tarea = {};
  tareaIndicadors:TareaIndicador[]=[];

  selectedFiles: any;
  selectedFile: any;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo:any = [];
  message = '';
  imageName = "";

  fileInfos: Observable<any>= new Observable;

  tareaIndicadorFile: TareaIndicadorFile={};

  constructor(
    private uploadFilesService: UploadFilesService,
    private router:Router,
    private tareaService:TareaService
    ) {
      this.tareaService.tareaDocente$.subscribe((res) => {
        this.tareaDocente = res;
        if (this.tareaDocente == null) {
          this.back();
        }
        this.tarea = this.tareaDocente.codigoTarea;
      });
      this.getIndicadorTarea$ = this.tareaService.obtenerIndicadoresTarea(this.tareaDocente.codigoTareaDocente);
    }

  ngOnInit(): void {
    this.fileInfos = this.uploadFilesService.getFiles();
    this.getIndicadorTarea();
  }

  getIndicadorTarea() {
    this.getIndicadorTarea$.subscribe(tareasIndicador =>{
      tareasIndicador.forEach(t => {
        this.indicadoresAsignados.push(t);
      });
    });
  }

  save(){
    this.tareaIndicadorFile.file = this.selectedFiles[0];
    this.tareaIndicadorFile.tareaIndicador = this.tareaIndicadors;
    this.tareaService.guardarTareaAsignadaAlDocente(this.tareaIndicadors)
    .subscribe(data=>{
      confirm("Se guardaron sus datos con éxito!!");
      this.router.navigate(["listar-tareas-docente"]);
    })
    this.tareaService.guardarArchivoTareaAsignadaAlDocente(this.selectedFiles[0],this.tareaDocente.codigoTareaDocente)
    .subscribe(
    event => {
      
    },
    err => {
      
    });
  }

  back() {
    this.router.navigate(['listar-tareas-docente']);
  }

  asignarIndicador(tareaIndicador:any){
    if(!this.tareaIndicadors.includes(tareaIndicador.codigoTareaIndicador))
      this.tareaIndicadors=this.tareaIndicadors.filter((item) => item.codigoTareaIndicador !== tareaIndicador.codigoTareaIndicador );
    this.tareaIndicadors.push(tareaIndicador);
  }

  selectFiles(event:any) {
    this.progressInfo = [];
    //event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    this.imageName = event.target.files[0].name;
    this.selectedFiles = event.target.files;
  }

  upload(index:any, file:any) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.uploadFilesService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          if(event.total)
            this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadFilesService.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  deleteFile(filename: string) {/*
    this.uploadFilesService.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.uploadFilesService.getFiles();
    });
  */}
}