import { Component, Output, EventEmitter, input, output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ColumnSetting, TableConfiguration } from './utils/utils';
import { AddConfirmEvent, DeleteConfirmEvent, EditConfirmEvent } from './utils/events';
import { TableDinamicComponent } from './table-dinamic/table-dinamic.component';



@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        TableDinamicComponent
    ],
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent {

    source = input<any>();
    formArray = input<FormArray>(); // Soporte para FormArray, 
    settings = input(new TableConfiguration());

    columns: ColumnSetting[] = [];

    navigate = output<any>();
    show = output<any>();
    add = output<any>();
    edit = output<any>();
    delete = output<any>();
    massive = output<any>();
    selectionChange = output<any[]>();
    @Output() editConfirm = new EventEmitter<EditConfirmEvent>();
    @Output() addConfirm = new EventEmitter<AddConfirmEvent>();
    @Output() deleteConfirm = new EventEmitter<DeleteConfirmEvent>();

    onNavigate(row: any) {
        this.navigate.emit(row);
    }
    onShow(row: any) {
        this.show.emit(row);
    }
    onEdit(event: any) {
        this.edit.emit(event);
    }
    onEditConfirm(event: any) {
        if (this.editConfirm.observed)
            this.editConfirm.emit(event);
        else event.confirm.resolve(event.data);
    }
    onDelete(row: any) {
        this.delete.emit(row);
    }
    onDeleteConfirm(event: any) {
        if (this.deleteConfirm.observed)
            this.deleteConfirm.emit(event);
        else event.confirm.resolve(event.data);
    }
    onAdd(event: any) {
        this.add.emit(event);
    }
    onAddConfirm(event: any) {
        if (this.addConfirm.observed)
            this.addConfirm.emit(event);
        else event.confirm.resolve(event.newData);
    }
    onMassive(event: any) {
        this.massive.emit(event);
    }
    onSelectionChange(row: any) {
        this.selectionChange.emit(row);
    }

}
