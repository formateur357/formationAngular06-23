import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

const initialList: Task[] = [
  new Task("Promener le chien", true, "Dans le parc en bas de la rue.", new Date()),
  new Task("Faire le menage", false, "Aspirateur + serpilliere.", new Date("04/01/2023 09:00")),
  new Task("Faire les courses", false, "liste de courses: ...", new Date("04/01/2023"))
]

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  // propriete contenant la liste de taches.
  private tasks: Task[] = [];

  // propriete contenant le sujet (contient l'observable et l'observer, mais on s'en servira en tant qu'Observer cote service).
  private _tasks = new BehaviorSubject<Task[]>([]);

  // propriete contenant l'observable qu'on enverra aux composants voulant l'utiliser afin de s'abonner, via la methode getTasks de notre service.
  readonly tasks$ = this._tasks.asObservable();

  constructor() {
    this.updateList(initialList)
  }

  public async updateList(list: Task[]): Promise<void> {
    this.tasks = await new Promise<Task[]>((resolve) => {
        setTimeout(() => {
          resolve(Object.assign([], list))
        }, 3000)
    })
    this.emit(this.tasks)
  }

  public getTasks(): Observable<Task[]> {
    return this.tasks$
  }

  // methode pour emettre une donnee dans le flux
  private emit(tasks: Task[]): void {

    // on utilise la methode next des observer qui nous permet d'envoyer une copie profonde de notre liste de taches dans le flux de l'observable.
    this._tasks.next(Object.assign([], tasks))
  }

  public toggleComplete(id: number) {
    let task = this.tasks.filter(task => task.id == id)[0]
    task.completed = !task.completed
    this.emit(this.tasks)
  }

  // renvoie une tache en fonction de l'id fournit en parametres.
  public getTaskById(id: number): Task {
    // for (const task of this.tasks) {
    //   if (task.id == id)
    //     return task;
    // }
    // return null;
    return this.tasks.filter(task => task.id == id)[0]
  }

  // ajoute une tache a notre liste de taches, puis emet le changement sur le flux de l'observable.
  public addTask(task: Task) {
    task.id = this.getLastId() + 1;
    this.tasks.push(task);
    this.emit(this.tasks);
  }

  private getLastId() {
    return (Math.max(...this.tasks.map(task => task.id)));
  }

  removeTask(id: number) {
    this.tasks.forEach((task : Task, i: number) => {
      if (task.id === id) {
        this.tasks.splice(i, 1);
      }
      this.emit(this.tasks);
    })
  }
}
