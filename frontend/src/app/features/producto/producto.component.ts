import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractEntityComponent } from '../abstract-entity/abstract-entity.component';
import { BaseService } from '../../core/services/base.service';
import { ColumnSetting, CustomAction, TableConfiguration } from '../../shared/components/table/utils/utils';
import { TableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { LoadingOverlayComponent } from '../../shared/components/loading-overlay/loading-overlay.component';
import { DocumentoService } from '../../core/services/document-service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, TableComponent
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements OnInit {
  displayedColumns: any[] = [];
  data: MatTableDataSource<any> | undefined;
  settings = new TableConfiguration();

  selectedFile: File | null = null;
  processing = false;
  //prueba de lector de remito
  // productos: any[] = [];
  constructor(
    route: ActivatedRoute, private documentoService: DocumentoService,
    router: Router,
    private titleService: Title) {
  }

  createTable() {
    this.displayedColumns = [
      new ColumnSetting({
        key: 'cantidad',
        label: 'Cantidad',
        // cellClass: 'column-codigo',
      }),
      new ColumnSetting({
        key: 'unidad',
        label: 'Unidad',
        // cellClass: 'column-nombre',
      }),
      new ColumnSetting({
        key: 'descripcion',
        label: 'Descripción'
      }),
      new ColumnSetting({
        key: 'stock',
        label: 'Stock'
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
    var imputarStock = new CustomAction({
      icon: 'generate_QR',
      label: 'Imputar Stock',
      action: (row) => this.imputarStock(row)
    })
    this.settings.customActions = [imputarStock];

  }

  imputarStock(row: any) {
    //this.generadorQRService.generarQR(row);
  }
  ngOnInit(): void {
    this.titleService.setTitle(this.getTitle());
  }

  protected getTitle(): string {
    return 'Cargar Stock';
  }
  // protected getPath(): string {
  //   return 'producto/';
  // }


  // protected loadData() {
  //   this.service.getAll(this.getPath()).subscribe((datos: any[]) => {
  //     this.data = new MatTableDataSource(datos);
  //     console.log(this.data);
  //     this.createTable();
  //   }
  //   );
  // }

  // cambiarFiltro() {
  //   // this.loadData();
  // }


  atras() {
    window.history.back()
  }




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
        next: datos => {
          this.data = new MatTableDataSource(datos);
          console.log(datos)
          this.createTable();
          this.processing = false;
        },
        error: error => {
          console.error('Error:', error);
          this.processing = false;
        }
      });
  }
}
