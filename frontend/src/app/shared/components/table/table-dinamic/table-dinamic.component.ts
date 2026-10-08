import { AfterViewInit, Component, computed, effect, ElementRef, HostListener, input, OnDestroy, output, untracked, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnSetting, computeColumnsWidth, TableConfiguration } from '../utils/utils';
import { TablePaginatorComponent } from '../table-paginator/table-paginator.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FormArray, FormGroup } from '@angular/forms';
import { AddConfirmEvent, DeleteConfirmEvent, EditConfirmEvent } from '../utils/events';
import { ToolbarActionsComponent } from '../toolbar-actions/toolbar-actions.component';
import { CheckboxComponent } from '../../checkbox/checkbox.component';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { CommonModule, LocationStrategy } from '@angular/common';
import { TableFormService } from '../services/table-form.service';
import { TableStateService } from '../services/table-state.service';
import { TableDataService } from '../services/table-data.service';
import { validateFormArray } from '../helpers/table-validate';
import { TableInlineService } from '../services/table-inline.service';
import { TableActionService } from '../services/table-action.service';
import { RowIdentityService } from '../services/row-identity-service';
import { ACCIONES, DEFAULT, INLINE, SELECT, TABLE_ACTIONS, TableAction } from '../helpers/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-dinamic',
  templateUrl: './table-dinamic.component.html',
  styleUrl: './table-dinamic.component.scss',
  providers: [TableFormService, TableStateService, TableDataService, TableInlineService, TableActionService, RowIdentityService],
  imports: [CommonModule, ToolbarActionsComponent, MatTableModule, CheckboxComponent, MatSortModule, TableActionsComponent, TableCellComponent, TablePaginatorComponent]
})
export class TableDinamicComponent implements AfterViewInit, OnDestroy {

  source = input<MatTableDataSource<any>>();
  formArray = input<FormArray<FormGroup>>();
  settings = input.required<TableConfiguration>();

  //prueba de filtro
  filterValue = input<string>('');

  navigate = output<any>();
  show = output<any>();
  add = output<any>();
  edit = output<any>();
  delete = output<any>();
  massive = output<any>();
  selectionChange = output<any[]>();

  editConfirm = output<EditConfirmEvent>();
  addConfirm = output<AddConfirmEvent>();
  deleteConfirm = output<DeleteConfirmEvent>();


  protected selection = new SelectionModel<any>(true, []);

  @ViewChild(MatSort, { static: false }) private sort!: MatSort;

  // cambio el paginador por el customizado
  @ViewChild(TablePaginatorComponent, { static: false }) private customPaginator?: TablePaginatorComponent;
  // Usado para renderizar la fila de agrupamiento
  protected dataSource!: MatTableDataSource<any>;
  // private gridCreated = false;

  //Rastrear si usamos FormArray
  private isUsingFormArray: boolean = false; //se pdoria sacar y pasar !!formArray

  private newRow: any | null = null;

  @ViewChild('tableContainer', { static: false }) private tableContainer!: ElementRef<HTMLElement>;

  // expongo estos valores para pasar al table-dinamic
  protected tableMinWidth: string | null = null;
  protected needScroll = false;

  protected errorTable = false;
  protected errorList: string[] = [];

  private actionStrategy!: {
    add: (payload?: any) => void;
    edit: (payload?: any) => void;
    delete: (payload?: any) => void;
    copy: (payload?: any) => void;
  };

  private paginatorSub?: Subscription;

  @HostListener('window:resize') protected onResize(): void { this.updateTableWidth(); }

  constructor(private tableFormService: TableFormService, private tableStateService: TableStateService,
    private tableDataService: TableDataService<any>, private tableInlineService: TableInlineService,
    private tableActionService: TableActionService, private router: Router,
    private locationStrategy: LocationStrategy) {


    this.initEffects();

  }
  private initEffects(): void {
    //se separa en 2 effect porque si hay uno no esta el otro
    effect(() => {
      const source = this.source();
      if (!source) {
        return;
      }
      this.isUsingFormArray = false;

      this.dataSource = this.tableDataService.buildSource(
        source,
        undefined,
        this.dataSource
      );
    });
    // dentro del effect que reconstruye dataSource, o en uno nuevo:
    effect(() => {
      const filter = this.filterValue();
      if (this.dataSource) {
        this.dataSource.filter = filter;
      }
    });
    
    effect(() => {

      const formArray = this.formArray();
      if (!formArray) {
        return;
      }
      this.isUsingFormArray = true;
      this.errorTable = false;
      this.errorList = [];
      const result = validateFormArray(formArray);
      if (!result.valid) {
        console.error('[Table ERROR]', result.errors);
        this.errorTable = true;
        this.errorList = result.errors;
        return;
      }
      this.dataSource = this.tableDataService.buildSource(
        undefined,
        formArray,
        this.dataSource
      );

      //Por qué se agrega untracked? sino se agrega el effect pasa a depender de settings y en este caso se querías que este 
      // effect se ejecutara solo cuando cambie el formArray, no cuando cambie settings.
      // untracked() le dice a Angular: "Leé este signal, pero no lo registres como dependencia de este effect."
      this.tableFormService.initializeFromFormArray({
        formArray,
        columns: untracked(() => this.settings().columns)
      });

    });
    effect(() => {
      this.source();
      this.formArray();
      this.settings();

      this.addColumnAcciones(false);
      this.initStrategy();
    })
  }


