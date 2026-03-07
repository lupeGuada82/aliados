import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrl: './modal-message.component.scss'
})
export class ModalMessageComponent implements OnInit {

  @Input() texto;
  @Input() titulo;
  @Input() boton;
  @Input() info;

  constructor(private dialogRef: MatDialogRef<ModalMessageComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
   /*  this.tipo = this.dialogRef._containerInstance._config.data.tipo; */
    this.titulo = this.dialogRef._containerInstance._config.data.titulo;
    this.texto = this.dialogRef._containerInstance._config.data.texto;
    this.boton = this.dialogRef._containerInstance._config.data.textoBoton;
    this.info = this.dialogRef._containerInstance._config.data.info;
  }

  confirmar(opcion) {
    this.dialogRef.close(opcion);
  }


}
