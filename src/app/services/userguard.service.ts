import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class UserguardService {

  dburlAuth = 'http://localhost:3000/';

  constructor(public router: Router) {}


  public isAuthenticated(): Promise<boolean> {
    return axios.get(this.dburlAuth + "auth/isAuth" ).then(res => res.data.status)
  }

  public canActivate(): boolean {
    if (this.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
