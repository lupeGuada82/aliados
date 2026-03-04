import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloService } from './hello/hello.service';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from "@angular/material/tooltip";
import { PageNotFoundComponent } from './not-found.component';
import { InicioComponent } from './inicio/inicio.component';
import { MatListModule } from '@angular/material/list';
import { StockComponent } from './stock/stock/stock.component';
import { TableComponent } from './table/table.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
// import { PipeModule } from './pipes/pipe.module';
// import { IMaskModule } from 'angular-imask';
import { MatChipsModule } from '@angular/material/chips';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableModule } from './table/table.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StockGeneralComponent } from './stock/stock-general.component';
import { DetalleStockComponent } from './stock/detalle/detalle-stock.component';
import { EgresoStockFormComponent } from './stock/egreso-stock-form/egreso-stock-form.component';
import { GeneradorQRService } from './service/generadorQR.service';
import { MultiSelectComponent } from './filter-select/multi-select.component';
import { SelectAutocompleteSearchComponent } from './mat-select-autocomplete-search/select-autocomplete.component';
import { SelectAutocompleteChipComponent } from './mat-select-autocomplete-chips/select-autocomplete-chips.component';
import { ProductoComponent } from './producto/producto.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PageNotFoundComponent,
    InicioComponent,
    StockComponent,
    StockGeneralComponent,
    DetalleStockComponent,
    EgresoStockFormComponent,
    MultiSelectComponent,
    SelectAutocompleteSearchComponent,
    SelectAutocompleteChipComponent,
    ProductoComponent

  ],
  imports: [
    BrowserModule,
    MatListModule,
    HttpClientModule,
    BlockUIModule.forRoot({
      message: 'Cargando...'
    }),
    BlockUIHttpModule.forRoot(),
    AppRoutingModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
   BrowserAnimationsModule,
    CommonModule,
    MatRippleModule,
    MatTabsModule,
    MatDatepickerModule,
    MatCheckboxModule,
   // PipeModule,
    FormsModule,
    MatBadgeModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    //IMaskModule,
    MatNativeDateModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatChipsModule,
    DragDropModule,
    TableComponent,
    TableModule,  BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatMenuModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatRippleModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    AppRoutingModule,
    MatCheckboxModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    // IMaskModule,
    MatNativeDateModule,
    // ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatInputModule,
    MatSelectModule,
    MatMenuModule,


  ],
  providers: [HelloService,GeneradorQRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
