
import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';

@Component({
  selector: 'app-filter',
  imports: [SplitButton],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  items: MenuItem[] = []
  @Output() selectedCategory = new EventEmitter<string>();
  


  categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ]


  constructor() {

    for (let item of this.categories) {
      this.items.push({
        label: item,
        command: () => {
          this.selectedCategory.emit(item)
        }
      })
    }
  }

  
}
