import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { MatchesComponent } from './components/home/matches/matches.component';
import { ChatComponent } from './components/home/chat/chat.component';
import { AuthService as AuthGuard } from '@app/services/auth.service';
import { UserguardService as UserGuard } from '@app/services/userguard.service';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard],
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
        path: 'chat',
        component: ChatComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [UserGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    // canActivate: [UserGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
