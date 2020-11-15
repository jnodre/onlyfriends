import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { PatchuserService } from '@app/services/patchuser.service';
import { User } from '@int/user';
import { FormControl } from '@angular/forms';
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
  hobby = '';
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
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
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  constructor(private patchuserService: PatchuserService) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allHobbies.slice()
      )
    );
  }

  public addHobbies(): void {
    this.hobbies.push(this.hobby);
    if (this.user) {
      this.patchuserService.editHobbies(this.user._id, this.hobbies);
    } else {
      console.log(this.user);
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.hobbies.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.hobbies.indexOf(fruit);

    if (index >= 0) {
      this.hobbies.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.hobbies.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allHobbies.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }
  ngOnInit(): void {}
}
