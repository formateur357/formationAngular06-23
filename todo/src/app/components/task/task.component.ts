import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public title : string
  public complete : boolean

  constructor() {
    this.title = "Faire les courses"
    this.complete = true
  }

  ngOnInit(): void {
  }

  public getComplete(): string {
    return this.complete ? "Terminee" : "En cours"
  }

  public getBadgeVariant(): string {
    let style: string = "d-inline float-right badge text-bg"
    return this.complete ? `${style}-success` : `${style}-warning`
  }

  public getItemVariant(): string {
    let style: string = "list-group-item list-group-item"
    return this.complete ? `${style}-success` : `${style}-warning`
  }

  public getButtonText(): string {
    return this.complete ? "Annuler" : "Terminer"
  }

  public toggleComplete(): void {
    this.complete = !this.complete
  }
}
