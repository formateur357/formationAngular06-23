export class Task {
  static index: number = 0
  public id: number
  public createdDate: Date

  constructor(
    public title: string,
    public complete: boolean,
    public description: string,
  ) {
    this.id = Task.index++
    this.createdDate = new Date()
  }
}
