import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

export interface Presupuesto {
  numero: string;
  cliente: string;
  descripcion: string;
  fecha: string;
  estado: 'Pendiente' | 'Aprobado' | 'Rechazado';
  pdfUrl: string;
  imagenes: string[];
}

@Component({
  selector: 'app-presupuestos',
  standalone: true,
  imports: [CommonModule, CardComponent, SectionTitleComponent],
  templateUrl: './presupuestos.component.html',
  styleUrl: './presupuestos.component.scss'
})
export class PresupuestosComponent {
  presupuestos: Presupuesto[] = [
    {
      numero: 'PRES-001',
      cliente: 'Cliente Demo 1',
      descripcion: 'Presupuesto base',
      fecha: '2026-10-05',
      estado: 'Pendiente',
      pdfUrl: 'assets/presupuestos/presupuesto-001.pdf',
      imagenes: [
        'assets/presupuestos/presupuesto-001-1.jpg',
        'assets/presupuestos/presupuesto-001-2.jpg'
      ]
    },
    {
      numero: 'PRES-002',
      cliente: 'Cliente Demo 2',
      descripcion: 'Servicio técnico',
      fecha: '2026-10-05',
      estado: 'Aprobado',
      pdfUrl: 'assets/presupuestos/presupuesto-002.pdf',
      imagenes: [
        'assets/presupuestos/presupuesto-002-1.jpg'
      ]
    },
    {
      numero: 'PRES-003',
      cliente: 'Cliente Demo 3',
      descripcion: 'Materiales varios',
      fecha: '2026-10-05',
      estado: 'Rechazado',
      pdfUrl: 'assets/presupuestos/presupuesto-003.pdf',
      imagenes: []
    }
  ];
}
