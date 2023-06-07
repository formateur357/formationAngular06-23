import { Injectable } from '@angular/core';
import { User } from '../class/user.model';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Router } from '@angular/router';

const initialList = [
  new User("JeannotLeConquerant", "Jean", "Jean", 57, "jean@jean.jean", "Aa0000!","jeannot", ["Sait dire son nom", "et son prenom"])
]

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[]
  private _users: BehaviorSubject<User[]>
  readonly users$: Observable<User[]>

  constructor(public router: Router) {
    this.users = []
    this._users = new BehaviorSubject<User[]>([])
    this.users$ = this._users.asObservable()
    this.init()
  }

  private init(): void {
    this.users = initialList
    this.emiter(this.users)
  }

  private emiter(users: User[]): void {
    this._users.next(Object.assign([], users))
  }

  public getUsers$(): Observable<User[]> {
    return this.users$
  }

  public addUser(user: User): void {
    this.users.push(user)
    this.emiter(this.users)
    this.router.navigate(['userlist'])
   }

  public isUsernameAvailable(name: string): Observable<any> {
    let obs: Observable<any> =
      (this.users.filter((user: User) => user.userName === name).length > 0)
        ? of({ alreadyUsed: true }) : of(null)
    return obs.pipe(delay(3000))
  }
}
