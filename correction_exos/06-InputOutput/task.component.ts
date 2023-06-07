import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() name : any;
  @Input() complete : any;

  constructor() { }

  ngOnInit(): void {
  }

  getComplete() {
    return this.complete ? "Fini !" : "En cours..."

    // if (this.complete)
    //   return "Fini ! "
    // else
    //   return "En cours..."
  }

  getBadgeVariant() {
    let variant = "d-inline float-right badge text-bg-"

    return this.complete ? variant + "success" : variant + "warning"
  }

  getItemVariant() {
    let variant = "list-group-item list-group-item-"

    return this.complete ? variant + "success" : variant + "warning"
  }

  getButtonText() {
    return this.complete ? "Annuler" : "Terminer"
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}
