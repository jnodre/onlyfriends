import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { PatchuserService } from '@app/services/patchuser.service';
import { GetuserService } from '@app/services/getuser.service';
import { User } from '@int/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  hobbies: string[] = [];
  hobby = '';
  user: User;

  constructor(
    private authService: AuthService,
    private patchuserService: PatchuserService,
    private getuserService: GetuserService
  ) {
    this.user = JSON.parse(this.authService.setCurrentSession() || '{}') ;
  }

  public addHobbies(): void {
    this.hobbies.push(this.hobby);
    this.patchuserService.editHobbies(this.user._id, this.hobbies).then(() => {
      this.getuserService
        .getUser(this.user._id)
        .then((res) => (this.user = res))
        .catch((error) => console.log(error));
    });
  }

  ngOnInit(): void {}
}
