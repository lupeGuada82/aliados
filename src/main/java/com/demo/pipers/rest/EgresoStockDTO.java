package com.demo.pipers.rest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EgresoStockDTO {
	
	private Long cantidad;
	private String fecha;
	private String observacion;

}
