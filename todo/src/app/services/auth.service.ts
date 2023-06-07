import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth: boolean

  constructor() {
    this.isAuth = true
  }

  public login(): void {
    setTimeout(() => {
      this.isAuth = true
    }, 1000)
  }

  public logout(): void {
    this.isAuth = false
  }
}
