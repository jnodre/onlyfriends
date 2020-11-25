import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '@int/user';

@Injectable({
  providedIn: 'root',
})
export class GetuserService {
  dburl = 'http://localhost:3000/users';

  constructor() {}

  public getUser(id: string): Promise<User> {
    return axios.get(`${this.dburl}${id}`).then((res) => res.data);
  }
}
