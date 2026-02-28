package com.demo.pipers.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.pipers.domain.stock.DetalleStock;

public interface DetalleStockRepository extends JpaRepository<DetalleStock, Long> {
	
	Optional<DetalleStock> findByProducto_Codigo(long codigo);

}
