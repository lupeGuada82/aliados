import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild,
    ViewContainerRef,
    ComponentRef
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'custom-cell-editor',
    standalone: true,
    template: `<ng-template #dynamicTarget></ng-template>`
})
export class CustomCellEditor implements OnChanges, OnDestroy {
    /** Control de la celda */
    @Input() control!: FormControl | null;

    /** Fila completa */
    @Input() row: any;

    /** Definición de la columna */
    @Input() column: any;

    @Input() formGroup: FormGroup | null = null;

    @Input() parameters: any

    @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true })
    dynamicTarget!: ViewContainerRef;

    private customComponentRef?: ComponentRef<any>;
    private formSub?: any;

    ngOnChanges(changes: SimpleChanges) {
        if (this.column && !this.customComponentRef) {
            const editorComponent = this.column.editor?.component;
            if (!editorComponent) return;

            this.customComponentRef = this.dynamicTarget.createComponent(editorComponent);

            // SetInput para que se lanze el ngOnChanges
            this.customComponentRef.setInput('control', this.control);
            this.customComponentRef.setInput('row', this.row);
            this.customComponentRef.setInput('column', this.column);
            this.customComponentRef.setInput('parameters', this.parameters);

            // Subscripcion por si cambia algun valor del formGroup y lo propago al customComponent
            if (this.formGroup) {
                this.formSub = this.formGroup.valueChanges.subscribe(val => {
                    this.customComponentRef!.setInput('row', val);
                });
            }
        }
    }

    ngOnDestroy() {
        if (this.formSub) this.formSub.unsubscribe();
        if (this.customComponentRef) this.customComponentRef.destroy();
    }
}
