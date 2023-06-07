import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean = false

  constructor(public router: Router) { }

  public login(): void {
    setTimeout(() => {
      this.isAuth = true
      this.router.navigate(['todolist'])
    }, 2000)
  }

  public logout(): void {
    this.isAuth = false
    this.router.navigate(['login'])
  }
}
