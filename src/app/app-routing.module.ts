import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { MatchesComponent } from './components/home/matches/matches.component';
import { FriendProfileComponent } from './components/home/friend-profile/friend-profile.component';
import { FriendListComponent } from './components/home/friend-list/friend-list.component';
import { MeComponent } from './components/home/me/me.component';
import { ChatComponent } from './components/home/friend-list/chat/chat.component';
import { AuthService as AuthGuard } from '@app/services/auth.service';
import { UserguardService as UserGuard } from '@app/services/userguard.service';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'matches',
        component: MatchesComponent,
      },
      {
        path: 'friends',
        component: FriendListComponent,
      },
      {
        path: 'friend-profile',
        component: FriendProfileComponent,
      },
      {
        path: 'me',
        component: MeComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [UserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
