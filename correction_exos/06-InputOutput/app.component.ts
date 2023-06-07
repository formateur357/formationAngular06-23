import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'todo';
  public count: number = 1

  public name1 : string = "Toto";
  public name2 : string = "Michel";
  public name3 : string = "Jean-louis";

  public complete1 : boolean = false;
  public complete2 : boolean = true;
  public complete3 : boolean = true;

  constructor() {}

  public toggleCount(state: boolean): void {
    this.count += state ? 1 : -1;
  }
}
