import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodolistComponent } from './components/todolist/todolist.component';
import { LoginComponent } from './components/login/login.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  {path: '', component: TodolistComponent, pathMatch: 'full'},
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {path: 'user-form', component: UserFormComponent},
      {path: 'userlist', component: UserListComponent},
      {path: 'task-form', component: TaskFormComponent},
      {path: 'todolist/:id', component: TaskDetailsComponent},
      {path: 'todolist', component: TodolistComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
