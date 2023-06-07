import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public name : string = "Jean Jean";
  public complete : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  getComplete() {
    return this.complete ? "Fini !" : "En cours..."
    // if (this.complete)
    //   return "Fini ! ";
    // else
    //   return "En cours...";
  }

}
