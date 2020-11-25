import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import axios from 'axios';
import { User } from '@app/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(public router: Router) {}
  dburlAuth = 'http://localhost:3000/';
  public setCurrentSession(): Promise<User>{
    return axios.get(this.dburlAuth + "auth/usuarioInfo" ).then(res => res.data)
  }

  public isAuthenticated(): Promise<boolean> {
    return axios.get(this.dburlAuth + "auth/isAuth" ).then(res => res.data.status)
  }

  public canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  public isUser(): boolean {
    if (this.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
