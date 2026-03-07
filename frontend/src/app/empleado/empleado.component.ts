import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractEntityComponent } from '../abstract-entity/abstract-entity.component';
import { ColumnSetting } from '../table/utils/utils';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from '../service/base.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.scss'
})
export class EmpleadoComponent extends AbstractEntityComponent {


  constructor(route: ActivatedRoute, router: Router, titleService: Title, service: BaseService<any>) {
    super(route, router, titleService, service);
  }
  protected override createTable(): void {
    this.displayedColumns = [

      new ColumnSetting({
        key: 'nombre',
        label: 'Nombre',
        isAddable: true,
        isEditable: true
      }),
      new ColumnSetting({
        key: 'cargo',
        label: 'Cargo',
        isAddable: true,
        isEditable: true
      }),



    ];
    this.settings.columns = this.displayedColumns;
    this.settings.editable = true;
    this.settings.createHidenAction = false;
    this.settings.createAddAction = true;
    this.settings.createEditAction = true;
    this.settings.pagination.pageSize = 10;
    this.settings.createExportAction = false;
  }
  protected override getTitle(): string {
    return 'Empleados';
  }
  protected override getPath(): string {
    return 'empleado/';
  }

  atras() {
    window.history.back()
  }

}
