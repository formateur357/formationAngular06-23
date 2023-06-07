import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Task } from 'src/app/class/task.model';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  public task!: Task

  @Output()
  public message = new EventEmitter<boolean>()

  constructor(private todo: TodolistService) { }

  ngOnInit(): void {
  }

  public get buttonColor(): string {
    return (!this.task.completed) ? "primary" : "warn"
  }

  public toggleComplete(): void {
    this.todo.toggleComplete(this.task.id)
  }

  public getButtonText(): string {
    return this.task.completed ? "Annuler" : "Terminer"
  }

  public getComplete(): string {
    return this.task.completed ? "terminee" : "en cours"
  }

  public getVariant(): string {
    let cl = "list-group-item list-group-item-"
    return this.task.completed ? cl + "success" : cl + "warning"
  }

}
