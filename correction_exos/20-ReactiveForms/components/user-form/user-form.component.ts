import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { User } from 'src/app/class/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  public userForm: FormGroup;
  public skills: string[];

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public userService: UserService, public fb: FormBuilder) {
    this.skills = []
    this.userForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      lastName: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      team: this.fb.control('', [Validators.required]),
      skillCtrl: this.fb.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      // skillArray: this.fb.array([this.addSkillControl()])
    })
    this.addSkill()
  }

  public get firstName(): AbstractControl | null {
    return this.userForm.get('firstName');
  }

  public get lastName(): AbstractControl | null {
    return this.userForm.get('lastName');
  }

  public get email(): AbstractControl | null {
    return this.userForm.get('email');
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

  public onSubmit(userForm: FormGroup): void {
    console.log(userForm);
    this.userService.addUser(
      new User(
        this.firstName?.value,
        this.lastName?.value,
        this.email?.value,
        this.team?.value,
        this.skills
      )
    )
  }

  trackByFunction(index: number, item: any): string {
    return item.id;
  }

}
