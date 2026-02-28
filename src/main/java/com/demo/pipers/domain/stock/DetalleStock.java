package com.demo.pipers.domain.stock;

import com.demo.pipers.domain.abstracts.AbstractEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
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
@Table(name = "DETALLE_STOCK")
@SequenceGenerator(name = "SEQ", sequenceName = "SEQ_DETALLE_STOCK", allocationSize = 1)
public class DetalleStock extends AbstractEntity {
	
//	private LocalDate fechaMovimiento//ya esta como fecha de creacion
	private long cantidadActual;
	@OneToOne(cascade = CascadeType.PERSIST)
	private Producto producto;
	//private String observacion;
//	private estado//se podrian cancelar los movimientos????
//	private fecahbaja
	

}
