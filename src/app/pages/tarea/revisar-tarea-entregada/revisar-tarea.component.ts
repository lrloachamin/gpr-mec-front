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
  selector: 'app-revisar-tarea',
  templateUrl: './revisar-tarea.html',
  styleUrls: ['./revisar-tarea.component.css']
})
export class RevisarTareaComponent implements OnInit {

  checkButton:Boolean = false;
  indicadoresAsignados: any[] = [];
  valorIndicadores:any[] = [];
  getIndicadorTarea$: Observable<TareaIndicador[]>;
  tareaDocente: any = {};
  tarea: Tarea = {};
  tareaIndicadors:TareaIndicador[]=[];

  selectedFiles: any;
  selectedFile: any;
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

  back() {
    this.router.navigate(['tareas-entregadas']);
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

  aprobarTarea(){
    console.log(this.tareaDocente);
    /*this.tareaService.aprobarTareaDocente(this.tareaDocente)
    .subscribe(data=>{
      
      this.router.navigate(["tareas-entregadas"]);
    },
    err => {
      console.log("hubo un error");
    })*/
  }

  denegarTarea(){
    console.log(this.tareaDocente);
    this.checkButton = true;
  }

  denegarTareaDocente(){
    
    this.tareaService.denegarTareaDocente(this.tareaDocente)
    .subscribe(data=>{
      this.router.navigate(["tareas-entregadas"]);
    })
  }
}