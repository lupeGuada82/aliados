package com.demo.pipers.domain.stock;

import jakarta.persistence.Entity;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = false)
@Entity
@Table(name = "INGRESO_STOCK")
@SequenceGenerator(name = "SEQ", sequenceName = "SEQ_INGRESO_STOCK", allocationSize = 1)
public class IngresoStock extends MovimientoSock {

}
