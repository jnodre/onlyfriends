import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { GetuserService } from '@app/services/getuser.service';
import { AuthService } from '@app/services/auth.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database'
import { ChatServiceService } from '../../../../services/chat-service.service';
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
  element: any;
  mensaggeSended!:string;
  day = new Date();
  public fechaString:string = this.day.getDate.toString()+"/"+this.day.getMonth.toString()+"/"+this.day.getFullYear.toString();
  public horaString:string = this.day.getHours+":"+this.day.getMinutes+":"+this.day.getSeconds;
  constructor(private router:ActivatedRoute,
    private storage: AngularFireStorage,
    private router_navigate:Router,
    private getUserService: GetuserService,
    private authService: AuthService,
    private db: AngularFireDatabase,
    public chatService: ChatServiceService
    ) {
      this.friendId=this.router.snapshot.params["friendId"];
      this.user = JSON.parse(this.authService.setCurrentSession() || '{}');

      this.obtainUserImage(this.user._id);
      this.obtainFriendImage(this.friendId);

      this.chatService.loadMessages()
        .subscribe(()=>{
          setTimeout(() => {
            this.element.scrollTop = this.element.scrollHeight;
          },20)

        });
  }
  ngOnInit(): void {
    this.getUserService.getUser(this.friendId).then((r) => {
      this.friendName=r.name;
    });
    /*this.element=document.getElementById("app-mensajes");
    var x = document.getElementById("fecha");
    x!.innerHTML = this.fechaString;*/
  }

  sendMessage(){
    var id_message = document.getElementById("mensajeInput") as HTMLInputElement;
      var message = id_message.value;
    if(message.length == 0){
      return;
    }
    this.chatService.saveMessage(message, this.user._id, this.friendId).then(()=>{
      console.log("Mensaje guardado en firebase");
      message = "";
    }).catch(()=>{
      console.log("El mensaje no se ha guardado en firebase");
    });

      // get message
      /*var id_message = document.getElementById("mensajeInput") as HTMLInputElement;
      var message = id_message.value;
      //var message = document.getElementById("message").value;
      // save in database
      var currentTimeInSeconds=Math.floor(Date.now()/1000); //unix timestamp in seconds
      var currentTimeInMilliseconds=;
      this.db.list('/mensajes').push({
        "emisor": this.user._id,
        "receptor": this.friendId,
        "hora": currentTimeInMilliseconds,
        "mensaje": message
      })
    //console.log(this.firebaseDB.collection('mensajes').valueChanges());
     /* firebase.default.database.('mensajes').push().set({
      })*/

      // prevent form from submitting
      //return false;
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
