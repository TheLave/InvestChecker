import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRipple]',
})
export class RippleDirective {
  constructor(private el: ElementRef) {}

  @HostListener('click', ['$event']) onClick(e: any) {
    const button = this.el.nativeElement;
    button.style.position = 'relative';
    button.style.overflow = 'hidden';

    const circle = document.createElement('div');
    const rect = button
      ? button.getBoundingClientRect()
      : {
          width: 0,
          height: 0,
          left: 0,
          top: 0,
        };

    button.appendChild(circle);

    const rippleX = Math.round(e.clientX - rect.left);
    const rippleY = Math.round(e.clientY - rect.top);
    const sizeX = Math.max(Math.abs(button.clientWidth - rippleX), rippleX);
    const sizeY = Math.max(Math.abs(button.clientHeight - rippleY), rippleY);
    const rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);

    circle.style.width = circle.style.height = `${rippleSize}px`;
    circle.style.left = -(rippleSize / 2) + rippleX + 'px';
    circle.style.top = -(rippleSize / 2) + rippleY + 'px';
    circle.classList.add('ripple');

    setTimeout(() => {
      circle.remove();
    }, 400);
  }
}
