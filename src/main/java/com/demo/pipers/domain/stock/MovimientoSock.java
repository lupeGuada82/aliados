package com.demo.pipers.domain.stock;

import com.demo.pipers.domain.abstracts.AbstractEntity;
import com.demo.pipers.domain.abstracts.Empleado;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

@Data
@Accessors(fluent = true)
@EqualsAndHashCode(callSuper = false)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class MovimientoSock extends AbstractEntity {
	
	@ManyToOne()
    @JoinColumn(name = "stock")
	private DetalleStock stock;
	
	@Column(name = "CANTIDAD", updatable = true, nullable = false)
	@NotNull
	private int cantidad;
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="RESPONSABLE")
	private Empleado responsable;
	

}
