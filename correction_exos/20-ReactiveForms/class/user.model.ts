export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public team: string,
    public skills: string[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.team = team;
    this.skills = skills;
  }
}
