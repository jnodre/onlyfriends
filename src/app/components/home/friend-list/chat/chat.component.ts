import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { GetuserService } from '@app/services/getuser.service';
import { AuthService } from '@app/services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  downloadUrl!: Observable<string>;
  myUrl!:string;
  friendUrl!:string;
  friendId!:string;
  friendName!:string;
  user;
  constructor(private router:ActivatedRoute,
    private storage: AngularFireStorage,
    private router_navigate:Router,
    private getUserService: GetuserService,
    private authService: AuthService) {
      this.friendId=this.router.snapshot.params["friendId"];
      this.user = JSON.parse(this.authService.setCurrentSession() || '{}');

    this.obtainUserImage(this.user._id);
    this.obtainFriendImage(this.friendId);

  }
  ngOnInit(): void {
    this.getUserService.getUser(this.friendId).then((r) => {
      this.friendName=r.name;
    });
    console.log("id del loggeado ", this.user._id);
  }


  obtainUserImage(id: string): void{
    const filename = "fotos/"+id;
    const fileRef= this.storage.ref(filename);
    this.downloadUrl = fileRef.getDownloadURL();
    this.downloadUrl.subscribe(u => {
      if (u) {
        this.myUrl = u;
      }
      console.log("LA OTRA URL: ",this.myUrl);
    });
  }
  obtainFriendImage(id: string): void{
    const filename = "fotos/"+id;
    const fileRef= this.storage.ref(filename);
    this.downloadUrl = fileRef.getDownloadURL();
    this.downloadUrl.subscribe(u => {
      if (u) {
        this.friendUrl= u;
      }
      console.log("LA OTRA URL: ",this.friendUrl);
    });
  }
  back(){
    this.router_navigate.navigate(['friends']);
  }


}
