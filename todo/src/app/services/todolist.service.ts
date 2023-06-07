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
  public promise!: Promise<string>

  constructor() {
    this.promise = new Promise<string>(resolve => {
      setTimeout(() => {
        this.tasks = initialTasks
        resolve("Promesse resolue")
      }, 3000)
    })
  }
}
