package com.demo.pipers.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Data
@EqualsAndHashCode(callSuper=false)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class EmpleadoDTO extends AbstractEntityDTO {
	private String nombre;
	private String cargo;
	private LocalDate fechaIngreso;
}
