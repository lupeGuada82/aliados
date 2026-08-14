import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDirectivaMessage]'
})
export class MessageDirective {

  @Input() tipo: string;

  constructor(private el: ElementRef) {
    this.colorIcono();
  }

  colorIcono() {
    setTimeout(() => {
      const el = this.el.nativeElement;

      el.classList.add('iconoClase'); // círculo
      el.classList.add('material-symbols-outlined');

      switch (this.tipo) {
        case "error":
          el.style.backgroundColor = 'var(--status-danger)';
          el.innerText = 'close';  // la X
          break;
        case "exito":
          el.style.backgroundColor = 'var(--status-success)';
          el.innerText = 'check';
          break;
        case "atencion":
          el.style.backgroundColor = 'var(--status-warning)';
          el.innerText = 'warning';
          break;
      }

      el.style.fontVariationSettings = "'wght' 700"; 
    }, 50);

  }





}
