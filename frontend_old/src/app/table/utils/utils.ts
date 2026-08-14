import { ValidatorFn } from "@angular/forms";

export class ActionDefault {
  name: string;
  icon: string;
  label: string;
  disabled: Function | boolean;
  fontSet: string;
  hide: boolean = false;

  constructor(
    init?: Partial<ActionDefault>
  ) {
    this.name = init.name ?? '';
    this.icon = init.icon ?? '';
    this.label = init.label ?? '';
    this.fontSet = init.fontSet ?? '';
    this.hide = true; //si se dibuja o no
    this.disabled = init.disabled ?? false;
    this.setDisabled(this.disabled);
  }

  // Método para aplicar cambios después de creado
  applyConfig(init?: Partial<ActionDefault>) {
    if (!init) return;

    if (init.name !== undefined) this.name = init.name;
    if (init.icon !== undefined) this.icon = init.icon;
    if (init.label !== undefined) this.label = init.label;
    if (init.fontSet !== undefined) this.fontSet = init.fontSet;
    if (init.hide !== undefined) this.hide = init.hide;
    if (init.disabled !== undefined) this.setDisabled(init.disabled);

  }

  private setDisabled(disabled?: boolean | Function) {
    this.disabled = typeof disabled === 'function'
      ? disabled as () => boolean
      : () => !!disabled;
  }


}



export class TableActionsConfig {
  //aca se definen las acciones, puedo hacerla class para que siempre sea falso salvo que le pnoga true
  private _actions: ActionDefault[] = [];
  private _createDeleteAction: boolean = false;
  private _createShowAction: boolean = false;
  private _createEditAction: boolean = false;
  private _createCopyAction: boolean = false;
  private _createNavegateAction: boolean = false;


  public get createNavegateAction(): boolean {
    return this._createNavegateAction;
  }
  public set createNavegateAction(value: boolean) {
    this._createNavegateAction = value;
    this.createAction('navegar', 'folder_managed', 'Ir', 'material-symbols-outlined', value);
  }

  public get createEditAction(): boolean {
    return this._createEditAction;
  }
  public set createEditAction(value: boolean) {
    this._createEditAction = value;
    this.createAction('editar', 'edit', 'Editar', '', value);
  }

  public get createCopyAction(): boolean {
    return this._createCopyAction;
  }
  public set createCopyAction(value: boolean) {
    this._createCopyAction = value;
    this.createAction('copiar', 'file_copy', 'Copiar', '', value);
  }


  public get createShowAction(): boolean {
    return this._createShowAction;
  }
  public set createShowAction(value: boolean) {
    this._createShowAction = value;
    this.createAction('show', 'visibility', 'Ver', '', value);
  }

  public get createDeleteAction(): boolean {
    return this._createDeleteAction;
  }

  private createAction(name?: string, iconName?: string, labelText?: string, fontS?: string, value?: boolean) {
    if (value && this.findAccion(name) === undefined) {
      this._actions.push(new ActionDefault({
        name: name,
        icon: iconName,
        label: labelText,
        fontSet: fontS
      }));
    }

  }
  public set createDeleteAction(value: boolean) {
    this._createDeleteAction = value;
    this.createAction('delete', 'delete', 'Eliminar', '', value);
  }
  private findAccion(name: String): ActionDefault {
    let action = undefined
    action = this._actions.find(action => action.name === name);
    return action;
  }
  get actions(): ActionDefault[] {
    return this._actions;
  }
  applyConfigDelete(init: Partial<ActionDefault>) {
    let action = this.findAccion('delete');
    if (action)
      action.applyConfig(init)
  }
  applyConfigEdit(init: Partial<ActionDefault>) {
    let action = this.findAccion('editar');
    if (action)
      action.applyConfig(init)
  }
  applyConfigNavegate(init: Partial<ActionDefault>) {
    let action = this.findAccion('navegar');
    if (action)
      action.applyConfig(init)
  }
  applyConfigShow(init: Partial<ActionDefault>) {
    let action = this.findAccion('show');
    if (action)
      action.applyConfig(init)
  }
  applyConfigCopy(init: Partial<ActionDefault>) {
    let action = this.findAccion('copy');
    if (action)
      action.applyConfig(init)
  }
}

export class CustomAction {
  icon: string;
  label: string;
  condicion: (row: any) => void;
  action: (row: any) => void;
  constructor(init?: Partial<CustomAction>) {
    Object.assign(this, init);
  }
}

export class MassiveAction {
  name: string;
  label: string;
  condicion: () => void;
  constructor(init?: Partial<MassiveAction>) {
    Object.assign(this, init);
  }
}

export class EditorColumnSetting {
  type: 'text' | 'number' | 'list' | 'custom' = 'text';
  component?: any; // se utiliza en el caso de type 'custom'
  validators?: ValidatorFn[];
  groupValidators?: ValidatorFn[];
  errorMessages?: { [errorKey: string]: string };
  listOptions?: { value, title }[]; // solo se usa para el caso de 'list'
  parameters?:any;
  constructor(init?: Partial<EditorColumnSetting>) {
    Object.assign(this, init);

  }
}


export class ColumnSetting {
  key: string;
  label: string;
  editor: EditorColumnSetting = new EditorColumnSetting();
  visible = true;  //muestra siempre 
  isEditable: boolean | ((row: any) => boolean) = false;
  isAddable: boolean | ((row: any) => boolean) = false;
  width?: string | number; // ancho opcional: puede ser número o string ('auto', '20%')
  sortBy?: (item: any) => any;
  valueGetter?: (row: any) => any;
  canHide = true; ///para dibujar el check de ocultamiento de columnas, si la columnas se puede o no ocultar
  cellClass?: (item: any) => string
  headerClass?:string; //utilizado para poder definir un estilo en el header  
  //cellContentClass?:string;
  constructor(init?: Partial<ColumnSetting>) {
    Object.assign(this, init);

  }


}
export class TableConfiguration {

