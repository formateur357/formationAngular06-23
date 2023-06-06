import { Component } from '@angular/core';
import { Task } from './class/task.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public tasks: Task[] = []
  // public count: number = 1

  constructor() {
    this.tasks.push(new Task(0, "Faire la vaisselle", false, "Une montagne t'attends.", new Date('01/04/2023 09:00')))
    this.tasks.push(new Task(1, "Faire le menage", true, "Une montagne t'attends.", new Date()))
    this.tasks.push(new Task(2, "Faire les courses", false, "Une liste tres longue.", new Date(Date.now())))
    // this.tasks.push(new Task(3, "Promener le chien", true, "Avant midi."))
  }

  public get nbTot(): number {
    return this.tasks.length
  }

  public get nbTrue(): number {
    return this.tasks.filter(task => task.complete).length
  }

  public get percent(): number {
    // protection anti division par 0
    return this.nbTot > 0 ? this.nbTrue / this.nbTot * 100 : 0
  }

  // public modifyCount(complete: boolean): void {
  //   this.count += complete ? 1 : -1
  // }

  public trackByFunction(index: number, item: any): string {
    return item.id;
  }

}
