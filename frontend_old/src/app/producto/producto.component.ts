import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractEntityComponent } from '../abstract-entity/abstract-entity.component';
import { ColumnSetting, CustomAction } from '../table/utils/utils';
import { MatTableDataSource } from '@angular/material/table';
import { BaseService } from '../service/base.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent extends AbstractEntityComponent {

  // productos: any[] = [];
  constructor(
    route: ActivatedRoute,
    router: Router,
    titleService: Title,
     service: BaseService<any>) {
    super(route, router, titleService,service);
  }

  createTable() {
    this.displayedColumns = [
      new ColumnSetting({
        key: 'codigo',
        label: 'Codigo',
        // cellClass: 'column-codigo',
        isAddable: true
      }),
      new ColumnSetting({
        key: 'nombre',
        label: 'Nombre',
        // cellClass: 'column-nombre',
        isAddable: true,
        isEditable: true
      })



    ];
    this.settings.columns = this.displayedColumns;
    this.settings.editable = false;
    this.settings.createHidenAction = false;
    // this.settings.createAddAction = true;
    // this.settings.createEditAction = true;
    this.settings.pagination.pageSize = 10;
    //this.settings.createExportAction=false;

    // this.settings.customActions = this.createActionsAjustarStock();


  }


  protected createDetalleStockAction() {
    return new CustomAction({
      icon: 'format_list_bulleted_add',
      label: 'Detalle Stock',
      action: (row) => this.detalleStock(row)
    });
  }
  detalleStock(row: any): void {
    this.router.navigate(["/stock", row.codigo]);
  }

  createActionsAjustarStock(): CustomAction[] {
    return [this.createDetalleStockAction()];
  }
  protected override getTitle(): string {
    return 'Productos';
  }
  protected override getPath(): string {
    return 'producto/';
  }
  



  cambiarFiltro() {
    // this.loadData();
  }


  atras() {
    window.history.back()
  }

}
