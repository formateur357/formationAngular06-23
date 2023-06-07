import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const initialList = [
  new Task("Promener le chien", false, "Au parc du coin.", new Date()),
  new Task("Aller chercher les gosses", false, "A l'ecole", new Date('01/04/2023 09:00')),
  new Task("Faire les courses", false, "Liste de courses: ...", new Date('04/01/2023 19:00'))
]

const url = "https://angulartest-caf33-default-rtdb.europe-west1.firebasedatabase.app/"

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  private tasks: Task[] = []
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([])
  readonly tasks$: Observable<Task[]> = this._tasks.asObservable()

  constructor(private http: HttpClient) {
  }

  public save(): void {
    console.log(this.tasks)
    this.http.put(url + 'tasks.json', this.tasks).subscribe()
  }

  public load(): void {
    this.http.get(url + 'tasks.json').subscribe((response) => {
      this.tasks = response as Task[]
      this.emit(this.tasks)
    })
  }

  public emit(tasks: Task[]): void {
    this._tasks.next(Object.assign([], tasks))
  }

  public getTasks(): Observable<Task[]> {
    return this.tasks$
  }

  public getTaskById(id: number): Task {
    return this.tasks.filter(task => task.id == id)[0]
  }

  public getLastId(): number {
    return (Math.max(...this.tasks.map(task => task.id)))
  }

  public addTask(task: Task): void {
    task.id = this.getLastId() + 1
    this.tasks.push(task)
    this.emit(this.tasks)
  }

  public updateList(tasks: Task[]): void {
    this.tasks = Object.assign([], tasks)
    this.emit(this.tasks)
  }

  public toggleComplete(id: number): void {
    let task = this.tasks.filter(task => task.id == id)[0]
    task.completed = !task.completed
    this.emit(this.tasks)
  }
}
