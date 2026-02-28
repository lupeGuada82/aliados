export interface EditConfirmEvent {

    row: any;

    data: any;
    /** Metodos resolve(data) o reject(). Para que se confirme la modificación se debe invocar a resolve(data) */
    confirm: any;
  }

  export interface AddConfirmEvent {

    newData: any;
    /** Metodos resolve() o reject(). Para que se confirme la modificación se debe invocar a resolve(newData) */
    confirm: any;
  }

  export interface DeleteConfirmEvent {

    row: any;

    /** Metodos resolve(row) o reject(). Para que se confirme la modificación se debe invocar a resolve(row) */
    confirm: any;
  }
