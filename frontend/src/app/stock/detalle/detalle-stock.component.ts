import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stockProductos } from '../../data/stock-data';
import { ColumnSetting, CustomAction, TableConfiguration } from '../../table/utils/utils';
import { GeneradorQRService } from '../../service/generadorQR.service';

@Component({
  selector: 'detalle-stock',
  templateUrl: './detalle-stock.component.html',
  styleUrl: './detalle-stock.component.scss'
})
export class DetalleStockComponent implements OnInit {
  currentSelectedProd: any;
  originalSelectedProd: any;

  ingresosDeStock: any[] = [];
  settingsIngresos = new TableConfiguration();

  egresosDeStock: any[] = [];
  settingsEgresos = new TableConfiguration();


  constructor(private route: ActivatedRoute, public router: Router, private generadorQRService: GeneradorQRService) { }

  ngOnInit() {

    this.route.params.subscribe(prodId => {
      const codigo = Number(prodId['codigo']);
      const producto = stockProductos.find(p => p.codigo === codigo

      );
      if (producto) {
        this.inicializarStock(producto);
      } else {
        console.log('Producto no encontrado');
      }

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
        key: 'solicito',
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
    this.settingsEgresos.createAddAction = true;
    this.settingsEgresos.createExportAction = false;
    this.settingsEgresos.pagination.pageSize = 10;
    //esto se hace asi para poder probar el formulario que luego se realiza en QR
    this.settingsEgresos.customActions = this.createActionEgresoStock();

  }

  createActionEgresoStock(): CustomAction[] {
    return [new CustomAction({
      icon: 'format_list_bulleted_add',
      label: 'Egreso Stock',
      action: (row) => this.egresoStock(row)
    })];
  }
  egresoStock(row: any): void {
    console.log('Navegando a egreso de stock para el producto: ', row);
    this.router.navigate(["/egresoStock", this.currentSelectedProd.codigo]);
  }
  loadDataMovimientos() {
    //aca tenemos que quedarnos con todos los productos que son de tipo
    this.ingresosDeStock = this.currentSelectedProd.modificaciones.filter(m => m.tipo === 'INGRESO');
    this.egresosDeStock = this.currentSelectedProd.modificaciones.filter(m => m.tipo === 'DESCUENTO');
  }
  inicializarTablaIngresosStock() {
    const displayedColumns = [

      new ColumnSetting({
        key: 'fecha',
        label: 'Fecha',
      //  className: 'column-fecha'
      }),

      new ColumnSetting({
        key: 'cantidad',
        label: 'Cantidad',
       // className: 'column-cantidad'
      }),
      new ColumnSetting({
        key: 'observacion',
        label: 'Observacion',
      //  className: 'column-observacion',
      }),

      new ColumnSetting({
        key: 'usuario',
        label: 'Usuario'

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
    let data = event.newData;
    event.confirm.resolve(data);
  }

  onEditConfirm(event) {

    event.confirm.resolve(event.data);

  }
  descargarPdf() {
    // console.log('Descargando PDF de egreso de stock para el producto: ', this.currentSelectedProd);
    // this.generadorQRService.generarQR(this.currentSelectedProd.codigo);
    this.generadorQRService.generarQR(this.currentSelectedProd.codigo);
    // .subscribe({
    //   next: response => this.generadorQRService.windowOpen(response, this.currentSelectedProd.codigo),
    //   error: err => console.error('Error descargando PDF', err)
    // });

  }


}
