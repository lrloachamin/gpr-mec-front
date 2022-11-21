import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginComponent } from './componentes/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './componentes/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ComponentsModule } from './imports/components.module';
import { PagesModule } from './imports/pages.module';
import { DocenteComponent } from './componentes/docente/docente.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ProyectoService } from './servicios/proyecto.service';
import { CrearProyectosComponent } from './pages/proyecto/crear-proyectos/crear-proyectos.component';
import { EditarProyectoComponent } from './pages/proyecto/editar-proyecto/editar-proyecto.component';
import { ListarProyectosComponent } from './pages/proyecto/listar-proyectos/listar-proyectos.component';
import { ListarTareasComponent } from './pages/tarea/listar-tareas/listar-tareas.component';
import { CrearTareaComponent } from './pages/tarea/crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from './pages/tarea/editar-tarea/editar-tarea.component';
import { ListarTareasDocenteComponent } from './pages/tarea-docente/listar-tareas-docente/listar-tareas-docente.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegistroComponent,
    DocenteComponent,
    FilterPipe,
    ListarProyectosComponent,
    CrearProyectosComponent,
    EditarProyectoComponent,
    ListarTareasComponent,
    CrearTareaComponent,
    EditarTareaComponent,
    ListarTareasDocenteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
    //ComponentsModule
    //PagesModule
  ],
  providers: [ProyectoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
