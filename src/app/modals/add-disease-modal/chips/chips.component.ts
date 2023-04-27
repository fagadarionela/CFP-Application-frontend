import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  elementsControl = new FormControl('');
  filteredElements: Observable<any[]>;

  @ViewChild('elementInput') elementInput: ElementRef<HTMLInputElement>;

  @Input() title!: string;
  @Input() allElements!: any[];
  @Input() list!: any[];
  @Output() listChange = new EventEmitter<any>();

  constructor() {

    this.filteredElements = this.elementsControl.valueChanges.pipe(
      startWith(null),
      map((element: string | null) => (element ? this._filter(element) : this.allElements.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.list.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.elementsControl.setValue(null);
    this.listChange.emit(this.list);
  }

  remove(element: string): void {
    const index = this.list.indexOf(element);

    if (index >= 0) {
      this.list.splice(index, 1);
    }
    this.listChange.emit(this.list);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.list.push(event.option.viewValue);
    this.elementInput.nativeElement.value = '';
    this.elementsControl.setValue(null);
    this.listChange.emit(this.list);
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.allElements.filter(element => element.name.toLowerCase().includes(filterValue));
  }

}
