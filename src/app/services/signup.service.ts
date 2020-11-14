import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  dburl = 'http://localhost:3000/register';

  constructor() {}

  public createUser(email: string, password: string): Promise<any> {
    return axios
      .post(this.dburl, {
        email,
        password,
      })
      .then((res) => res.data);
  }
}
