import { Injectable } from '@angular/core';
import { UsersLogIn } from '@int/users-log-in';
import axios from 'axios';
import { GetuserService } from '@app/services/getuser.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  dburl = 'http://localhost:3000/login';

  constructor(private getuserService: GetuserService) {}

  public logInUser(email: string, password: string): Promise<UsersLogIn> {
    return axios
      .post(this.dburl, {
        email,
        password,
      })
      .then((res) => {
        this.getuserService.getUser(res.data.usuario._id);
        // localStorage.setItem('token', res.data.token);
        // localStorage.setItem('user', JSON.stringify(res.data.usuario));
        return res.data;
      });
  }
}
