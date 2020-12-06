import { WeekDay } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { disableDebugTools } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  public emisor!:string;
  public receptor!:string;
  public chat: any [] = [];
  public itemsCollection!: AngularFirestoreCollection<any>;
  day = new Date();
  public fechaString:string = this.day.getDate.toString()+"/"+this.day.getMonth.toString()+"/"+this.day.getFullYear.toString();
  public horaString:string = this.day.getHours+":"+this.day.getMinutes+":"+this.day.getSeconds;

  constructor(private afs: AngularFirestore) { }

  loadMessages(){
    this.itemsCollection = this.afs.collection<any>('mensajes', ref => ref.orderBy('fecha', 'desc')
                                                                                        .limit(5));
    return this.itemsCollection.valueChanges()
    .pipe(map((mensajes: any[])=> {
      console.log(mensajes);
      //this.chat = mensajes;
      this.chat = [];
      for(let m of mensajes){
        this.chat.unshift(m);
      }

      return this.chat;
    }));
  }

  getItemCollection(){
    return this.itemsCollection;
  }

  saveMessage(texto: string, userId:string, friendId:string){
      let mensaje: any = {
        emisor: userId,
        receptor: friendId,
        fecha: this.fechaString,
        hora: this.horaString,
        mensaje: texto
      }
      return this.itemsCollection.add(mensaje);
  }

  knowSender(){

  }

  knowReceiver(){

  }
}
