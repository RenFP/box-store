import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-btn-counter',
  imports: [],
  templateUrl: './btn-counter.component.html',
  styleUrl: './btn-counter.component.scss'
})
export class BtnCounterComponent {
  counter: WritableSignal<number> = signal(0);

  increment() {
    this.counter.update(value => value + 1);
  }

  decrement() {
    if(this.counter() > 0) {
    this.counter.update(value => value - 1);
    }
  }
}
