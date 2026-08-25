import { Routes } from '@angular/router';


import { InicioComponent } from './features/inicio/inicio.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PageNotFoundComponent } from './not-found.component';
import { ProductoComponent } from './features/producto/producto.component';
import { StockGeneralComponent } from './features/stock/stock-general.component';
import { StockComponent } from './features/stock/stock/stock.component';
import { DetalleStockComponent } from './features/stock/detalle/detalle-stock.component';
import { EgresoStockFormComponent } from './features/stock/egreso-stock-form/egreso-stock-form.component';

export const routes: Routes = [

    {
        path: '',
        component: MainLayoutComponent,
        children: [

            {
                path: '',
                redirectTo: 'inicio',
                pathMatch: 'full'
            },

            {
                path: 'inicio',
                component: InicioComponent
            },

            {
                path: 'productos',
                component: ProductoComponent
            },

            {
                path: 'stock',
                component: StockGeneralComponent,
                children: [
                    {
                        path: '',
                        component: StockComponent
                    },
                    {
                        path: ':codigo',
                        component: DetalleStockComponent
                    }
                ]
            },

            {
                path: 'egresoStock',
                component: EgresoStockFormComponent
            },


        ]
    },

    {
        path: '**',
        component: PageNotFoundComponent
    }

];