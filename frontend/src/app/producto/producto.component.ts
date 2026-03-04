import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractEntityComponent } from '../abstract-entity/abstract-entity.component';
import { DetalleStockService } from '../service/detalleStock.service';
import { ColumnSetting, CustomAction } from '../table/utils/utils';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent extends AbstractEntityComponent {

  productos: any[] = [];
  constructor(
  route: ActivatedRoute,
  router: Router,
  titleService: Title,
  private detalleStockService: DetalleStockService) {
  super(route, router, titleService); 
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

//       new ColumnSetting({
//         key: 'stockMinimo',
//         label: 'Stock Minimo',
//         isEditable: true,
//         isAddable: true,
//         //className: 'column-stockMinimo'
//       }),
//       new ColumnSetting({
//         key: 'stockActual',
//         label: 'Stock Actual',
//         //className: 'column-stockActual',
//       }),

//       new ColumnSetting({
//         key: 'stockMaximo',
//         label: 'Stock Maximo',
//         isEditable: true,
//         isAddable: true,

//       }),
// new ColumnSetting({
//         key: 'qr',
//         label: 'Descargar QR',      
//       })

    ];
    this.settings.columns = this.displayedColumns;
    this.settings.editable = false;
    this.settings.createHidenAction=false;
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
    return [this.createDetalleStockAction() ];
  }
  protected override getTitle(): string {
    return 'Productos';
  }
  protected override getEntityPath(): string {
    return 'producto';
  }
  protected override loadData() {
  this.detalleStockService.getAll('producto').subscribe({
    next: (productos) => {
      this.data = new MatTableDataSource(productos);
      this.createTable();
    },
    error: (err) => {
      console.error('Error cargando stock desde backend', err);
    }
  });
}

//   onAddConfirm(event) {
//     let data = event.newData;
//     this.detalleStockService.createDetalleStock(data).subscribe({
//     next: (response) => {
//       event.confirm.resolve(response);
//     },
//     error: (err) => {
//       console.error('Error creando detalleStock', err);
//       event.confirm.reject(); 
//     }
//    });
    
//   }

//  onEditConfirm(event) {
   
//     let data = event.data;
//     this.detalleStockService.editDetalleStock(data).subscribe({
//     next: (response) => {
//       event.confirm.resolve(response);
//     },
//     error: (err) => {
//       console.error('Error editando detalleStock', err);
//       event.confirm.reject(); 
//     }
//    });
  
//   }

  cambiarFiltro() {
    // this.loadData();
  }

 
  atras() {
    window.history.back()
  }

}
