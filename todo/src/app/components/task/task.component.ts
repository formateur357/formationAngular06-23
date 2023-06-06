import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() public title! : string
  @Input() public complete! : boolean

  @Output() public toggle: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor() {
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

  public getButtonColor(): string {
    return this.complete ? "warn" : "primary"
  }

  public toggleComplete(): void {
    this.complete = !this.complete
    this.toggle.emit(this.complete)
  }

}
