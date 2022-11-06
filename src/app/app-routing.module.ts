import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
 {path: '', redirectTo:'/login' ,pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent,canActivate:[AuthGuard]},
  {path: '**', component:LoginComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
  
})
export class AppRoutingModule { }
