package com.demo.pipers.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProductoDTO  {
	private Long codigo;
    private String nombre;
    private Long stockMinimo;
    private Long stockActual;
    private Long stockMaximo;
//    @Builder.Default private List<Object> detalleIngresoStock = new ArrayList<Object>();
//    @Builder.Default private List<Object> detalleEgresoStock = new ArrayList<Object>();


}
