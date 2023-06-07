import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/class/task.model';
import { TodolistService } from 'src/app/services/todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  // propriete recuperant la liste de taches, on l'assigne dans le callback de notre abonnement a l'observable.
  public tasks: Task[] = [];

  // propriete recuperant l'observable auquel on peut s'abonner cote composant.
  public tasks$!: Observable<Task[]>;

  // propriete qui contient notre abonnement, il nous servira a nous desabonner de l'observable a la destruction du composant
  public subscribe! : Subscription | undefined;

  // on injecte notre service todolist
  constructor(public todo: TodolistService) {}

  // hook qui se declenche juste apres la creation du composant
  ngOnInit(): void {
    // stock les donnees dans la bdd
    // this.todo.save();

    // charge les donnees stockees dans la bdd
    this.todo.load()

    // on recupere l'observable
    this.tasks$ = this.todo.getTasks();

    // on s'abonne a l'observable et on recupere la liste de taches
    this.getTasks();
  }

  // hook qui se declenche a la destruction du composant
  ngOnDestroy(): void {
    console.log(document)

    // on se desabonne de l'observable
    this.subscribe?.unsubscribe();
  }

  // getter pour recuperer le nombre de taches completees
  get nbTrue(): number {
    return (this.tasks?.length) ? this.tasks.filter((task) => task.completed).length : 0;
  }

  // getter pour recupere le nombre de taches
  get nbTasks(): number {
    return (this.tasks?.length) ? this.tasks.length : 0;
  }

  // getter pour recuperer le pourcentage de taches completees
  get percent(): number {
    return this.nbTasks != 0 ? (this.nbTrue / this.nbTasks * 100) : 0;
  }

  // getter pour recuperer la couleur du pourcentage
  get textColor(): string {
    let color = this.percent > 0 ? "orange" : "red"
    color = this.percent == 100 ? "green" : color
    return color
  }

  // methode pour s'abonner a l'observable et pour y associer un callback qui se declenchera à chaque nouvelle donnee envoyee dans le flux de l'observable.
  getTasks(): void {
    this.subscribe = this.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  trackByFunction(index: number, item: any): string {
    return item.id
  }
}
