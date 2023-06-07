import { Injectable } from '@angular/core';
import { User } from '../class/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const initialList = [
  new User("Jean", "Jean", "jean@jean.jean", "Frankulin", ["Sait dire son nom", "et son prenom"])
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
}
