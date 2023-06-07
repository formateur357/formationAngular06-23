import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/class/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;

  constructor() {}

  ngOnInit(): void {}

  getComplete() {
    return this.task.completed ? "Fini !" : "En cours..."

    // if (this.complete)
    //   return "Fini ! "
    // else
    //   return "En cours..."
  }

  getBadgeVariant() {
    let variant = "d-inline float-right badge text-bg-"

    return this.task.completed ? variant + "success" : variant + "warning"
  }

  getItemVariant() {
    let variant = "list-group-item list-group-item-"

    return this.task.completed ? variant + "success" : variant + "warning"
  }

  getButtonText() {
    return this.task.completed ? "Annuler" : "Terminer"
  }

  toggleComplete() {
    this.task.completed = !this.task.completed;
  }
}
