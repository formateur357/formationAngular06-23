import { Injectable } from '@angular/core';
import { User } from '../class/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

const initialUsers: User[] = [
  new User("Jean", "Jean", "jean@gmail.com", "Gens", ["Sait compter deux par deux", "lacer ses chaussures"])
]

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private users: User[] = []
    private _users: BehaviorSubject<User[]>
    readonly users$: Observable<User[]>

    constructor() {
      this._users = new BehaviorSubject<User[]>([])
      this.users$ = this._users.asObservable()
      this.updateList(initialUsers)
    }

    public adduser(user: User): void {
      this.users.push(user)
      this.emit(this.users)
    }

    public updateList(users: User[]): void {
      this.users = users
      this.emit(this.users)
    }

    private emit(users: User[]): void {
      this._users.next(Object.assign([], users))
    }

    public getUsers(): Observable<User[]> {
      return this.users$
    }

  }
