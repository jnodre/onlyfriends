import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class PatchuserService {
  dburl = 'http://localhost:3000/users/';
  constructor() {}

  public editHobbies(id: string, data: any): Promise<any> {
    return axios.patch(this.dburl + id + '/hobbies', {
      hobbies: data,
    });
  }
}
