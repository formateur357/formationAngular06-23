import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { User } from 'src/app/class/user.model';
import { UserService } from 'src/app/services/user.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

const medium = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
const strong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent{
  public userForm: FormGroup;
  public skills: string[];
  public passwordStrength: any
  public visibility: string
  public visibilityIcon: string

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  // constructor(public fb: FormBuilder, private router: Router, private userService: UserService) {
  //   this.userForm = this.fb.group({
  //     firstName: ['', [Validators.required, Validators.minLength(1)]],
  //     lastName: ['', [Validators.required, Validators.minLength(1)]],
  //     email: ['', [Validators.required, Validators.email]],
  //     team: ['', [Validators.required]],
  //     skills: this.fb.array([this.createSkills()], [])
  //   });
  // }

  public static checkPassword(group: FormGroup) : any {
    return (group.get('password')?.value === group.get('confirmation')?.value) ? null : { matchingError: true }
  }

  constructor(public userService: UserService, public fb: FormBuilder) {
    this.skills = []
    this.visibility = "password"
    this.visibilityIcon = "visibility"
    this.passwordStrength = {}

    this.userForm = this.fb.group({
      userName: this.fb.control(
        '',
        [Validators.required,Validators.minLength(3), Validators.maxLength(20)],
        (control: AbstractControl) => this.isUsernameAvailable(control)
      ),
      firstName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      age: this.fb.control('', [Validators.required, Validators.min(65), Validators.max(99)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      passwordGroup: this.fb.group({
        password: this.fb.control('', [Validators.required]),
        confirmation: this.fb.control('', [Validators.required]),
        }, {
        validators: UserFormComponent.checkPassword,
        updateOn: 'change'
        }
      ),
      team: this.fb.control('', [Validators.required]),
      skillCtrl: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    }, {
      updateOn: 'blur'
    })

    this.password?.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe(newValue => this.getPasswordStrength(newValue))
    this.addSkill()
  }

  public isUsernameAvailable(control: AbstractControl | null): any {
    const name: string = control?.value
    return this.userService.isUsernameAvailable(name)
  }

  public getPasswordStrength(value: string): void {
    this.passwordStrength.color = "red"
    this.passwordStrength.textContent = "weak"

    if(strong.test(value)) {
      this.passwordStrength.color = "green"
      this.passwordStrength.textContent = 'Strong'
    } else if(medium.test(value)) {
      this.passwordStrength.color = 'orange'
      this.passwordStrength.textContent = 'Medium'
    }
    console.log(this.passwordStrength)
  }

  public get userName(): AbstractControl | null {
    return this.userForm.get('userName');
  }

  public get firstName(): AbstractControl | null {
    return this.userForm.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.userForm.get('lastName');
  }

  public get age(): AbstractControl | null {
    return this.userForm.get('age');
  }

  public get email(): AbstractControl | null {
    return this.userForm.get('email');
  }

  public get passwordGroup(): any {
    return this.userForm.get('passwordGroup');
  }

  public get password(): AbstractControl | null {
    return this.userForm.get('passwordGroup.password');
  }

  public get confirmation(): AbstractControl | null {
    return this.userForm.get('passwordGroup.confirmation');
  }

  public get team(): AbstractControl | null {
    return this.userForm.get('team');
  }

  public get skillCtrl(): any {
    return this.userForm?.get('skillCtrl');
  }

public addSkill(): void {
    const value = (this.skillCtrl.value || '').trim();
    // Add our skill
    if (value) {
      this.skills.push(value);
    }
    // Clear the input value
    this.skillCtrl.value = '';
  }

  public removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  // createSkills(): FormControl {
  //   return this.fb.control('', [Validators.required]);
  // }

  // addSkills(): void{
  //   this.skills.push(this.createSkills());
  // }

  // removeSkills( removedControlIndex :number): void{
    // this.skills.removeAt(removedControlIndex);
    // }

  // onSubmit(userForm: FormGroup): void {
  //   let skillList: string[] = [];
  //   for (let csk of this.skills.controls) {
  //       skillList.push(csk.value);
  //   }
  //   this.userService.addUser(
  //     new User(
  //       userForm.value.firstName,
  //       userForm.value.lastName,
  //       userForm.value.email,
  //       userForm.value.team,
  //       skillList
  //     )
  //   );
  //   this.router.navigate(['userlist']);
  // }


  public toggleVisibility(): void {
    this.visibility = (this.visibility === "password") ? "text" : "password"
    this.visibilityIcon = (this.visibilityIcon === "visibility") ? "visibility_off" : "visibility"
  }

  public onSubmit(userForm: FormGroup): void {
    console.log(userForm);
    this.userService.addUser(
      new User(
        this.userName?.value,
        this.firstName?.value,
        this.lastName?.value,
        this.age?.value,
        this.email?.value,
        this.password?.value,
        this.team?.value,
        this.skills
      )
    )
  }

  trackByFunction(index: number, item: any): string {
    return item.id;
  }

}
