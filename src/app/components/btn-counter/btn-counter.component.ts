import { Component, EventEmitter, Output, Input, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-btn-counter',
  imports: [],
  templateUrl: './btn-counter.component.html',
  styleUrl: './btn-counter.component.scss'
})
export class BtnCounterComponent {
  @Input() quantity: number = 0;
  @Output() increment = new EventEmitter<number>();
  @Output() decrement = new EventEmitter<number>();
}
