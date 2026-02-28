import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnSetting, computeColumnsWidth, TableConfiguration } from '../utils/utils';
import { TablePaginatorComponent } from '../table-paginator/table-paginator.component';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { AddConfirmEvent, DeleteConfirmEvent, EditConfirmEvent } from '../utils/events';
import { ToolbarActionsComponent } from '../toolbar-actions/toolbar-actions.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TableActionsComponent } from '../table-actions/table-actions.component';
import { TableCellComponent } from '../table-cell/table-cell.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-dinamic',
  standalone: true,
  templateUrl: './table-dinamic.component.html',
  styleUrl: './table-dinamic.component.scss',
  imports: [CommonModule, ToolbarActionsComponent, MatTableModule, MatCheckboxModule, MatSortModule, TableActionsComponent, TableCellComponent, TablePaginatorComponent]
})
export class TableDinamicComponent implements AfterViewInit, OnChanges {

  @Input() source: any;
  @Input() settings = new TableConfiguration();


  @Output() navigate = new EventEmitter<any>();
  @Output() show = new EventEmitter<any>();
  @Output() add = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() massive = new EventEmitter<any>();

  @Output() editConfirm = new EventEmitter<EditConfirmEvent>();
  @Output() addConfirm = new EventEmitter<AddConfirmEvent>();
  @Output() deleteConfirm = new EventEmitter<DeleteConfirmEvent>();


  selection = new SelectionModel<any>(true, []);
  @Output() selectionChange = new EventEmitter<any[]>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  // cambio el paginador por el customizado
  @ViewChild(TablePaginatorComponent, { static: false }) customPaginator!: TablePaginatorComponent;
  // Usado para renderizar la fila de agrupamiento
  dataSource;
  gridCreated = false;

  editingRows = new Set<any>();
  originalRows = new Map<any, any>();
  newRow: any | null = null;
  formGroups = new Map<any, FormGroup>();
  @ViewChild('tableContainer', { static: false }) tableContainer!: ElementRef<HTMLElement>;
  @ViewChild('tableResponsive', { static: false }) tableResponsive!: ElementRef<HTMLElement>;
  @ViewChild('tableEl', { static: false }) tableEl!: ElementRef<HTMLElement>;

  // expongo estos valores para pasar al table-dinamic
  tableMinWidth: string | null = null;
  needScroll = false;

