package com.demo.pipers.domain.stock;


import com.demo.pipers.domain.abstracts.AbstractEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "PRODUCTO")
@SequenceGenerator(name = "SEQ", sequenceName = "SEQ_PRODUCTO", allocationSize = 1)
public class Producto extends AbstractEntity {

	private long codigo;
	private String nombre;
	private long minimo;
	private long maximo;
	//private List<IngresoStock> detalleIngresoStock;
	//private List<EgresoStock> detalleEgresoStock;
	
//	QR para mi se tiene que generar cuando se quiera, no guardar, ya que la url es siempre la misma

}
