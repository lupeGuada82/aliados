import { Component, input, Input } from '@angular/core';
import { Alignment } from '../../types/alignment.types';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.scss'
})
export class SectionTitleComponent {


  eyebrow = input<string | undefined>();
  title = input.required<string>();
  description = input<string | undefined>();
  align = input(Alignment.LEFT);


}