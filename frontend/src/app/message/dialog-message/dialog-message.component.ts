import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.scss'
})
export class DialogMessageComponent  implements OnInit {

  tipo: string;
  titulo = "hubo un error";
  texto = "Algo no funciono";

  constructor(private dialogRef: MatDialogRef<DialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) data, private cRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.tipo = this.dialogRef._containerInstance._config.data.tipo;
    this.titulo = this.dialogRef._containerInstance._config.data.titulo;
    this.texto = this.dialogRef._containerInstance._config.data.texto;
    this.cRef.detectChanges();
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
