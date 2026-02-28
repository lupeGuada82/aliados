package com.demo.pipers.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.pipers.domain.stock.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

}
