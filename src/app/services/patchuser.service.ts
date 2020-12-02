import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '@int/user';

@Injectable({
  providedIn: 'root',
})
export class PatchuserService {
  dburl = 'http://localhost:3000/users/';
  constructor() {}

  public editHobbies(id: string, data: string[]): Promise<User> {
    return axios.patch(this.dburl + id + '/hobbies', {
      hobbies: data,
    });
  }
  public editName(id: string, data: string): Promise<User> {
    return axios.patch(this.dburl + id + '/name', {
      name: data,
    });
  }
  public editGender(id: string, data: string): Promise<User> {
    return axios.patch(this.dburl + id + '/gender', {
      gender: data,
    });
  }
  public editEmail(id: string, data: string): Promise<User> {
    return axios.patch(this.dburl + id + '/email', {
      email: data,
    });
  }
  public editPassword(id: string, data: string): Promise<User> {
    return axios.patch(this.dburl + id + '/password', {
      password: data,
    });
  }
  public editWhatsapp(id: string, data: string): Promise<User> {
    return axios.patch(this.dburl + id + '/whatsapp', {
      Whatssap: data,
    });
  }
  public editFacebook(id: string, data: string): Promise<User> {
    return axios.patch(this.dburl + id + '/facebook', {
      Facebook: data,
    });
  }
  public editInstagram(id: string, data: string): Promise<User> {
    return axios.patch(this.dburl + id + '/instagram', {
      Instagram: data,
    });
  }
}
