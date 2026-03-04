import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './not-found.component';
import { InicioComponent } from './inicio/inicio.component';
import { StockComponent } from './stock/stock/stock.component';
import { StockGeneralComponent } from './stock/stock-general.component';
import { DetalleStockComponent } from './stock/detalle/detalle-stock.component';
import { EgresoStockFormComponent } from './stock/egreso-stock-form/egreso-stock-form.component';
import { ProductoComponent } from './producto/producto.component';

const appRoutes: Routes = [
  { path: 'home', component: InicioComponent },
   { path: 'productos', component: ProductoComponent},
  {
    path: 'stock', component: StockGeneralComponent, children: [
      { path: '', component: StockComponent },
      { path: ':codigo', component: DetalleStockComponent },
    ]
  },
 { path: 'egresoStock', component: EgresoStockFormComponent },
{ path: 'consultaEmpleados', component: EgresoStockFormComponent },
{ path: 'consultaEmpleados', component: EgresoStockFormComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' }, // opción: default
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    useHash: true,
    enableTracing: false, // <-- debugging purposes only
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: [
    //AuthService,
  ]
})
export class AppRoutingModule { }
