import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';

const initialList: Task[] = [
  new Task(2, "Promener le chien", true, "Dans le parc en bas de la rue.", new Date()),
  new Task(5, "Faire le menage", false, "Aspirateur + serpilliere.", new Date("04/01/2023 09:00")),
  new Task(28, "Faire les courses", false, "liste de courses: ...", new Date("04/01/2023"))
]

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  public tasks: Task[] = []

  constructor() {
    this.updateList(initialList)
  }

  public async updateList(list: Task[]): Promise<void> {
    this.tasks = await new Promise<Task[]>((resolve) => {
        setTimeout(() => {
          resolve(Object.assign([], list))
        }, 3000)
    })
  }

  public toggleComplete(id: number) {
    let task = this.tasks.filter(task => task.id == id)[0]
    task.completed = !task.completed
  }
}
