import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../../../shared/components/table/table.component';
import { ColumnSetting, TableConfiguration } from '../../../shared/components/table/utils/utils';
import { DetalleStockService } from '../../../core/services/detalleStock.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LoadingOverlayComponent } from '../../../shared/components/loading-overlay/loading-overlay.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'detalle-stock',
    imports: [
        TableComponent, ButtonComponent, LoadingOverlayComponent, MatTabsModule,
    ],
    templateUrl: './detalle-stock.component.html',
    styleUrl: './detalle-stock.component.scss'
})
export class DetalleStockComponent implements OnInit {
    currentSelectedProd: any;
    originalSelectedProd: any;

    ingresosDeStock: MatTableDataSource<any>;
    settingsIngresos = new TableConfiguration();

    egresosDeStock: MatTableDataSource<any>;
    settingsEgresos = new TableConfiguration();


    constructor(private route: ActivatedRoute, public router: Router,
        private detalleStockService: DetalleStockService) { }

    ngOnInit() {

        this.route.params.subscribe(param => {

            const codigo = Number(param['codigo']);

            this.detalleStockService.getProductoByCodigo(codigo).subscribe({
                next: (producto) => {

                    if (producto) {
                        this.inicializarStock(producto);
                    } else {
                        console.log('Producto no encontrado');
                    }
                },
                error: (err) => {
                    console.error('Error obteniendo productos', err);
                }

            });
        });
    }

    inicializarStock(producto: { codigo: number; nombre: string; stockMinimo: number; stockActual: number; stockMaximo: number; }) {
        this.originalSelectedProd = producto;
        this.currentSelectedProd = this.copyElement(producto);
        this.loadDataMovimientos();
        this.inicializarTablaIngresosStock();
        this.inicializarTableEgresosStock();

    }
    inicializarTableEgresosStock() {
        const displayedColumns = [

            new ColumnSetting({
                key: 'fecha',
                label: 'Fecha',
                // className: 'column-fecha'
            }),

            new ColumnSetting({
                key: 'cantidad',
                label: 'Cantidad',
                //className: 'column-cantidad'
            }),
            new ColumnSetting({
                key: 'responsable',
                label: 'Responsable',
                //className: 'column-responsable',
            }),

            new ColumnSetting({
                key: 'solicitante',
                label: 'Solicito'

            }),
            new ColumnSetting({
                key: 'estado',
                label: 'Estado',
                //className: 'column-estado',

            }),
            new ColumnSetting({
                key: 'observacion',
                label: 'Observacion',
                // className: 'column-observacion',
            })

        ];
        this.settingsEgresos.columns = displayedColumns;
        this.settingsEgresos.createHidenAction = false;
        this.settingsEgresos.editable = true;
        this.settingsEgresos.createEditAction = true;
        // this.settingsEgresos.createAddAction = true;
        this.settingsEgresos.createExportAction = false;
        this.settingsEgresos.pagination.pageSize = 10;
        //esto se hace asi para poder probar el formulario que luego se realiza en QR
        // this.settingsEgresos.customActions = this.createActionEgresoStock();

    }

    // createActionEgresoStock(): CustomAction[] {
    //   return [new CustomAction({
    //     icon: 'format_list_bulleted_add',
    //     label: 'Egreso Stock',
    //     action: (row) => this.egresoStock(row)
    //   })];
    // }
    // egresoStock(row: any): void {
    //   console.log('Navegando a egreso de stock para el producto: ', row);
    //   this.router.navigate(["/egresoStock", this.currentSelectedProd.codigo]);
    // }

    loadDataMovimientos() {

        this.detalleStockService.getIngresos(this.currentSelectedProd.codigo).subscribe((datos) => {
            this.ingresosDeStock = new MatTableDataSource(datos);
            console.log(this.ingresosDeStock);

        });
        //this.ingresosDeStock = this.currentSelectedProd.modificaciones.filter(m => m.tipo === 'INGRESO');

        //TODO los egresos de stock se deberían cargar solamente cuando se va a la solapa de egresos
        this.detalleStockService.getEngresos(this.currentSelectedProd.codigo).subscribe((datos) => {
            this.egresosDeStock = new MatTableDataSource(datos);
            console.log(this.ingresosDeStock);

        });
        // this.egresosDeStock = this.currentSelectedProd.modificaciones.filter(m => m.tipo === 'DESCUENTO');
    }

    inicializarTablaIngresosStock() {
        const displayedColumns = [

            new ColumnSetting({
                key: 'fecha',
                label: 'Fecha',
                isEditable: false,
                isAddable: false,
                //  className: 'column-fecha'
            }),

            new ColumnSetting({
                key: 'cantidad',
                label: 'Cantidad',
                isEditable: true,
                isAddable: true,
                // className: 'column-cantidad'
            }),
            new ColumnSetting({
                key: 'observacion',
                label: 'Observacion',
                isEditable: true,
                isAddable: true
                //  className: 'column-observacion',
            }),

            new ColumnSetting({
                key: 'usuario',
                label: 'Usuario',
                isEditable: false,
                isAddable: false

            }),
            new ColumnSetting({
                key: 'estado',
                label: 'Estado',
                //className: 'column-estado',

            })

        ];
        this.settingsIngresos.columns = displayedColumns;
        this.settingsIngresos.editable = true;
        this.settingsIngresos.createHidenAction = false;
        this.settingsIngresos.createAddAction = true;
        this.settingsIngresos.createEditAction = true;
        this.settingsIngresos.createExportAction = false;
        this.settingsIngresos.pagination.pageSize = 10;


    }
    copyElement(producto: any): any {
        return JSON.parse(JSON.stringify(producto));
    }

    atras() {
        window.history.back()
    }
    //estas acciones de los botones lue se implementan con servicios que van al server
    onAddConfirm(event) {
        //let data = event.newData;
        //event.confirm.resolve(data);
        let newData = event.newData;
        this.detalleStockService.nuevoIngreso(this.currentSelectedProd.codigo, newData).subscribe((data) => {
            event.confirm.resolve(data);
        });
    }

    onEditConfirm(event) {

        event.confirm.resolve(event.data);


    }



}
