import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@int/user';
import { AuthService } from '@app/services/auth.service';
import { GetuserService } from '@app/services/getuser.service';
import { Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
  urlEmpty;
  existUrl: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private getuserService: GetuserService,
    private storage: AngularFireStorage
  ) {
    this.urlEmpty = 'assets/img/error.png';
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

 /*obtainImage(id: string) {
    const filename = 'fotos/' + id;
    const fileRef = this.storage.ref(filename);
    const downloadUrl = fileRef.getDownloadURL();
    let url: string;
    downloadUrl.subscribe((u) => {
      if (u) {
        this.existUrl=true;
        url = u;
      }else{
        return this.urlEmpty;
      }
      console.log('LA OTRA URL: ', url);
      return url;
    });
  }*/

  ngOnInit(): void {
    this.user.friends.forEach((r) => {
      this.getuserService.getUser(r).then((res) => {
        this.friends.push(res);
      });
    });
  }
}
