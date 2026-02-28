import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColumnSetting, TableConfiguration } from './utils/utils';
import { AddConfirmEvent, DeleteConfirmEvent, EditConfirmEvent } from './utils/events';
import { TableDinamicComponent } from './table-dinamic/table-dinamic.component';
import { CommonModule } from '@angular/common';
import { ExportDataService } from './services/export-data.service';
import { LocatizationService } from './localization/localization.service';


@Component({
    selector: 'table',
    standalone: true,
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [LocatizationService, ExportDataService],
    imports: [CommonModule, TableDinamicComponent]
})
export class TableComponent {

    @Input() source: any;
    @Input() settings = new TableConfiguration();

    columns: ColumnSetting[] = [];

    @Output() navigate = new EventEmitter<any>();
    @Output() show = new EventEmitter<any>();
    @Output() add = new EventEmitter<any>();
    @Output() edit = new EventEmitter<any>();
    @Output() delete = new EventEmitter<any>();
    @Output() massive = new EventEmitter<any>();
    @Output() selectionChange = new EventEmitter<any[]>();

    @Output() editConfirm = new EventEmitter<EditConfirmEvent>();
    @Output() addConfirm = new EventEmitter<AddConfirmEvent>();
    @Output() deletConfirm = new EventEmitter<DeleteConfirmEvent>();

    onNavigate(row) {
        this.navigate.emit(row);
    }
    onShow(row) {
        this.show.emit(row);
    }
    onEdit(event) {
        this.edit.emit(event);
    }
    onEditConfirm(event) {
        if (this.editConfirm.observed)
            this.editConfirm.emit(event);
        else event.confirm.resolve(event.data);
    }
    onDelete(row) {
        this.delete.emit(row);
    }
    onDeleteConfirm(event) {
        if (this.deletConfirm.observed)
            this.deletConfirm.emit(event);
        else event.confirm.resolve(event.data);
    }
    onAdd(event) {
        this.add.emit(event);
    }
    onAddConfirm(event) {
        if (this.addConfirm.observed)
            this.addConfirm.emit(event);
        else event.confirm.resolve(event.newData);
    }
    onMassive(event) {
        this.massive.emit(event);
    }
    onSelectionChange(row) {
        this.selectionChange.emit(row);
    }


}
