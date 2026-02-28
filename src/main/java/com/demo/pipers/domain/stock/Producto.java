package com.demo.pipers.domain.stock;

import java.util.List;

import com.demo.pipers.domain.abstracts.AbstractEntity;

public class Producto extends AbstractEntity {

	private long codigo;
	private String nombre;
	private List<IngresoStock> detalleIngresoStock;
	private List<EgresoStock> detalleEgresoStock;
	
//	QR para mi se tiene que generar cuando se quiera, no guardar, ya que la url es siempre la misma

}
