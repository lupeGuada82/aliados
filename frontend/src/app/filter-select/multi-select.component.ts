import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Item {
  id: number;
  label: string;
}

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html'
})
export class MultiSelectComponent implements OnInit {

  @Input() options: Item[] = [];

  // 🔴 ESTE ERA EL QUE FALTABA
  @Output() selectionChange = new EventEmitter<Item[]>();

  control = new FormControl('');
  selected: Item[] = [];
  filteredOptions!: Observable<Item[]>;

  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value))
    );
  }

 private filterOptions(value: string | Item | null): Item[] {
    const filterValue =
      typeof value === 'string'
        ? value.toLowerCase()
        : value?.label.toLowerCase() || '';

    return this.options.filter(option =>
      option.label.toLowerCase().includes(filterValue)
    );
  }
  select(item: Item): void {
    this.selected = [...this.selected, item];
    this.control.setValue('');

    // 🔴 emitir cambio
    this.selectionChange.emit(this.selected);
  }

  remove(item: Item): void {
    this.selected = this.selected.filter(i => i.id !== item.id);

    // 🔴 emitir cambio
    this.selectionChange.emit(this.selected);
  }

  toggle(item: Item): void {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter(i => i.id !== item.id);
    } else {
      this.selected = [...this.selected, item];
    }

    this.selectionChange.emit(this.selected);
  }

  isSelected(item: Item): boolean {
    return this.selected.some(i => i.id === item.id);
  }
  

}
