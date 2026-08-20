import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractEntityComponent } from '../abstract-entity/abstract-entity.component';
import { BaseService } from '../../core/services/base.service';
import { ColumnSetting, CustomAction } from '../../shared/components/table/utils/utils';
import { TableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingOverlayComponent } from '../../shared/components/loading-overlay/loading-overlay.component';
import { DocumentoService } from '../../core/services/document-service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
     CommonModule, ButtonComponent, LoadingOverlayComponent
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent extends AbstractEntityComponent {
//prueba de lector de remito
  // productos: any[] = [];
  constructor(
    route: ActivatedRoute, private documentoService: DocumentoService,
    router: Router,
    titleService: Title,
    service: BaseService<any>) {
    super(route, router, titleService, service);
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
    this.settings.createExportAction = false;
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


  selectedFile: File | null = null;
  processing = false;

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.selectedFile = input.files[0];
  }
  
  procesarArchivo(): void {

    if (!this.selectedFile) {
      return;
    }

    this.processing = true;

    this.documentoService.procesarArchivo(this.selectedFile)
      .subscribe({
        next: response => {
          console.log('Respuesta de Claude:', response);
          this.processing = false;
        },

        error: error => {
          console.error('Error:', error);
          this.processing = false;
        }
      });
  }
}
