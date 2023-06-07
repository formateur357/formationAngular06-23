import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from 'src/app/class/task.model';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  constructor(private todo: TodolistService, private router: Router) { }

  ngOnInit(): void {
  }

  public onSubmit(taskForm: NgForm): void {
    this.todo.addTask(
      new Task(
        taskForm.value.title,
        taskForm.value.completed == 1 ? false : true,
        taskForm.value.description,
        new Date()
      )
    )
    this.router.navigate(['todolist'])
  }

}
