import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'egreso-stock-form',
  templateUrl: './egreso-stock-form.component.html',
  styleUrl: './egreso-stock-form.component.scss'
})

export class EgresoStockFormComponent implements OnInit {

  form!: FormGroup;
  codigo!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // obtengo código desde la URL
    this.route.params.subscribe(prodId => {
      this.codigo = Number(prodId['codigo']);
      // Crear formulario
      this.form = this.fb.group({
        codigo: [{ value: this.codigo, disabled: true }],
        cantidad: [null, [Validators.required, Validators.min(1)]],
        responsable: ['', Validators.required],
        solicitante: ['', Validators.required]
      });
    });
  }




  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      codigo: this.codigo,
      ...this.form.getRawValue()
    };

    console.log(payload);
    // acá llamás al service HTTP
  }
}
