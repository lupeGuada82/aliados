package com.demo.pipers.domain.stock;

import java.util.ArrayList;
import java.util.List;

import com.demo.pipers.domain.abstracts.AbstractEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
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
	
	@OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, orphanRemoval = true)
	@Builder.Default private List<IngresoStock> ingresos = new ArrayList<IngresoStock>();
	
	@OneToMany(mappedBy = "stock", cascade = CascadeType.ALL, orphanRemoval = true)
	@Builder.Default private List<EgresoStock> egresos = new ArrayList<EgresoStock>();
	//private String observacion;
//	private estado//se podrian cancelar los movimientos????
//	private fecahbaja

	public void addIngreso(IngresoStock ingreso) {
	 
		this.getIngresos().add(ingreso);
	    ingreso.stock(this);
		
	}
	
	public void addEgreso(EgresoStock ingreso) {
		 
		this.getEgresos().add(ingreso);
	    ingreso.stock(this);
		
	}
	

}
