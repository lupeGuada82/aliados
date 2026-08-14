import { Component, ViewChild, AfterViewInit, input } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LocatizationService } from '../localization/localization.service';
import { PaginatorConfiguration } from '../utils/utils';


@Component({
  selector: 'table-paginator',
  standalone: true,
  imports: [
    MatPaginatorModule
  ],
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.scss'],
})
export class TablePaginatorComponent implements AfterViewInit {
  length = input<number>(0);
  pagination = input<PaginatorConfiguration>(new PaginatorConfiguration());
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private localizationService: LocatizationService) { }
  ngAfterViewInit(): void {
    this.localizationService.translateMatPaginator(this.paginator, this.pagination().label);
  }

  // Exponer el paginator a componentes padres (ej: para usar con MatTableDataSource)
  get instance(): MatPaginator {
    return this.paginator;
  }

}