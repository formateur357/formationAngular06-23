import { Component } from '@angular/core';
import { Task } from './class/task.model';
import { TodolistService } from './services/todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'todo'

  constructor(public todo: TodolistService) {}

  ngOnInit(): void {}

    // getter pour recuperer le nombre de taches completees
    get nbTrue(): number {
      return (this.todo.tasks?.length) ? this.todo.tasks.filter((task) => task.completed).length : 0;
    }

    // getter pour recupere le nombre de taches
    get nbTasks(): number {
      return (this.todo.tasks?.length) ? this.todo.tasks.length : 0;
    }

    // getter pour recuperer le pourcentage de taches completees
    get percent(): number {
      return this.nbTasks != 0 ? (this.nbTrue / this.nbTasks * 100) : 0;
    }

    // getter pour recuperer la couleur du pourcentage
    get textColor(): string {
      let color = this.percent > 0 ? "orange" : "red"
      color = this.percent == 100 ? "green" : color
      return color
    }

  trackByFunction(index: number, item: any): string {
    return item.id
  }
}
