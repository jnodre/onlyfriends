import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UsersSignUp } from '@int/users-sign-up';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(
      control &&
      control.parent.invalid &&
      control.dirty &&
      control.parent.hasError('match')
    );
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  signupForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [''],
    },
    { validator: this.passwordMatch }
  );

  userSignUp: UsersSignUp = {
    password: this.signupForm.controls.password,
    email: this.signupForm.controls.email,
    confirmPassword: this.signupForm.controls.confirmPassword,
  };

  // tslint:disable-next-line:no-inferrable-types
  hide: boolean = false;
  matcher = new MyErrorStateMatcher();

  public addUser(): void {
    console.warn(this.signupForm.value);
  }

  public getErrorMessageEmail(): string | undefined {
    if (this.signupForm.controls[`email`].hasError('required')) {
      return 'Este campo no puede quedar vacío.';
    }
    if (this.signupForm.controls[`email`].hasError('email')) {
      return 'Debes introducir una dirección de correo electrónico válida';
    }
  }
  public getErrorMessagePassword(): string | undefined {
    if (this.signupForm.controls[`password`].hasError('required')) {
      return 'Este campo no puede quedar vacío.';
    }
    if (this.signupForm.controls[`password`].hasError('minlength')) {
      return 'Debes introducir una contraseña de más de 8 caracteres.';
    }
  }
  public getErrorMessageConfirmPassword(): string | undefined {
    if (this.signupForm.controls[`confirmPassword`].hasError('required')) {
      return 'Este campo no puede quedar vacío.';
    }
    if (this.signupForm.hasError('match')) {
      return 'Las contraseñas deben de ser la misma.';
    }
  }

  public passwordMatch(group: FormGroup): {match: boolean} | null {
    return group?.get(`password`)?.value === group?.get(`confirmPassword`)?.value ? null : { match: true };
  }
  ngOnInit(): void {}
}
