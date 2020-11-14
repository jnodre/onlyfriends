import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersSignUp } from '@int/users-sign-up';
import {
  PasswordMatcher,
  DefaultInputMatcher,
} from '@app/user-form.error-matcher';
import { SignupService } from '@app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {}

  signUpForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [''],
    },
    { validator: this.passwordMatch }
  );
  userSignUp: UsersSignUp = {
    password: this.signUpForm.controls.password,
    email: this.signUpForm.controls.email,
    confirmPassword: this.signUpForm.controls.confirmPassword,
  };

  hide = false;
  defaultInputMatcher = new DefaultInputMatcher();
  passwordMatcher = new PasswordMatcher();

  public addUser(): void {
    this.signupService.createUser(
      this.userSignUp.email.value,
      this.userSignUp.password.value
    );
  }

  public getErrorMessageEmail(): string {
    if (this.signUpForm.controls[`email`].hasError('required')) {
      return 'Este campo no puede quedar vacío.';
    }
    if (this.signUpForm.controls[`email`].hasError('email')) {
      return 'Debes introducir una dirección de correo electrónico válida';
    } else {
      return '';
    }
  }
  public getErrorMessagePassword(): string {
    if (this.signUpForm.controls[`password`].hasError('required')) {
      return 'Este campo no puede quedar vacío.';
    }
    if (this.signUpForm.controls[`password`].hasError('minlength')) {
      return 'Debes introducir una contraseña de más de 8 caracteres.';
    } else {
      return '';
    }
  }
  public getErrorMessageConfirmPassword(): string {
    if (this.signUpForm.controls[`confirmPassword`].hasError('required')) {
      return 'Este campo no puede quedar vacío.';
    }
    if (this.signUpForm.hasError('match')) {
      return 'Las contraseñas deben de ser la misma.';
    } else {
      return '';
    }
  }

  public passwordMatch(group: FormGroup): { match: boolean } | null {
    return group?.get(`password`)?.value ===
      group?.get(`confirmPassword`)?.value
      ? null
      : { match: true };
  }
  ngOnInit(): void {}
}
