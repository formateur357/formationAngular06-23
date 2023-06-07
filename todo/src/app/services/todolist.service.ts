import { Injectable } from '@angular/core';
import { Task } from '../class/task.model';

const initialTasks: Task[] = [
  new Task(0, "Faire la vaisselle", false, "Une montagne t'attends.", new Date('01/04/2023 09:00')),
  new Task(1, "Faire le menage", true, "Une montagne t'attends.", new Date()),
  new Task(2, "Faire les courses", false, "Une liste tres longue.", new Date(Date.now()))
]

@Injectable({
  providedIn: 'root'
})
export class TodolistService {
  public tasks: Task[] = []

  constructor() {
    this.updateTasks(initialTasks)
  }

  public async updateTasks(tasks: Task[]): Promise<void> {
    this.tasks = await new Promise<Task[]>((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], tasks))
      }, 3000)
    })
  }

  public toggleComplete(id: number): void {
    let task = this.tasks.filter(task => task.id === id)[0]
    task.complete = !task.complete
  }

  public getTaskById(id: number): Task | null {
    if (id === -1)
      return null
    else
      return this.tasks.filter(task => task.id === id)[0]
  }
}
