import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteComponent } from './componentes/docente/docente.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearProyectosComponent } from './pages/proyecto/crear-proyectos/crear-proyectos.component';
import { EditarProyectoComponent } from './pages/proyecto/editar-proyecto/editar-proyecto.component';
import { ListarProyectosComponent } from './pages/proyecto/listar-proyectos/listar-proyectos.component';
import { CrearTareaComponent } from './pages/tarea/crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from './pages/tarea/editar-tarea/editar-tarea.component';
import { ListarTareasComponent } from './pages/tarea/listar-tareas/listar-tareas.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
 {path: '', redirectTo:'/login' ,pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'home', component:HomeComponent,canActivate:[AuthGuard]},
  {path: 'docentes', component:DocenteComponent,canActivate:[AuthGuard]},
  {path: 'listar-proyectos', component:ListarProyectosComponent,canActivate:[AuthGuard]},
  {path: 'crear-proyectos', component:CrearProyectosComponent,canActivate:[AuthGuard]},
  {path: 'editar-proyecto', component:EditarProyectoComponent,canActivate:[AuthGuard]},
  {path: 'listar-tareas', component:ListarTareasComponent,canActivate:[AuthGuard]},
  {path: 'crear-tareas', component:CrearTareaComponent,canActivate:[AuthGuard]},
  {path: 'editar-tarea', component:EditarTareaComponent,canActivate:[AuthGuard]},
  {path: '**', component:LoginComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
  
})
export class AppRoutingModule { }
