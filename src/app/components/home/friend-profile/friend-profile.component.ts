import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetuserService } from '@app/services/getuser.service';
import { User } from '@int/user';
import { AuthService } from '@app/services/auth.service';
import { faInstagram, faJs } from '@fortawesome/free-brands-svg-icons';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss'],
})
export class FriendProfileComponent implements OnInit {
  faInstagram = faInstagram;
  friend: any;
  getFriendData(): string | null {
    return localStorage.getItem('friendProfile');
  }
  constructor(private authService: AuthService, private router: Router) {
    this.friend = JSON.parse(this.getFriendData() || '{}');
  }
  ngOnInit(): void {
    if (this.friend.Whatssap.length > 0) {
      this.friend.Whatssap += '';
    }
  }
}
