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
