import { AbstractControl } from '@angular/forms';

export interface UsersSignUp {
  password: AbstractControl;
  email: AbstractControl;
  confirmPassword: AbstractControl;
}