  private initStrategy(): void {

    const settings = this.settings();

    if (settings.mode === INLINE) {
      this.actionStrategy = {
        add: (event) => this.handleAddInline(event),
        edit: (row) => this.handleEditInline(row),
        delete: (row) => this.handleDeleteInline(row),
        copy: (row) => this.handleCopyInline(row)
      };
    } else {
      this.actionStrategy = {
        add: (event) => this.add.emit(event),
        edit: (row) => this.edit.emit({ row, datasource: this.dataSource }),
        delete: (row) => this.delete.emit({ row, datasource: this.dataSource }),
        copy: () => {
          throw new Error('Copy action is not implemented in external mode');
        }
      };
    }
  }

  addColumnAcciones(isInAdd: boolean): void {

    const settings = this.settings();

    if (
      !this.columnsKeyIncludes(ACCIONES) &&
      (settings.customActions.length !== 0 ||
        this.hasAnyDefaultAction() ||
        isInAdd)
    ) {

      const columnAccion = new ColumnSetting({
        key: ACCIONES,
        label: '',
        canHide: false,
        visible: true
      });

      settings.columns.unshift(columnAccion);
    }
  }

  private hasAnyDefaultAction(): boolean {

    const settings = this.settings();

    const targetActions: TableAction[] = [
      TABLE_ACTIONS.NAVIGATE,
      TABLE_ACTIONS.DELETE,
      TABLE_ACTIONS.EDIT,
      TABLE_ACTIONS.SHOW
    ];

    return settings.defaultActions.actions.some(action =>
      targetActions.includes(action.name)
    );
  }

  ngAfterViewInit(): void {
    if (!this.dataSource) return;

    this.dataSource.sort = this.sort;

    if (this.settings().pagination?.enabled && this.customPaginator?.instance) {
      this.dataSource.paginator = this.customPaginator.instance;

      this.paginatorSub = this.dataSource.paginator.page.subscribe(() => {
        this.moveNewRowToCurrentPage();
      });
    }

    this.configureSortData();

    setTimeout(() => this.updateTableWidth());
  }
  updateTableWidth(): void {
    const cols = this.settings().columns || [];
    const containerPx = this.tableContainer?.nativeElement?.clientWidth || window.innerWidth;
    // computeColumnsWidth debe devolver { totalPx, needScroll }
    const res = computeColumnsWidth(cols, containerPx);
    this.tableMinWidth = `${res.totalPx}px`;
    this.needScroll = res.needScroll;
  }

  /** Esto se hace porq el matsort no funciona para objetos anidados. Issue #487 */
  public changeSort(event: any): any {
    this.dataSource.sortingDataAccessor = (item, property) => {
      var column = this.settings().columns.find(c => c.key == property)
      if (column?.sortBy != null) {
        return column.sortBy(item);
      } else {
        return item[property];
      }
    };
  }

  //**estos tres metodos se utilizan para poder realizar el ocultamiento de columnas dinamicamente.*/
  /**aca deberia hacer esto si esta habilitado el ocultamiento */
  get visibleColumns(): ColumnSetting[] {
    return this.settings().columns.filter(col => col.visible !== false);
  }

  get columnKeys(): string[] {
    if (this.settings().selection)
      return [SELECT, ...this.visibleColumns.map(c => c.key)];
    else return [...this.visibleColumns.map(c => c.key)];
  }

  onNavigate(row: any): void {
    this.navigate.emit(row);
  }

  onShow(row: any): void {
    this.show.emit(row);
  }

  onEdit(row: any): void {
    this.actionStrategy.edit(row);
  }

