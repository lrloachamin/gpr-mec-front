import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearProyectosComponent } from './pages/proyecto/crear-proyectos/crear-proyectos.component';
import { ListarProyectosComponent } from './pages/proyecto/listar-proyectos/listar-proyectos.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
 {path: '', redirectTo:'/login' ,pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'home', component:HomeComponent,canActivate:[AuthGuard]},
  {path: 'listar-proyectos', component:ListarProyectosComponent,canActivate:[AuthGuard]},
  {path: 'crear-proyectos', component:CrearProyectosComponent,canActivate:[AuthGuard]},
  {path: '**', component:LoginComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
  
})
export class AppRoutingModule { }
