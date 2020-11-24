import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor() {}
  dburl = 'http://localhost:3000/home/';

  public getMatches(id: string): any {
    return axios.get(this.dburl + id).then((res) => res.data);
  }
}
