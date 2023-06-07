import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { LoginComponent } from './components/login/login.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "todolist/:id", component: TaskDetailsComponent},
  {path: "todolist", component: TodolistComponent},
  {path: "", component: TodolistComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
