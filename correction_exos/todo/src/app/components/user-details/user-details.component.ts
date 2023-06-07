import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/class/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user!: User

  public toggle: boolean
  public default: string
  public visibility: string

  constructor() {
    this.toggle = false
    this.visibility = 'visibility'
    this.default = '**********'
  }

  ngOnInit(): void {}

  public toggleVisibility(): void {
    this.toggle = !this.toggle
    this.visibility = (this.visibility === "visibility") ? "visibility_off" : "visibility"
  }

  public trackByFunction(item: any): string {
    return item.id
  }
}
