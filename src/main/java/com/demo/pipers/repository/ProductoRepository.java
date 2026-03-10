package com.demo.pipers.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.pipers.domain.stock.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
	
	Optional<Producto> findByCodigo(long codigo);
	 
	List<Producto> findByCodigoIn(List<Long> codigos);

}