  private getNestedValue(obj: any, path: string): any {
    return path
      .split('.')
      .reduce((acc, key) => acc?.[key], obj);
  }
  onOpenSelected(): void {
    // falta definir como se va a visualizar las pestañas
    const config = this.settings().openSelectedConfig;
    if (!config) {
      return;
    }


    this.selection.selected.forEach(row => {
      const id = this.getNestedValue(row, config.idField);


      const urlTree = this.router.createUrlTree([config.route, id]);

      const urlSerializada = this.router.serializeUrl(urlTree);
      const urlFinal = this.locationStrategy.prepareExternalUrl(urlSerializada);


      window.open(urlFinal, '_blank');
    });
  }
  isRowEditing(row: any): boolean {
    return this.tableStateService.isEditing(row);
  }

  handleEditInline(row: any): void {
    this.disableGeneralAction();

    this.tableInlineService.startEdit({
      row,
      columns: this.columns,
      touched: this.settings().touchedOnEditAdd
    });
  }
  onEditConfirm(row: any): void {

    const fg = this.getForm(row);

    if (!fg) {
      return;
    }

    const formArray = this.formArray();

    const result = this.tableActionService.handleEditConfirm({
      row,
      form: fg,
      columns: this.columns,
      formArray,
      isUsingFormArray: this.isUsingFormArray
    });

    if (!result.valid) {
      fg.markAllAsTouched();
      return;
    }

    this.editConfirm.emit({
      row: result.oldRow,
      data: result.data,
      confirm: {
        resolve: (updatedRow) => {
          result.apply(updatedRow);
          this.refreshDataSource();
          this.enableGeneralAction();
        },
        reject: () => fg.markAllAsTouched()
      }
    });
  }

  onCancel(row: any): void {
    const formArray = this.formArray();
    const result = this.tableActionService.handleCancel({
      row,
      data: this.dataSource.data,
      formArray: formArray,
      isUsingFormArray: this.isUsingFormArray
    });

    result.apply();

    this.newRow = result.newRow;
    this.dataSource.data = [...result.data];

    this.removeColumnAcciones();
    this.enableGeneralAction();
  }

  onDelete(row: any): void {
    this.actionStrategy.delete(row);
  }

  handleDeleteInline(row: any): void {
    this.onDeleteConfirm(row);
  }

  onDeleteConfirm(row: any): void {
    const formArray = this.formArray();
    const result = this.tableActionService.handleDeleteConfirm({
      row,
      data: this.dataSource.data,
      formArray: formArray,
      isUsingFormArray: this.isUsingFormArray
    });

    this.deleteConfirm.emit({
      row,
      confirm: {
        resolve: () => {
          this.dataSource.data = result.apply();
        },
        reject: () => { }
      }
    });
  }

  onAdd(event: any): void {
    this.actionStrategy.add(event);
  }

  handleAddInline(event: any): void {

    if (this.tableStateService.hasAdding()) return;

    const settings = this.settings();

    this.disableGeneralAction();
    this.addColumnAcciones(true);

    const { newRow, newData } = this.tableInlineService.addInline({
      data: this.dataSource.data,
      columns: this.columns,
      settings,
      paginator: this.dataSource.paginator
    });

    this.newRow = newRow;
    this.dataSource.data = newData;

    this.tableInlineService.startEdit({
      row: newRow,
      columns: this.columns,
      touched: settings.touchedOnEditAdd
    });
    this.refreshDataSource();
  }
  onAddConfirm(row: any): void {
    const fg = this.getForm(row);
    if (!fg) return;
    const formArray = this.formArray();
    const result = this.tableActionService.handleAddConfirm({
      row,
      form: fg,
      columns: this.columns,
      formArray: formArray,
      isUsingFormArray: this.isUsingFormArray
    });

    if (!result.valid) return;

    this.addConfirm.emit({
      newData: result.newData,
      confirm: {
        resolve: (newRow) => {
          result.apply(newRow);
          this.newRow = null;
          this.refreshDataSource();
        },
        reject: () => fg.markAllAsTouched()
      }
    });

    this.enableGeneralAction();
  }

  removeColumnAcciones(): void {
    const settings = this.settings();
    if (settings.customActions.length == 0 && !this.hasAnyDefaultAction()) {
      const index = settings.columns.findIndex(c => c.key === ACCIONES);
      if (index !== -1) {
        settings.columns.splice(index, 1);
      }
    }
  }

  onCopy(row: any): void {
    this.actionStrategy.copy(row);
  }

  handleCopyInline(row: any): void {
    this.disableGeneralAction();
    const settings = this.settings();
    const { newRow, newData } = this.tableInlineService.copyInline({
      row,
      data: this.dataSource.data,
      columns: this.columns,
      settings: settings
    });

    this.newRow = newRow;
    this.dataSource.data = newData;

    this.tableInlineService.startEdit({
      row: newRow,
      columns: this.columns,
      touched: settings.touchedOnEditAdd
    });

    this.refreshDataSource();
  }

