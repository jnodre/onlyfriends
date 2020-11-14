import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersLogIn } from '@int/users-log-in';
import { DefaultInputMatcher } from '@app/user-form.error-matcher';
import { LoginService } from '@app/services/login.service';
import { Router } from '@angular/router';
import { GetuserService } from '@app/services/getuser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private getUserService: GetuserService
  ) {}

  logInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  usersLogIn: UsersLogIn = {
    password: this.logInForm.controls.password,
    email: this.logInForm.controls.email,
  };
  // tslint:disable-next-line:no-inferrable-types
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
    this.loginService
      .logInUser(this.usersLogIn.email.value, this.usersLogIn.password.value)
      .then(() => {
        this.router.navigateByUrl('/profile');
      })
      .catch(() => console.log('hay un error'));
  }
  ngOnInit(): void {}
}
