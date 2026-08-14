export interface ConfirmHandler<TData = any> {
    resolve: (data: TData) => void;
    reject: () => void;
}

export interface EditConfirmEvent {
    row: any;
    data: any;
    confirm: ConfirmHandler<any>;
}

export interface AddConfirmEvent {
    newData: any;
    confirm: ConfirmHandler<any>;
}

export interface DeleteConfirmEvent {
    row: any;
    confirm: ConfirmHandler<void>;
}
