import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide:boolean  = false;

  userSignup = {
    id: null,
    name: '',
    surname: '',
    age: null,
    studies: '',
    geo: '',
    bio: '',
    groups: [],
    email: '',
    password: '',
    rPassword: '',
  };

  public addUser(): void {
    if (this.userSignup.password === this.userSignup.rPassword) {
      console.log(this.userSignup);
      this.userSignup = {
        id: null,
        name: '',
        surname: '',
        age: null,
        studies: '',
        geo: '',
        bio: '',
        groups: [],
        email: '',
        password: '',
        rPassword: '',
      };
    } else {
      console.log('la contraseña no es la misma');
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
