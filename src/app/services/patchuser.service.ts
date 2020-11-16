import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '@int/user';

@Injectable({
  providedIn: 'root',
})
export class PatchuserService {
  dburl = 'http://localhost:3000/users/';
  constructor() {}

  public editHobbies(id: string, data: any): Promise<User> {
    return axios.patch(this.dburl + id + '/hobbies', {
      hobbies: data,
    });
  }
}
