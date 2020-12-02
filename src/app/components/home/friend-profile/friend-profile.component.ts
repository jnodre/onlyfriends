import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { PatchuserService } from '@app/services/patchuser.service';
import { AuthService } from '@app/services/auth.service';
import { User } from '@int/user';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-friend-profile',
  templateUrl: './friend-profile.component.html',
  styleUrls: ['./friend-profile.component.scss'],
})
export class FriendProfileComponent implements OnInit {
  friend: any;
  url;
  downloadUrl!: Observable<string>;

  getFriendData(): string | null {
    return localStorage.getItem('friendProfile');
  }
  constructor(
    private patchuserService: PatchuserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.friend = JSON.parse(this.getFriendData() || '{}');
    this.url = 'assets/img/error.png';
  }
  public loadImage(): void {
    const filename = 'fotos/' + this.friend._id;
    const fileRef = this.storage.ref(filename);
    this.downloadUrl = fileRef.getDownloadURL();
    this.downloadUrl.subscribe((u) => {
      if (u) {
        this.url = u;
      }
      console.log('LA OTRA URL: ', this.url);
    });
  }
  ngOnInit(): void {
    this.loadImage();
    if (this.friend.Whatssap.length > 0) {
      this.friend.Whatssap += '';
    }
  }
}
