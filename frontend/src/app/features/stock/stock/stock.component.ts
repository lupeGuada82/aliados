import { Component, inject } from '@angular/core';
import { AbstractEntityComponent } from '../../abstract-entity/abstract-entity.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TableComponent } from '../../../shared/components/table/table.component';
import { GeneradorQRService } from '../../../core/services/generadorQR.service';
import { BaseService } from '../../../core/services/base.service';
import { ColumnSetting, CustomAction, MassiveAction } from '../../../shared/components/table/utils/utils';
import { LoadingOverlayComponent } from '../../../shared/components/loading-overlay/loading-overlay.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { DocumentoService } from '../../../core/services/document-service';

@Component({
    selector: 'app-stock',
    standalone: true,
    imports: [
        TableComponent, ButtonComponent, LoadingOverlayComponent
    ],
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.scss'
})
export class StockComponent extends AbstractEntityComponent {
    selection: any[];

    constructor(
        route: ActivatedRoute,
        router: Router,
        titleService: Title,
        service: BaseService<any>,
        private generadorQRService: GeneradorQRService
    ) {
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
            }),

            new ColumnSetting({
                key: 'stockMinimo',
                label: 'Stock Minimo',
                isEditable: true,
                isAddable: true,
                //className: 'column-stockMinimo'
            }),
            new ColumnSetting({
                key: 'stockActual',
                label: 'Stock Actual',
                isEditable: false,
                isAddable: true
                //className: 'column-stockActual',
            }),

            new ColumnSetting({
                key: 'stockMaximo',
                label: 'Stock Maximo',
                isEditable: true,
                isAddable: true,

            })
        ];


        this.settings.columns = this.displayedColumns;
        this.settings.editable = true;
        this.settings.createAddAction = true;
        this.settings.createEditAction = true;
        this.settings.createHidenAction = false;
        this.settings.createExportAction = false;
        this.settings.pagination.pageSize = 10;
        var descargarQR = new CustomAction({
            icon: 'generate_QR',
            label: 'Descargar QR',
            action: (row) => this.descargarQR(row)
        })
        this.settings.selection = true;



        this.settings.customActions = [this.createActionsAjustarStock(), descargarQR];
        let actionMassive = new MassiveAction({ name: 'descargarQR', label: 'Descargar QR', condicion: () => this.selection?.length > 0 });
        this.settings.massiveActions.push(actionMassive);

    }

    descargarQR(row: any) {

        this.generadorQRService.generarQR(row);

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

    createActionsAjustarStock(): CustomAction {
        return this.createDetalleStockAction();
    }
    protected override getTitle(): string {
        return 'Gestión de Stock';
    }
    protected override getPath(): string {
        return 'detalleStock/';
    }



    onMassive(event: any) {
        this.generadorQRService.generarQRs(event.selected);
    }

    selected(event: any) {
        this.selection = event;
    }
    cambiarFiltro() {
        // this.loadData();
    }


    atras() {
        window.history.back()
    }

  
}
