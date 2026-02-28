import { Component, Input, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LocatizationService } from '../localization/localization.service';
import { PaginatorConfiguration } from '../utils/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'table-paginator',
  standalone: true,
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss'],
  imports: [CommonModule, MatPaginatorModule]
})
export class TablePaginatorComponent implements AfterViewInit {
  @Input() length = 0;
  @Input() pagination = new PaginatorConfiguration();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private localizationService: LocatizationService) { }
  ngAfterViewInit(): void {
    this.localizationService.translateMatPaginator(this.paginator, this.pagination.label);
  }

  // Exponer el paginator a componentes padres (ej: para usar con MatTableDataSource)
  get instance(): MatPaginator {
    return this.paginator;
  }

}