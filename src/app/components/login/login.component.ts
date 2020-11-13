import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersLogIn } from '@int/users-log-in';
import { DefaultInputMatcher } from '@app/user-form.error-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  logInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  usersLogIn: UsersLogIn = {
    password: this.logInForm.controls.password,
    email: this.logInForm.controls.email,
  };

  hide = false;
  defaultInputMatcher = new DefaultInputMatcher();

  public getErrorMessageEmail(): string | undefined {
    if (this.logInForm.controls[`email`].hasError('required')) {
      return 'Este campo no puede quedar vacío.';
    }
    if (this.logInForm.controls[`email`].hasError('email')) {
      return 'Debes introducir una dirección de correo electrónico válida';
    }
  }
  public getErrorMessagePassword(): string | undefined {
    if (this.logInForm.controls[`password`].hasError('required')) {
      return 'Este campo no puede quedar vacío.';
    }
    if (this.logInForm.controls[`password`].hasError('minlength')) {
      return 'Debes introducir una contraseña de más de 8 caracteres.';
    }
  }

  public logIn(): void {
    console.log(`${this.usersLogIn.email.value} y ${this.usersLogIn.password.value}`);
  }
  ngOnInit(): void {}
}
