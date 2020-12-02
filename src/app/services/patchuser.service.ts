import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '@int/user';
import { GetuserService } from '@app/services/getuser.service';

@Injectable({
  providedIn: 'root',
})
export class PatchuserService {
  dburl = 'http://localhost:3000/users/';
  constructor(private getuserService: GetuserService) {}

  public editHobbies(id: string, data: string[]): Promise<User> {
    return axios.patch(this.dburl + id + '/hobbies', {
      hobbies: data,
    });
  }
  public editName(id: string, data: string): Promise<any> {
    return axios
      .patch(this.dburl + id + '/name', {
        name: data,
      })
      .then(() =>
        this.getuserService
          .getUser(id)
          .then((res) => localStorage.setItem('user', JSON.stringify(res)))
      );
  }
  public editGender(id: string, data: string): Promise<any> {
    return axios
      .patch(this.dburl + id + '/gender', {
        gender: data,
      })
      .then(() =>
        this.getuserService
          .getUser(id)
          .then((res) => localStorage.setItem('user', JSON.stringify(res)))
      );
  }
  public editEmail(id: string, data: string): Promise<any> {
    return axios
      .patch(this.dburl + id + '/email', {
        email: data,
      })
      .then(() =>
        this.getuserService
          .getUser(id)
          .then((res) => localStorage.setItem('user', JSON.stringify(res)))
      );
  }
  public editPassword(id: string, data: string): Promise<any> {
    return axios
      .patch(this.dburl + id + '/password', {
        password: data,
      })
      .then(() =>
        this.getuserService
          .getUser(id)
          .then((res) => localStorage.setItem('user', JSON.stringify(res)))
      );
  }
  public editWhatsapp(id: string, data: string): Promise<any> {
    return axios
      .patch(this.dburl + id + '/whatsapp', {
        Whatssap: data,
      })
      .then(() =>
        this.getuserService
          .getUser(id)
          .then((res) => localStorage.setItem('user', JSON.stringify(res)))
      );
  }
  public editFacebook(id: string, data: string): Promise<any> {
    return axios
      .patch(this.dburl + id + '/facebook', {
        Facebook: data,
      })
      .then(() =>
        this.getuserService
          .getUser(id)
          .then((res) => localStorage.setItem('user', JSON.stringify(res)))
      );
  }
  public editInstagram(id: string, data: string): Promise<any> {
    return axios
      .patch(this.dburl + id + '/instagram', {
        Instagram: data,
      })
      .then(() =>
        this.getuserService
          .getUser(id)
          .then((res) => localStorage.setItem('user', JSON.stringify(res)))
      );
  }
}
