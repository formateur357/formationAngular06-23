export class User {
  constructor(
    public userName: string,
    public firstName: string,
    public lastName: string,
    public age: number,
    public email: string,
    public password: string,
    public team: string,
    public skills: string[]
  ) {
    this.userName = userName
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    this.email = email
    this.password = password
    this.team = team
    this.skills = skills
  }
}
