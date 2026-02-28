package com.demo.pipers.domain.abstracts;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;


public abstract class AbstractEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ")
	protected long id;

	@Version
	@NotNull
	protected long version;

	@Column(name = "FH_ALTA", updatable = false, nullable = false)
	@NotNull
	@CreatedDate
	private LocalDate fechaCreacion;

	@Column(name = "FHU_ACTUALIZ", nullable = false)
	@LastModifiedDate
	@NotNull
	private LocalDate fechaUltimaModificacion;

	@Column(name = "C_USUARIO", nullable = false)
	@NotNull
	@LastModifiedBy
	private String usuarioUltimaModificacion;


}
