import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { LoginComponent } from './components/login/login.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {
    path: "",
    canActivate: [AuthGuard],
    children: [
      {path: "todolist/:id", component: TaskDetailsComponent},
      {path: "todolist", component: TodolistComponent},
      {path: "", component: TodolistComponent, pathMatch: 'full'}
    ]
  },
  {path: "404", component: NotfoundComponent},
  {path: "**", redirectTo: "/404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
