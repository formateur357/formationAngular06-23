import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/class/task.model';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() public task!: Task
  // @Output() public toggle: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private todo: TodolistService) {}

  ngOnInit(): void {}

  public getComplete(): string {
    return this.task.complete ? "Terminee" : "En cours"
  }

  public getBadgeVariant(): string {
    let style: string = "d-inline float-right badge text-bg"
    return this.task.complete ? `${style}-success` : `${style}-warning`
  }

  public getItemVariant(): string {
    let style: string = "list-group-item list-group-item"
    return this.task.complete ? `${style}-success` : `${style}-warning`
  }

  public getButtonText(): string {
    return this.task.complete ? "Annuler" : "Terminer"
  }

  public getButtonColor(): string {
    return this.task.complete ? "warn" : "primary"
  }

  public toggleComplete(): void {
    this.todo.toggleComplete(this.task.id)
  }

}
