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
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit {
  user: any;
  url;
  downloadUrl!: Observable<string>;

  constructor(
    private patchuserService: PatchuserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.user = JSON.parse(this.authService.setCurrentSession() || '{}');
    this.url = 'assets/img/error.png';
  }
  public loadImage(): void {
    const filename = 'fotos/' + this.user._id;
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
    console.log(this.user);
  }
}
