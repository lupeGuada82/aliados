package com.demo.pipers.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngresoStockDTO {


    private Long cantidad;
	private String fecha;
	private String observacion;
	private String usuario;
	
}
