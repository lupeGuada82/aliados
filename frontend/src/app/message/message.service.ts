import { Component, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';


@Injectable()
export class MessageService {

  open = false;

  constructor(public dialog: MatDialog) { }

  private openMessage(error, titulo, texto) {
    if (!this.open) {
      this.open = true;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        tipo: error,
        texto: texto,
        titulo: titulo
      };
      dialogConfig.backdropClass = 'backdropBlanco',
        dialogConfig.hasBackdrop = true,
        dialogConfig.height = '450px',
        dialogConfig.width = '500px';
      this.dialog.open(DialogMessageComponent, dialogConfig).afterClosed().subscribe(response => this.open = false);
    }
  }

  error(texto) {

    this.openMessage('error', "Ups!", texto);
  }

  exito(texto) {
    this.openMessage('exito', "¡Enhorabuena!", texto);
  }

  advertencia(texto) {
    this.openMessage('advertencia', "¡Atención!", texto);
  }


  async validacionInfo(titulo, texto, boton, info) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      texto: texto,
      titulo: titulo,
      textoBoton: boton,
      info:info
    };
    dialogConfig.backdropClass = 'backdropBlanco',
      dialogConfig.hasBackdrop = true;
    const dialogRef = await this.dialog.open(ModalMessageComponent, dialogConfig);
    return dialogRef;

  }

  async validacion(titulo, texto, boton) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      texto: texto,
      titulo: titulo,
      textoBoton: boton
      
    };
    dialogConfig.backdropClass = 'backdropBlanco';
    dialogConfig.hasBackdrop = true;
    /* RESPUESTA DEL DAILOGO */
    const dialogRef = await this.dialog.open(ModalMessageComponent, dialogConfig);
    return dialogRef;

  }

  

}
