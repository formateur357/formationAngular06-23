import { Component } from '@angular/core';
import { Task } from './class/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'todo'
  public tasks: Task[] = []

  constructor() {
    this.tasks.push(new Task(2, "Promener le chien", true, "Dans le parc en bas de la rue."))
    this.tasks.push(new Task(5, "Faire le menage", false, "Aspirateur + serpilliere."))
    this.tasks.push(new Task(28, "Faire les courses", false, "liste de courses: ..."))
  }

  // getter pour recuperer le nombre de taches completees
  get nbTrue(): number {
    return (this.tasks?.length) ? this.tasks.filter((task) => task.completed).length : 0;
  }

  // getter pour recupere le nombre de taches
  get nbTasks(): number {
    return (this.tasks?.length) ? this.tasks.length : 0;
  }

  // getter pour recuperer le pourcentage de taches completees
  get percent(): number {
    return this.nbTasks != 0 ? (this.nbTrue / this.nbTasks * 100) : 0;
  }
  
  trackByFunction(index: number, item: any): string {
    return item.id
  }
}
