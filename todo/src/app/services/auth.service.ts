import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean

  constructor(private router: Router) {
    this.isAuth = true
  }

  public login(): void {
    setTimeout(() => {
      this.isAuth = true
      this.router.navigate(['todolist'])
    }, 1000)
  }

  public logout(): void {
    this.isAuth = false
    this.router.navigate(['login'])
  }
}
