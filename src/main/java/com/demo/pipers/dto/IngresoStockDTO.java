package com.demo.pipers.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IngresoStockDTO {


    private int cantidad;
	private String usuario;
	private Date fecha;
	private String observacion;
	private String estado;
	
}
