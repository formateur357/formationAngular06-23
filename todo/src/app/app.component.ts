import { Component } from '@angular/core';
import { TodolistService } from './services/todolist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 })
export class AppComponent {

  // public count: number = 1

  constructor(public todo: TodolistService) {}

  public get nbTot(): number {
    return this.todo.tasks.length
  }

  public get nbTrue(): number {
    return this.todo.tasks.filter(task => task.complete).length
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
