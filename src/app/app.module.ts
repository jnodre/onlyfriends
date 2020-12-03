import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfileComponent } from './components/home/profile/profile.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeComponent } from './components/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatchesComponent } from './components/home/matches/matches.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FriendListComponent } from './components/home/friend-list/friend-list.component';
import { MatListModule } from '@angular/material/list';
import { FriendProfileComponent } from './components/home/friend-profile/friend-profile.component';

import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { MatMenuModule } from '@angular/material/menu';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome/angular-fontawesome';
//import { FontAwesomeModule } from '@fontawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    MatchesComponent,
    FriendListComponent,
    FriendProfileComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    IvyCarouselModule,
    MatListModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBXwDQNqy9LLXI4VxZQPtXAaws8ODZt6z0',
      authDomain: 'onlyfriends-79989.firebaseapp.com',
      databaseURL: 'https://onlyfriends-79989.firebaseio.com',
      projectId: 'onlyfriends-79989',
      storageBucket: 'onlyfriends-79989.appspot.com',
      messagingSenderId: '279470064809',
      appId: '1:279470064809:web:bd0da5666a98f2177055b8',
      measurementId: 'G-6RVSYYDHPV',
    }),
    AngularFireStorageModule,
    MatMenuModule,
   // FontAwesomeModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: BUCKET, useValue: 'gs://onlyfriends-79989.appspot.com' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
