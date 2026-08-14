
export const ACCIONES = 'acciones';
export const SELECT = 'select';
export const DEFAULT = 'default';
export const FORMARRAY = 'formArray';
export const INLINE = 'inline';

export const TABLE_ACTIONS = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
    COPY: 'copy',
    SHOW: 'show',
    NAVIGATE: 'navigate',
    HIDDEN_COLUMN: 'hiddenColumn',
    EXPORT: 'export',
    EMPTY: ''
  } as const;

  export type TableAction = typeof TABLE_ACTIONS[keyof typeof TABLE_ACTIONS]; 