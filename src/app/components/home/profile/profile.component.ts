import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { PatchuserService } from '@app/services/patchuser.service';
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm = this.formBuilder.group({
    email: [''],
    name: [''],
    gender: [''],
    password: [''],
  });
  userProfile = {
    email: this.profileForm.controls.email,
    name: this.profileForm.controls.name,
    gender: this.profileForm.controls.gender,
    password: this.profileForm.controls.gender,
  };
  hobby = '';
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  hobbyCtrl = new FormControl();
  filteredHobbies: Observable<string[]>;
  hobbies: string[] = [];
  allHobbies: string[] = [
    'Fútbol',
    'Tenis',
    'Videojuegos',
    'PlayStation 4',
    'PlayStation 5',
    'Viajar',
    'Caminar',
    'Fitness',
    'Among US',
    'Informática',
    'Progrmación',
    'Boxeo',
    'Kick Boxing',
    'Xbox',
    'Gaming',
    'Perros',
    'Gatos',
    'Caballos',
    'Hamsters',
    'Coches',
    'Motos',
    'Pintura',
    'Geografía',
    'Matemáticas',
    'Negocios',
    'StartUps',
  ];
  @Input() user!: User;
  @ViewChild('hobbyInput') hobbyInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(
    private patchuserService: PatchuserService,
    private formBuilder: FormBuilder
  ) {
    this.filteredHobbies = this.hobbyCtrl.valueChanges.pipe(
      startWith(null),
      map((hobby: string | null) =>
        hobby ? this._filter(hobby) : this.allHobbies.slice()
      )
    );
  }

  public changeHobbies(): void {
    if (this.user) {
      this.patchuserService.editHobbies(this.user._id, this.hobbies);
    } else {
      console.log(this.user);
    }
  }
  public changeName(): void {
    if (this.user) {
      this.patchuserService.editName(
        this.user._id,
        this.userProfile.name.value
      );
    } else {
      console.log(this.user);
    }
  }
  public changeGender(): void {
    if (this.user) {
      this.patchuserService.editGender(
        this.user._id,
        this.userProfile.gender.value
      );
    } else {
      console.log(this.user);
    }
  }
  public changeEmail(): void {
    console.log(this.userProfile.email.value);
    if (this.user) {
      this.patchuserService.editEmail(
        this.user._id,
        this.userProfile.email.value
      );
    } else {
      console.log(this.user);
    }
  }
  public changePassword(): void {
    if (this.user) {
      this.patchuserService.editPassword(
        this.user._id,
        this.userProfile.password.value
      );
    } else {
      console.log(this.user);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.hobbies.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.hobbyCtrl.setValue(null);
  }

  remove(hobby: string): void {
    const index = this.hobbies.indexOf(hobby);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
      this.changeHobbies();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.hobbyInput.nativeElement.value = '';
    this.hobbyCtrl.setValue(null);
    this.changeHobbies();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHobbies.filter(
      (hobby) => hobby.toLowerCase().indexOf(filterValue) === 0
    );
  }
  ngOnInit(): void {
    this.hobbies = this.user.hobbies;
  }
}
