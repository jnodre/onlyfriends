import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  public emisor!:string;
  public receptor!:string;
  public chat: any [] = [];
  public itemsCollection!: AngularFirestoreCollection<any>;
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
        fecha: new Date().getTime(),
        mensaje: texto
      }
      return this.itemsCollection.add(mensaje);
  }

  knowSender(){

  }

  knowReceiver(){

  }
}

