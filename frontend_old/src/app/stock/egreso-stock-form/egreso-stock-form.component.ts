import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleStockService } from '../../service/detalleStock.service';
import { BaseService } from '../../service/base.service';

@Component({
  selector: 'egreso-stock-form',
  templateUrl: './egreso-stock-form.component.html',
  styleUrl: './egreso-stock-form.component.scss'
})

export class EgresoStockFormComponent implements OnInit {

  form!: FormGroup;
  codigo!: number;

  producto: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private detalleStockService: DetalleStockService,
    private service: BaseService<any>,
    public router: Router

  ) { }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.codigo = params['codigo']

      this.service.getByCodigo(this.codigo, 'producto/codigo/').subscribe(producto => {
        this.producto = producto;
        
      this.form = this.fb.group({
      //  codigo: [{ value: this.producto.codigo, disabled: true }],
        cantidad: [null, [Validators.required, Validators.min(1)]],
        responsable: [{ value: 'Usuario autenticado', disabled: true }],
        solicitante: ['', Validators.required],
        observacion: ['', Validators.required]
      });
      }
      );

    });
  }


onCancelar(): void {
  // Aquí puedes agregar lógica para limpiar el formulario o redirigir a otra página
  this.form.reset();
  // Por ejemplo, si quieres redirigir a la página de detalles del stock:
  this.router.navigate(['/stock', this.codigo]);
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

    this.detalleStockService.nuevoEgreso(payload).subscribe((data) => {

      alert('Enviado correctamente');//aca podemos utilizar las notificaciones que ya tenemos
      this.router.navigate(['/stock', this.codigo]);
    });

  }
  irADetalleStock(){
     this.router.navigate(['/stock', this.codigo]);
  }
}
