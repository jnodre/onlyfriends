import { Component, OnInit } from '@angular/core';
import { FriendsService } from '@app/services/friends.service';
import { AuthService } from '@app/services/auth.service';
import { GetuserService } from '@app/services/getuser.service';
import axios from 'axios';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
    private getUserService: GetuserService,
    private storage: AngularFireStorage
  ) {

    this.user = JSON.parse(this.authService.setCurrentSession() || '{}');
  }
  item: any;
  array: string[] = [];
  friends: any[] = [];
  downloadUrl!: Observable<string>;
  url!:string;

  public getMatches(id: string): void {
    this.friendsService.getMatches(id).then((res: any) => {
      this.item = Object.entries(res)[0];
      this.item.forEach((r: any) => {
        this.getMatchesData(r._id);
        this.obtainImage(r._id);
      });
    });
  }
  public getMatchesData(id: string): void {
    this.getUserService.getUser(id).then((r) => {
      this.friends.push(r);
    });
  }
  public match(id: string): any {
    this.friends = this.friends.filter((r) => r._id !== id);
    console.log(this.friends);
    return axios.patch(`http://localhost:3000/users/${this.user._id}/people`, {
      friendId: id,
    });
  }
  public no_match(id: string): any {
    this.friends = this.friends.filter((r) => r._id !== id);
  }
  obtainImage(id: string): void{
    const filename = "fotos/"+id;
    const fileRef= this.storage.ref(filename);
    this.downloadUrl = fileRef.getDownloadURL();
    this.downloadUrl.subscribe(u => {
      if (u) {
        this.url = u;
      }
      console.log("LA OTRA URL: ",this.url);
    });

 }

  ngOnInit(): void {
    this.getMatches(this.user._id);
  }
}
