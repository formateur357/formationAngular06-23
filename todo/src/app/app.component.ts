import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title1: string = "Faire la vaisselle"
  public title2: string = "Faire le menage"
  public title3: string = "Faire les courses"

  public complete1: boolean = true
  public complete2: boolean = false
  public complete3: boolean = false

  public count: number = 1

  public modifyCount(complete: boolean): void {
    this.count += complete ? 1 : -1
  }

}