  defaultActions = new TableActionsConfig();
  editable = false;
  customActions: CustomAction[] = [];
  columns: ColumnSetting[] = [];
  headerGroup: HeaderGroup[] = []; /// para mi hay que mandarlo a parte porque el table congiuration es para cada fila, aca es una sola vez
  selection: boolean = false;
  noDataMessage: string = 'No hay Datos'
  massiveActions: MassiveAction[] = [];
  mode: 'inline' | 'external' = 'inline';

  pagination = new PaginatorConfiguration();
  exportName; // Se utiliza para el nombre del archivo en la exportacion
  private _createAddAction: boolean = false;
  private _createHidenAction: boolean = true;
  private _createExportAction: boolean = true;

  addAction?: ActionDefault;
  hidenAction?: ActionDefault;
  exportAction: ActionDefault;
  rowCreateFunction?: () => any = () => { };
  rowCopyFunction?: (row) => any = (row) => { };


  constructor() {
    //esto va en el constructor para que se creen de una estas acciones.
    this.createExportAction = this._createExportAction;
    this.createHidenAction = this._createHidenAction;
  }
  applyConfigAdd(init?: Partial<ActionDefault>) {
    this.addAction.applyConfig(init)
  }

  applyConfigHide(init?: Partial<ActionDefault>) {
    this.hidenAction.applyConfig(init)
  }
  applyConfigExport(init?: Partial<ActionDefault>) {
    this.exportAction.applyConfig(init)
  }

  public get createAddAction(): boolean {
    return this._createAddAction;
  }

  public set createDeleteAction(value: boolean) {
    this.defaultActions.createDeleteAction = value;
  }
  public set createEditAction(value: boolean) {
    this.defaultActions.createEditAction = value;
  }
  public set createCopyAction(value: boolean) {
    this.defaultActions.createCopyAction = value;
  }
  public set createNavegateAction(value: boolean) {
    this.defaultActions.createNavegateAction = value;
  }
  public set createShowAction(value: boolean) {
    this.defaultActions.createShowAction = value;
  }
  public set createAddAction(value: boolean) {
    this._createAddAction = value;

    if (value && !this.addAction) {
      this.addAction = new ActionDefault({
        name: 'nuevo',
        icon: 'add',
        label: 'Nuevo',
        fontSet: 'material-symbols-outlined'
      });
    }

  }

  public get createHidenAction(): boolean {
    return this._createHidenAction;
  }

  public set createHidenAction(value: boolean) {
    this._createHidenAction = value;

    if (value && !this.hidenAction) {
      this.hidenAction = new ActionDefault({
        name: 'hidenColumn',
        icon: 'table_eye',
        label: 'Ver Columnas',
        fontSet: 'material-symbols-outlined'
      });
    }

  }


  public get createExportAction(): boolean {
    return this._createExportAction;
  }

  public set createExportAction(value: boolean) {
    this._createExportAction = value;
    if (value && !this.exportAction) {
      this.exportAction = new ActionDefault({
        name: 'export',
        icon: 'file_export',
        label: 'Exportar',
        fontSet: 'material-symbols-outlined'
      });
    }

  }
  applyConfigDelete(init?: Partial<ActionDefault>) {
    this.defaultActions.applyConfigDelete(init);
  }
  applyConfigEdit(init?: Partial<ActionDefault>) {
    this.defaultActions.applyConfigEdit(init);
  }
  applyConfigNavegate(init?: Partial<ActionDefault>) {
    this.defaultActions.applyConfigNavegate(init);
  }
  applyConfigShow(init?: Partial<ActionDefault>) {
    this.defaultActions.applyConfigShow(init);
  }
  applyConfigCopy(init?: Partial<ActionDefault>) {
    this.defaultActions.applyConfigCopy(init);
  }
}

export class PaginatorConfiguration {
  enabled = true;
  label = "Items por página";
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 25];
}
export class HeaderGroup {
  groupColumns?: ColumnSetting[];
  nameGroup?: string;

  constructor(init?: Partial<HeaderGroup>) {
    Object.assign(this, init);
  }
}

export function computeColumnsWidth(cols: any[], containerPx: number, defaults = { defaultWidth: 150, selectWidth: 48, accionesMin: 100 }) {
  const { defaultWidth, selectWidth, accionesMin } = defaults;
  let total = 0;
  if (!Array.isArray(cols)) return { totalPx: 0, needScroll: false };
  if (cols.find((c: any) => c?.key === 'select')) total += selectWidth;
  const parse = (w: string | number | undefined) => {
    if (w == null) return defaultWidth;
    if (typeof w === 'number') return w;
    const s = (w || '').trim();
    if (!s) return defaultWidth;
    if (s.endsWith('px')) return parseInt(s, 10) || defaultWidth;
    if (s.endsWith('%')) {
      const pct = parseFloat(s);
      return isNaN(pct) ? defaultWidth : Math.round((pct / 100) * containerPx);
    }
    if (s === 'auto') return defaultWidth;
    const n = parseInt(s, 10);
    return isNaN(n) ? defaultWidth : n;
  };
  for (const c of cols) total += parse(c?.width);
  const acciones = cols.find((c: any) => c?.key === 'acciones');
  if (acciones) total = Math.max(total, parse(acciones.width) || accionesMin);
  return { totalPx: total, needScroll: containerPx > 0 ? total > containerPx : false };
}
