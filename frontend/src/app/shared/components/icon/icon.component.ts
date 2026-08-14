import { Component, Input, OnChanges, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnChanges {

  name= input.required<string>();

  size= input<number>(24);

  svg: SafeHtml = '';

  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  ngOnChanges(): void {
    this.loadSvg();
  }

  private loadSvg(): void {
    const fileName = this.name().replace(/-/g, '_');

    this.http
      .get(`/icons/${fileName}.svg`, {
        responseType: 'text'
      })
      .subscribe(svg => {

        svg = svg
          .replace(/width="[^"]*"/gi, 'width="100%"')
          .replace(/height="[^"]*"/gi, 'height="100%"')
          .replace(/fill="[^"]*"/gi, 'fill="currentColor"')
          .replace(/stroke="[^"]*"/gi, 'stroke="currentColor"');

        this.svg = this.sanitizer.bypassSecurityTrustHtml(svg);
      });
  }
}