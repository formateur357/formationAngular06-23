import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

const initialTasks: Task[] = [
  new Task(0, "Faire la vaisselle", false, "Une montagne t'attends.", new Date('01/04/2023 09:00')),
  new Task(1, "Faire le menage", true, "Une montagne t'attends.", new Date()),
  new Task(2, "Faire les courses", false, "Une liste tres longue.", new Date(Date.now()))
]

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private tasks: Task[] = []
  private _tasks: BehaviorSubject<Task[]>
  readonly tasks$: Observable<Task[]>

  constructor() {
    this._tasks = new BehaviorSubject<Task[]>([])
    this.tasks$ = this._tasks.asObservable()
    this.updateList(initialTasks)
  }

  public updateList(tasks: Task[]): void {
    this.tasks = tasks
    this.emit(this.tasks)
  }

  private emit(tasks: Task[]): void {
    this._tasks.next(Object.assign([], tasks))
  }

  public getTasks(): Observable<Task[]> {
    return this.tasks$
  }

  public toggleComplete(id: number): void {
    let task = this.tasks.filter(task => task.id === id)[0]
    task.complete = !task.complete
    this.emit(this.tasks)
  }

  public getTaskById(id: number): Task | null {
    if (id === -1)
      return null
    else
      return this.tasks.filter(task => task.id === id)[0]
  }
}
