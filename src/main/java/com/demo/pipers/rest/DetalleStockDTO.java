package com.demo.pipers.rest;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetalleStockDTO {

	private Long codigo;
    private String nombre;
    private Long stockMinimo;
    private Long stockActual;
    private Long stockMaximo;
    @Builder.Default private List<Object> modificaciones = new ArrayList<Object>();
	
}
