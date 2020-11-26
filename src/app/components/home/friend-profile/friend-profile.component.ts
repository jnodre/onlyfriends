import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetuserService } from '@app/services/getuser.service';
import { User } from '@int/user';
import { AuthService } from '@app/services/auth.service';
@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss'],
})
export class FriendProfileComponent implements OnInit {
  friend: User;
  getFriendData(): string | null {
    return localStorage.getItem('friendProfile');
  }
  constructor(private authService: AuthService, private router: Router) {

    this.friend = JSON.parse(this.getFriendData() || '{}');


  }
  ngOnInit(): void {
  }
}
