import { Component } from '@angular/core';
import { Task } from './class/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'todo'
  public count: number = 1
  public tasks: Task[] = []

  constructor() {
    this.tasks.push(new Task(2, "Promener le chien", true, "Dans le parc en bas de la rue."))
    this.tasks.push(new Task(5, "Faire le menage", true, "Aspirateur + serpilliere."))
    this.tasks.push(new Task(28, "Faire les courses", true, "liste de courses: ..."))
  }

  public toggleCount(state: boolean): void {
    this.count += state ? 1 : -1;
  }

  public trackByFunction(index: number, item: any): string {
    return item.id
  }
}
