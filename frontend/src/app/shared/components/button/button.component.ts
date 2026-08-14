import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconComponent } from '../icon/icon.component';
import { ButtonType, ButtonVariant } from '../../types/button.types';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  imports: [CommonModule, MatTooltipModule, IconComponent]
})
export class ButtonComponent {

  variant = input<ButtonVariant>('primary');

  icon = input<string>();

  type = input<ButtonType>('button');

  disabled = input(false);

  tooltip = input<string>('');

  tooltipClass = input<string>('');

}