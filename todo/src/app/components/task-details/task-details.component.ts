import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/class/task.model';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  public task!: Task | null

  constructor(private todo: TodolistService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idTxt: string | null = this.route.snapshot.paramMap.get('id')
    let id: number = idTxt === null ? -1 : +idTxt
    this.task = this.todo.getTaskById(id)
  }

}
