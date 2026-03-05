package com.demo.pipers.domain.abstracts;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = false)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ")
	private long id;

	@Version
	@NotNull
	protected long version;

	@Column(name = "FH_ALTA", updatable = false, nullable = false)
	@NotNull
	@CreatedDate
	private LocalDateTime fechaCreacion;

	@Column(name = "FHU_ACTUALIZ", nullable = false)
	@LastModifiedDate
	@NotNull
	private LocalDateTime fechaUltimaModificacion;

	@Column(name = "FH_BAJA", updatable = false, nullable = true)
	private LocalDateTime fechaBaja;

	@Column(name = "C_USUARIO", nullable = true)
	//@NotNull
	@LastModifiedBy
	private String usuarioUltimaModificacion;


}
