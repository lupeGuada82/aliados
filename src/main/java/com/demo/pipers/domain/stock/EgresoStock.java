package com.demo.pipers.domain.stock;


import com.demo.pipers.domain.abstracts.Empleado;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
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
@Table(name = "EGRESO_STOCK")
@SequenceGenerator(name = "SEQ", sequenceName = "SEQ_EGRESO_STOCK", allocationSize = 1)
public class EgresoStock extends MovimientoSock {
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="SOLICITANTE")
	private Empleado solicitante;

}