  @HostListener('window:resize') onResize() { this.updateTableWidth(); }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridCreated) {
      if (changes['source']) {
        this.dataSource = this.updateSource(this.dataSource);
      }
    } else {
      this.gridCreated = true;
      this.dataSource = this.prepareSource();
    }
    if (!this.columnsKeyIncludes('acciones') && (this.settings.customActions.length !== 0 || this.findAccion())) {
      const accion = new ColumnSetting({
        key: 'acciones'
        , label: '',
        canHide: false,
        visible: true
      });
      this.settings.columns.unshift(accion);
    }
  }


  updateSource(dataSource: any) {
    if (this.source instanceof MatTableDataSource) {
      this.source.paginator = dataSource.paginator;
      this.source.sort = dataSource.sort;
      dataSource = this.source;
    }
    else if (this.source instanceof Array)
      dataSource.data = this.source;
    else
      dataSource.data = [];
    if (this.settings.editable) {
      this.formGroups = new Map<any, FormGroup>();
      this.dataSource.data.forEach(r => this.createForm(r));
    }
    return dataSource;
  }
  prepareSource() {
    let s = new MatTableDataSource();
    if (this.source instanceof MatTableDataSource)
      s = this.source;
    else if (this.source instanceof Array)
      s = new MatTableDataSource(this.source);
    return s;
  }

  private findAccion(): boolean {
    let action = undefined
    action = this.settings.defaultActions.actions.find(action => ['navegar', 'delete', 'editar', 'show'].includes(action.name));
    return action;
  }


  ngAfterViewInit() {
    // Configuramos el sort y el paginator
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.customPaginator.instance;
    this.dataSource.paginator.page.subscribe(() => {
      this.moveNewRowToCurrentPage();
    });
    this.configureSortData();

    setTimeout(() => this.updateTableWidth());
  }
  updateTableWidth() {
    const cols = this.settings?.columns || [];
    const containerPx = this.tableContainer?.nativeElement?.clientWidth || window.innerWidth;
    // computeColumnsWidth debe devolver { totalPx, needScroll }
    const res = computeColumnsWidth(cols, containerPx);
    this.tableMinWidth = `${res.totalPx}px`;
    this.needScroll = res.needScroll;
  }

  createForm(row: any) {
    const group: any = {};

    this.columns.forEach(col => {
      if (col.key !== 'acciones')
        group[col.key] = new FormControl(row[col.key], col.editor?.validators || []);
    });

    const groupValidators: ValidatorFn[] = this.columns.flatMap(c => c.editor?.groupValidators || []);

    const fg = new FormGroup(group, { validators: groupValidators });
    this.formGroups.set(row, fg);
    return fg;
  }

  /** Esto se hace porq el matsort no funciona para objetos anidados. Issue #487 */
  public changeSort(event: any) {
    this.dataSource.sortingDataAccessor = (item, property) => {
      var column = this.settings.columns.find(c => c.key == property)
      if (column?.sortBy != null) {
        return column.sortBy(item);
      } else {
        return item[property];
      }
    };
  }

  //**estos tres metodos se utilizan para poder realizar el ocultamiento de columnas dinamicamente.*/
  /**aca deberia hacer esto si esta habilitado el ocultamiento */
  get visibleColumns(): any[] {
    return this.settings.columns.filter(col => col.visible !== false);
  }

  get columnKeys(): string[] {
    if (this.settings.selection)
      return ['select', ...this.visibleColumns.map(c => c.key)];
    else return [...this.visibleColumns.map(c => c.key)];
  }

  onNavigate(row) {
    this.navigate.emit(row);
  }

  onShow(row) {
    this.show.emit(row);
  }
  onEdit(row) {
    if (this.settings.mode === 'inline') {
      this.editRow(row);
    }
    else if (this.settings.mode === 'external') {
      this.edit.emit({ row: row, datasource: this.dataSource });
    }
  }
  editRow(row: any) {
    this.disableGeneralAction();
    if (!this.editingRows.has(row)) {
      this.originalRows.set(row, { ...row });
      this.editingRows.add(row);
      if (!this.formGroups.has(row)) this.createForm(row);
      this.formGroups.get(row).markAllAsTouched();
    }
  }

  onEditConfirm(row) {
    const fg = this.formGroups.get(row);
    const data = structuredClone(row);
    const oldRow = structuredClone(row);
    if (!fg) return;
    if (fg.valid) {
      Object.assign(data, fg.value);
      this.editConfirm.emit({
        row: oldRow,
        data,
        confirm: {
          resolve: (updatedRow: any) => {
            Object.keys(updatedRow).forEach(key => row[key] = updatedRow[key]);
            this.editingRows.delete(row);
            this.originalRows.delete(row);
            this.dataSource._updateChangeSubscription();
            this.enableGeneralAction();
          },
          reject: () => {
            fg.markAllAsTouched();
          }
        }
      });
    } else {
      fg.markAllAsTouched();
    }
    //   this.enableGeneralAction();
  }


  onCancel(row: any) {
    if (row.__isNew) {
      this.dataSource.data = this.dataSource.data.filter(r => r !== row);
      this.formGroups.delete(row);
      this.newRow = null;
    } else {
      const original = this.originalRows.get(row);
      if (original) Object.assign(row, original);
      const fg = this.formGroups.get(row);

      if (fg && fg instanceof FormGroup && Object.keys(fg.controls).length > 0) {
        fg.patchValue(
          Object.fromEntries(
            Object.keys(fg.controls)
              .map(k => [k, original?.[k] ?? null])
          )
        );
      }
    }
    this.editingRows.delete(row);
    this.originalRows.delete(row);
    this.enableGeneralAction();
    this.dataSource._updateChangeSubscription();
  }

  onDelete(row) {
    if (this.settings.mode === 'inline') {
      this.onDeleteConfirm(row);
    }
    else if (this.settings.mode === 'external') {
      this.delete.emit({ row: row, datasource: this.dataSource });
    }
  }

  onDeleteConfirm(row: any) {
    this.deleteConfirm.emit({
      row,
      confirm: {
        resolve: () => {
          this.dataSource.data = this.dataSource.data.filter(r => r !== row);
          this.dataSource._updateChangeSubscription();
        },
        reject: () => {
        }
      }
    });
  }
  onAdd(event) {
    if (this.settings.mode === 'inline' && !this.isAnyRowInAdd()) {
      this.disableGeneralAction();
      let newRow: any = {};
      this.columns.filter(r => r.key !== 'acciones').forEach(c => {
        newRow[c.key] = null;
      });
      newRow.__isNew = true;
      let mergedRow = {
        ...newRow,
        ...this.settings.rowCreateFunction()
      };
      this.newRow = mergedRow;

      const startIndex = this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize;
      this.dataSource.data.splice(startIndex, 0, this.newRow);
      this.editRow(this.newRow); // se pone en modo edición inmediatamente
      this.dataSource._updateChangeSubscription();
    }
    else if (this.settings.mode === 'external') {
      this.add.emit(event);
    }
  }
  isAnyRowInAdd() {
    return (this.editingRows.size > 0 && [...this.editingRows].some(p => p.__isNew));
  }
  onAddConfirm(row) {
    const fg = this.formGroups.get(row);
    if (!fg) return;

    if (fg.valid) {
      const newData = { ...row, ...fg.value };
      this.addConfirm.emit({
        newData,
        confirm: {
          resolve: (newRow: any) => {
            Object.keys(newRow).forEach(key => row[key] = newRow[key]);
            delete row.__isNew;
            this.editingRows.delete(row);
            this.originalRows.delete(row);
            this.newRow = null;
            let data = this.dataSource.data;
            this.dataSource.data = data;
            this.dataSource._updateChangeSubscription();
          },
          reject: () => {
            fg.markAllAsTouched();
          }
        }
      });
    } else {
      fg.markAllAsTouched();
    }
    this.enableGeneralAction();
  }

  onCopy(row) {
    if (this.settings.mode === 'inline') {
      this.disableGeneralAction();
      let newRow: any = {};
      this.columns.filter(r => r.key !== 'acciones').forEach(c => {
        newRow[c.key] = null;
      });
      newRow.__isNew = true;
      let mergedRow = {
        ...newRow,
        ...this.settings.rowCopyFunction(row)
      };
      this.newRow = mergedRow;
      this.dataSource.data = [mergedRow, ...this.dataSource.data]; // agregar al array
      this.editRow(mergedRow); // se pone en modo edición inmediatamente
    }
  }
  onMassive(event) {
    this.massive.emit({ actionName: event, selected: this.selection.selected, datasource: this.source });
  }
  // Verifica si todos los ítems están seleccionados
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Maneja la selección/deselección de todos los ítems
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.selectionChange.emit(this.selection.selected); // Emite los ítems seleccionados
  }

  // Maneja el cambio de selección de un checkbox individual
  onCheckboxChange(row: any) {
    this.selection.toggle(row);
    this.selectionChange.emit(this.selection.selected); // Emite los ítems seleccionados
  }

  getDefaultGroupColspan(): number {
    const includesSelect = this.columnsKeyIncludes('select');
    const includesAcciones = this.columnsKeyIncludes('acciones');
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
    const hasGroups = Array.isArray(this.settings.headerGroup) && this.settings.headerGroup.length > 0;
    const hasDefault = this.getDefaultGroupColspan() > 0;

    const defaultKey = (hasDefault && hasGroups) ? ['default'] : [];

    const groupKeys = hasGroups
      ? this.settings.headerGroup
        .filter(group => this.getColumnVisible(group.groupColumns) > 0) //solo si tiene columnas visibles
        .map(group => group.nameGroup)
      : [];

    return [...defaultKey, ...groupKeys];
  }
  get columns(): any[] {
    return this.settings.columns;
  }

  columnsKeyIncludes(column: string): boolean {
    return this.columnKeys.includes(column);
  }

  isRowEditing(row: any) {
    return this.editingRows.has(row);
  }

  disableGeneralAction() {
    for (let col of this.settings.columns) {
      col.visible = true;
    }
    this.settings.applyConfigExport({ disabled: true });
    this.settings.applyConfigHide({ disabled: true });
  }

  enableGeneralAction() {
    if (this.editingRows.size === 0) {
      this.settings.applyConfigExport({ disabled: false });
      this.settings.applyConfigHide({ disabled: false });
    }
  }

  private moveNewRowToCurrentPage() {
    if (!this.newRow) return;

    const data = this.dataSource.data.filter(row => row !== this.newRow);
    const startIndex = this.dataSource.paginator.pageIndex * this.dataSource.paginator.pageSize;

    data.splice(startIndex, 0, this.newRow);

    this.dataSource.data = data;
    this.dataSource._updateChangeSubscription();
  }

  configureSortData() {
    this.dataSource.sortData = (data: any[], sort: MatSort) => {
      const paginator = this.dataSource.paginator;
      const pageSize = paginator?.pageSize || data.length;
      const pageIndex = paginator?.pageIndex || 0;

      const accessor = this.dataSource.sortingDataAccessor.bind(this.dataSource);

      const newRows = data.filter(d => d.__isNew);
      const normalRows = data.filter(d => !d.__isNew);

      if (sort && sort.active && sort.direction !== '') {
        normalRows.sort((a, b) => {
          const valueA = accessor(a, sort.active);
          const valueB = accessor(b, sort.active);
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

}
