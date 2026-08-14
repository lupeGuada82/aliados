import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss'
})
export class LoadingOverlayComponent {

  message = input<string>('Cargando...');

}