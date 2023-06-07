import { Component, OnInit } from '@angular/core';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

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
