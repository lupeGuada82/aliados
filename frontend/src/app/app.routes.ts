import { Routes } from '@angular/router';


import { InicioComponent } from './features/inicio/inicio.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PageNotFoundComponent } from './not-found.component';
import { PresupuestosComponent } from './features/presupuestos/presupuestos.component';

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
                path: 'presupuestos',
                component: PresupuestosComponent
            },

            // {
            //     path: 'empleado',
            //     component: EgresoStockFormComponent
            // },


        ]
    },

    {
        path: '**',
        component: PageNotFoundComponent
    }

];