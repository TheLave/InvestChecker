import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() color?: string = 'white';
  @Input() iconColor?: string;
  @Input() icon?: string;
  @Input() full?: boolean;
  @Input() enabled: boolean = true;
  @Input() darkText: boolean = false;
  @Output('onClick') _onClick = new EventEmitter();

  get classes() {
    let classes = [];
    if (this.full) {
      classes.push('full');
    }
    if (this.darkText) {
      classes.push('dark');
    }
    return classes;
  }

  onClick() {
    this._onClick.emit();
  }
}
