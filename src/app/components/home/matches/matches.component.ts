import { Component, OnInit } from '@angular/core';
import { FriendsService } from '@app/services/friends.service';
import { AuthService } from '@app/services/auth.service';
import { GetuserService } from '@app/services/getuser.service';
import { User } from '@int/user';
import axios from 'axios';
@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
})
export class MatchesComponent implements OnInit {
  user;
  constructor(
    private friendsService: FriendsService,
    private authService: AuthService,
    private getUserService: GetuserService
  ) {
    this.user = JSON.parse(this.authService.setCurrentSession() || '{}');
  }
  item: any;
  array: string[] = [];
  friends: any[] = [];
  id = '5fb80819f852cb43245177d1';
  public getMatches(id: string): void {
    this.friendsService.getMatches(id).then((res: any) => {
      this.item = Object.entries(res)[1][1];
      this.item.forEach((r: any) => {
        this.getMatchesData(r._id);
        console.log(this.friends);
      });
    });
    console.log(this.friends);
  }
  public getMatchesData(id: string): void {
    this.getUserService.getUser(id).then((r) => {
      this.friends.push(r);
    });
  }
  public match(id: string): any {
    return axios
      .patch(`http://localhost:3000/${this.user.id}/people`, {
        friends: id,
      })
      .then((r) => console.log(r));
  }
  ngOnInit(): void {
    this.getMatches(this.user._id);
  }
}
