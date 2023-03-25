import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() color?: string;
  @Input() src: string = '';
  icon!: string;

  ngOnInit(): void {
    this.icon = `assets/${this.src}.svg`;
  }
}
