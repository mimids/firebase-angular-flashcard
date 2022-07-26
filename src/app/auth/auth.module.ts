import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { CompteComponent } from './compte/compte.component';
import { SharedModule } from '../shard/shard.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'compte',component:CompteComponent},

];

@NgModule({
  declarations: [LoginComponent,CompteComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
