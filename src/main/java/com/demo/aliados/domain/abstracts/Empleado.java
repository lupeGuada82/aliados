package com.demo.aliados.domain.abstracts;

import jakarta.persistence.Column;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "EMPLEADO")
@SequenceGenerator(name = "SEQ", sequenceName = "SEQ_EMPLEADO", allocationSize = 1)
public class Empleado  extends AbstractEntity{
	
	@Column(name = "NOMBRE", updatable = true, nullable = false)
	@NotNull
	private String nombre;
	private String cargo;
	private LocalDate fechaIngreso;
	//POENR MAS DATOS

}
