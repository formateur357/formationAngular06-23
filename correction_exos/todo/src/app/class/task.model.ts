export class Task {
  private static index : number = 0
  public id: number

  constructor(
    public title: string,
    public completed: boolean,
    public description: string,
    public createdDate: Date
  ) {
    this.id = Task.index++
    this.title = title
    this.completed = completed
    this.description = description
    this.createdDate = createdDate
  }
}
