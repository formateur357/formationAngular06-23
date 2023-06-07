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
  public tasks : Task[] = []
  public tasks$! : Observable<Task[]>
  public subscribe! : Subscription | undefined

  public count: number = 0

  constructor(public todo: TodolistService) {
    todo.load()
  }

  ngOnInit(): void {
    this.tasks$ = this.todo.getTasks()
    this.getTasks()
  }

  ngOnDestroy(): void {
    this.subscribe?.unsubscribe()
  }


  public getTasks(): void {
    this.subscribe = this.tasks$.subscribe((tasks) => {
      this.tasks = tasks
    })
  }

  public get textColor(): string {
    let color: string = "red"
    color = (this.percent > 0) ? "orange" : color
    return (this.percent == 100) ? "green" : color
  }

  public get nbTrue(): number {
    return (this.tasks?.length) ? this.tasks.filter(task => task.completed).length : 0
  }

  public get nbTask(): number {
    return (this.tasks?.length) ? this.tasks.length : 0
  }

  public get percent(): number {
    return this.nbTask != 0 ? (this.nbTrue / this.nbTask * 100) : 0
  }

  public toggleCount(state: boolean): void {
    this.count += state ? 1 : -1;
  }

  public trackByFunction(index: number, item: any): string {
    return item.id;
  }


}
