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

  public task?: Task;

  constructor(private todo: TodolistService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const routeId: string | null = this.route.snapshot.paramMap.get("id");
    let id: number = (routeId == null) ? -1 : +routeId;
    this.task = this.todo.getTaskById(id);
    console.log(this.task);
  }

}
