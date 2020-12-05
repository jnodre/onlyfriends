import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@int/user';
import { AuthService } from '@app/services/auth.service';
import { GetuserService } from '@app/services/getuser.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private getuserService: GetuserService
  ) {
    this.user = JSON.parse(this.authService.setCurrentSession() || '{}');
  }
  friends: any[] = [];
  user: User;
  @Output() newItemEvent = new EventEmitter<string>();

  public takeFriends(id: string): void {
    this.getuserService.getUser(id).then((res) => {
      localStorage.setItem('friendProfile', JSON.stringify(res));
      this.router.navigateByUrl('/friend-profile');
    });
  }

  public openChat(friendId: string){
    this.router.navigate([`/chat`, {'friendId': friendId}])
  }
  ngOnInit(): void {
    this.user.friends.forEach((r) => {
      this.getuserService.getUser(r).then((res) => {
        this.friends.push(res);
      });
    });
  }
}
