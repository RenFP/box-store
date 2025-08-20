import { Component } from '@angular/core';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-filter',
  imports: [Menubar],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  filterItems = [
    {
      label: 'Categoria', items: [
          { label: 'Category 1', icon: 'pi pi-fw pi-tag' },
          { label: 'Category 2', icon: 'pi pi-fw pi-tag' },
        ]
      }
  ];
}
