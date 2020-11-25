import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetuserService } from '@app/services/getuser.service';
import { User } from '@int/user';
import { AuthService } from '@app/services/auth.service';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user?: User;
  dburlAuth = 'http://localhost:3000/';
  constructor(
    private authService: AuthService,
    private getuserService: GetuserService,
    private router: Router
  ) {
    
  }
  public logOut(): void {
    axios.get(this.dburlAuth + "auth/logout").then(msg => msg.data)
  }

  ngOnInit(): void {
    this.router.navigate(['/login']);
    // this.authService.setCurrentSession().then(usuario => {
    //   this.user = usuario
    // });
  }
}
