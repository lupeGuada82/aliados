package com.demo.pipers.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemProcesadoDTO {

	private String descripcion;
	private BigDecimal cantidad;
	private String unidad;

}