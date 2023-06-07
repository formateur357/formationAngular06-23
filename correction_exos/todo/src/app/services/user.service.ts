import { Injectable } from '@angular/core';
import { User } from '../class/user.model';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const initialList = [
  new User('Jeanc', 'Jean', 'Charles', 67, 'jeanc@gmail.com', 'G2000!', 'Uno', [
    'jouer du pipo',
    'danser',
  ]),
];

const url = "https://angulartest-caf33-default-rtdb.europe-west1.firebasedatabase.app/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[]
  private _users: BehaviorSubject<User[]>
  readonly users$: Observable<User[]>

  constructor(private router: Router, private http: HttpClient) {
    this.users = []
    this._users = new BehaviorSubject<User[]>([])
    this.users$ = this._users.asObservable()

  }

  public save(): void {
    this.http.put(url + 'users.json', this.users).subscribe()
  }

  public load(): void {
    this.http.get(url + 'users.json').subscribe((response) => {
      this.users = response as User[]
      this.emit(this.users)
    })
  }

  public emit(users: User[]): void {
    this._users.next(Object.assign([], users))
  }

  public getUsers(): Observable<User[]> {
    return this.users$
  }

  public addUser(user: User): void {
    this.users.push(user)
    this.emit(this.users)
    this.router.navigate(['userlist'])
  }

  public  updateList(users: User[]): void {
    this.users = Object.assign([], users)
    this.emit(this.users)
  }

  public isUsernameAvailable(name: string): Observable<any> {
    let obs: Observable<any> =
      (this.users.filter((user: User) => user.userName === name).length > 0)
        ? of({ alreadyUsed: true }) : of(null)
    return obs.pipe(delay(3000))
  }
}