  onMassive(event: any): void {
    this.massive.emit({ actionName: event, selected: this.selection.selected, datasource: this.source() });
  }
  // Verifica si todos los ítems están seleccionados
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Maneja la selección/deselección de todos los ítems
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.selectionChange.emit(this.selection.selected); // Emite los ítems seleccionados
  }

  // Maneja el cambio de selección de un checkbox individual
  onCheckboxChange(row: any): void {
    this.selection.toggle(row);
    this.selectionChange.emit(this.selection.selected); // Emite los ítems seleccionados
  }

  getDefaultGroupColspan(): number {
    const includesSelect = this.columnsKeyIncludes(SELECT);
    const includesAcciones = this.columnsKeyIncludes(ACCIONES);
    if (includesSelect && includesAcciones) {
      return 2;
    }
    return includesSelect || includesAcciones ? 1 : 0;
  }
  getColumnVisible(groupColumns: ColumnSetting[]): number {
    return groupColumns.filter(c => c.visible).length;
  }
  //ayuda a armar los grupos, default si tiene el check y acciones
  // y si el grupo no tiene columnas visibles no se muestra
  get groupedHeaderRowKeys(): string[] {

    const settings = this.settings();

    const hasGroups =
      Array.isArray(settings.headerGroup) &&
      settings.headerGroup.length > 0;

    const hasDefault = this.getDefaultGroupColspan() > 0;

    const defaultKey =
      hasDefault && hasGroups
        ? [DEFAULT]
        : [];

    const groupKeys = hasGroups
      ? settings.headerGroup
        .filter(group => this.getColumnVisible(group.groupColumns) > 0)
        .map(group => group.nameGroup)
      : [];

    return [...defaultKey, ...groupKeys];
  }

  get columns(): ColumnSetting[] {
    return this.settings().columns;
  }

  columnsKeyIncludes(column: string): boolean {
    return this.columnKeys.includes(column);
  }

  disableGeneralAction(): void {
    this.tableActionService.disableGeneralAction(this.settings());
  }

  enableGeneralAction(): void {
    this.tableActionService.enableGeneralAction(this.settings());
  }

  private moveNewRowToCurrentPage(): void {
    if (!this.newRow || !this.dataSource.paginator) return;

    const data = this.dataSource.data.filter(row => row !== this.newRow);
    const startIndex = this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize;

    data.splice(startIndex, 0, this.newRow);

    this.dataSource.data = data;
    this.refreshDataSource();
  }

  configureSortData(): void {
    this.dataSource.sortData = (data: any[], sort: MatSort) => {
      const paginator = this.dataSource.paginator;
      const pageSize = paginator?.pageSize || data.length;
      const pageIndex = paginator?.pageIndex || 0;

      const accessor = this.dataSource.sortingDataAccessor.bind(this.dataSource);

      const newRows = data.filter(d => d.__isNew);
      const normalRows = data.filter(d => !d.__isNew);

      if (sort && sort.active && sort.direction !== '') {
        normalRows.sort((a, b) => {
          const valueA: any = accessor(a, sort.active);
          const valueB: any = accessor(b, sort.active);
          const aIsNull = valueA === null || valueA === undefined;
          const bIsNull = valueB === null || valueB === undefined;

          if (aIsNull && !bIsNull) return -1;
          if (!aIsNull && bIsNull) return 1;
          if (aIsNull && bIsNull) return 0;

          const aVal = valueA instanceof Date ? valueA.getTime() : valueA;
          const bVal = valueB instanceof Date ? valueB.getTime() : valueB;

          if (typeof aVal === 'string' && typeof bVal === 'string') {
            const cmp = aVal.localeCompare(bVal);
            return sort.direction === 'asc' ? cmp : -cmp;
          }
          const cmp = (aVal < bVal ? -1 : aVal > bVal ? 1 : 0);
          return sort.direction === 'asc' ? cmp : -cmp;
        });
      }
      if (newRows.length > 0 && paginator) {
        const startIndex = pageIndex * pageSize;
        const endIndex = startIndex + pageSize;
        const before = normalRows.slice(0, startIndex);
        const currentPage = normalRows.slice(startIndex, endIndex);
        const after = normalRows.slice(endIndex);

        return [...before, ...newRows, ...currentPage, ...after];
      }
      return [...newRows, ...normalRows];
    };
  }

  private refreshDataSource() {
    this.dataSource.data = [...this.dataSource.data];
  }

  getForm(row: any): FormGroup | null {
    return this.tableFormService.getForm(row.__uid) ?? null;
  }

  trackByUid(index: number, row: any): string {
    return row.__uid;
  }

  ngOnDestroy(): void {
    this.paginatorSub?.unsubscribe();
  }
}