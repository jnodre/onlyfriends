import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GetuserService } from '@app/services/getuser.service';
import { User } from '@int/user';
import { AuthService } from '@app/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.user = JSON.parse(this.authService.setCurrentSession() || '{}');
    this.url = 'assets/img/error.png';
  }
  downloadUrl!: Observable<string>;
  url: string;
  user: User;
  public logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
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
  public logout(): void {
    window.localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  ngOnInit(): void {
    this.loadImage();
  }
}
