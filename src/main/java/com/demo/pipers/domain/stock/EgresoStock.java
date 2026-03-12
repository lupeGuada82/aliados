package com.demo.pipers.domain.stock;


import com.demo.pipers.domain.abstracts.Empleado;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "EGRESO_STOCK")
@SequenceGenerator(name = "SEQ", sequenceName = "SEQ_EGRESO_STOCK", allocationSize = 1)
public class EgresoStock extends MovimientoSock {
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SOLICITANTE")
	private Empleado solicitante;

}
