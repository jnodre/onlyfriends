import { Injectable } from '@angular/core';
import axios from 'axios';
import { UsersLogIn } from '@int/users-log-in';


@Injectable({
  providedIn: 'root',
})
export class SignupService {
  dburl = 'http://localhost:3000/register';

  constructor() {}

  public createUser(email: string, password: string): Promise<UsersLogIn> {
    return axios
      .post(this.dburl, {
        email,
        password,
      })
      .then((res) => res.data);
  }
}
