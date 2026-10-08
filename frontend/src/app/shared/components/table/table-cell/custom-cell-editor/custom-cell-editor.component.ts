import { Component, OnChanges, OnDestroy, SimpleChanges, ViewChild, ViewContainerRef, ComponentRef, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'custom-cell-editor',
    standalone: true,
    template: `<ng-template #dynamicTarget></ng-template>`,
    styleUrl: './custom-cell-editor.component.scss'
})
export class CustomCellEditor implements OnChanges, OnDestroy {
    /** Control de la celda */
    control = input.required<FormControl>();

    /** Fila completa */
    row = input.required<any>();

    /** Definición de la columna */
    column = input.required<any>();

    formGroup = input<FormGroup | null>(null);

    parameters = input.required<any>();

    @ViewChild('dynamicTarget', { read: ViewContainerRef, static: true })
    dynamicTarget!: ViewContainerRef;

    private customComponentRef?: ComponentRef<any>;
    private formSub?: any;
    /**no siempre es necesario migrar el onchanges, para este caso es necesario */
    ngOnChanges(changes: SimpleChanges) {
        // Si cambió la columna, destruir el componente existente para recrearlo
        if (changes['column'] && !changes['column'].firstChange && this.customComponentRef) {
            this.destroyExistingComponent();
        }
        const column = this.column();
        if (column && !this.customComponentRef) {
            const editorComponent = column.editor?.component;
            if (!editorComponent) return;

            this.customComponentRef = this.dynamicTarget.createComponent(editorComponent);
        }

        // Actualizar inputs del componente si existe
        if (this.customComponentRef) {
            this.customComponentRef.setInput('control', this.control());
            this.customComponentRef.setInput('row', this.row());
            this.customComponentRef.setInput('column', column);
            this.customComponentRef.setInput('parameters', this.parameters());

            // Manejar cambios en formGroup
            if (changes['formGroup']) {
                if (this.formSub) {
                    this.formSub.unsubscribe();
                    this.formSub = null;
                }
                const formGroup = this.formGroup()
                if (formGroup) {
                    this.formSub = formGroup.valueChanges.subscribe(val => {
                        this.customComponentRef!.setInput('row', val);
                    });
                }
            }
        }
    }

    private destroyExistingComponent(): void {
        if (this.formSub) {
            this.formSub.unsubscribe();
            this.formSub = null;
        }
        if (this.customComponentRef) {
            this.customComponentRef.destroy();
            this.customComponentRef = undefined;
        }
    }

    ngOnDestroy() {
        this.destroyExistingComponent();
    }
}