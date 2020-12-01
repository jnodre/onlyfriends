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

  }
  ngOnInit(): void {
    this.obtainImage(this.user._id, this.myUrl);
    this.obtainImage(this.friendId, this.friendUrl);
    this.getUserService.getUser(this.friendId).then((r) => {
      this.friendName=r.name;
    });
    console.log("id del loggeado ", this.user._id);
  }


  obtainImage(id: string, url:string): void{
    const filename = "fotos/"+id;
    const fileRef= this.storage.ref(filename);
    this.downloadUrl = fileRef.getDownloadURL();
    this.downloadUrl.subscribe(u => {
      if (u) {
        url = u;
      }
      console.log("LA OTRA URL: ",url);
    });
  }
  back(){
    this.router_navigate.navigate(['friends']);
  }


}
