import { Component } from '@angular/core';
import { AbstractEntityComponent } from '../../abstract-entity/abstract-entity.component';
import { ColumnSetting, CustomAction } from '../../table/utils/utils';
import { stockProductos } from '../../data/stock-data';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent extends AbstractEntityComponent {



  createTable() {
    this.displayedColumns = [
      new ColumnSetting({
        key: 'codigo',
        label: 'Codigo',
        cellClass: 'column-codigo',
        isAddable: true
      }),
      new ColumnSetting({
        key: 'nombre',
        label: 'Nombre',
        cellClass: 'column-nombre',
        isAddable: true,
        isEditable: true
      }),

      new ColumnSetting({
        key: 'stockMinimo',
        label: 'Stock Minimo',
        isEditable: true,
        isAddable: true,
        className: 'column-stockMinimo'
      }),
      new ColumnSetting({
        key: 'stockActual',
        label: 'Stock Actual',
        className: 'column-stockActual',
      }),

      new ColumnSetting({
        key: 'stockMaximo',
        label: 'Stock Maximo',
        isEditable: true,
        isAddable: true,

      }),
new ColumnSetting({
        key: 'qr',
        label: 'Descargar QR',      
      })

    ];
    this.settings.columns = this.displayedColumns;
    this.settings.editable = true;
    this.settings.createHidenAction=false;
    this.settings.createAddAction = true;
    this.settings.createEditAction = true;
    this.settings.pagination.pageSize = 10;
    this.settings.createExportAction=false

    this.settings.customActions = this.createActionsAjustarStock();
  

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
    return [this.createDetalleStockAction() ];
  }
  protected override getTitle(): string {
    return 'Gestión de Stock';
  }
  protected override getEntityPath(): string {
    return 'stock';
  }
  protected override loadData() {
            this.data = stockProductos;
            this.createTable();
        
  }

  onAddConfirm(event) {
    let data = event.newData;
    event.confirm.resolve(data);
  }

 onEditConfirm(event) {
   
    event.confirm.resolve(event.data);
  
  }

  cambiarFiltro() {
    // this.loadData();
  }

 
  atras() {
    window.history.back()
  }

}
