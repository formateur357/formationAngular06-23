import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/class/task.model';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit, OnDestroy {
  public tasks: Task[]
  public tasks$!: Observable<Task[]>
  public subscribe!: Subscription

  constructor(public todo: TodolistService) {
    this.tasks = []
  }

  ngOnInit(): void {
    this.getTasks()
  }

  ngOnDestroy(): void {
      this.subscribe.unsubscribe()
  }

  public getTasks(): void {
    this.tasks$ = this.todo.getTasks()
    this.subscribe = this.tasks$.subscribe((tasks) => this.tasks = tasks)
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
