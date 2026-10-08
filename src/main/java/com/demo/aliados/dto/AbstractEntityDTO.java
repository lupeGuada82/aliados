package com.demo.aliados.dto;

import java.time.LocalDateTime;

import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@SuperBuilder
@EqualsAndHashCode
@Data
public abstract class AbstractEntityDTO {
	private long id;
	protected long version;
	private LocalDateTime fechaCreacion;
	private LocalDateTime fechaUltimaModificacion;
	private LocalDateTime fechaBaja;
	private String usuarioUltimaModificacion;

}
