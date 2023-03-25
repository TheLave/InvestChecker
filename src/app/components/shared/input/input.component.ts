import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() type?: string = 'text';
  @Input() value: string | null = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() secondary = false;

  valueChanged(value: any) {
    this.valueChange.emit(value.target.value);
  }
}
