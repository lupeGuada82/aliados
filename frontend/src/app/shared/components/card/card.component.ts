import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CardVariant } from '../../types/card.types';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [CommonModule,
    IconComponent
  ],
})
export class CardComponent {

  title = input<string>();

  icon = input<string>();

  variant = input<CardVariant>(CardVariant.DEFAULT);

}