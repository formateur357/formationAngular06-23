import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/class/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() user!: User;

  constructor() { }

  ngOnInit(): void {
  }

  public trackByFunction(item: any): string {
    return item.id;
  }
}
