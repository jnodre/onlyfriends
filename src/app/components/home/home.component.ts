import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetuserService } from '@app/services/getuser.service';
import { User } from '@int/user';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private getuserService: GetuserService,
    private router: Router
  ) {
    this.user = JSON.parse(this.authService.setCurrentSession() || '{}');
  }
  user: User;
  public logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {}
}
