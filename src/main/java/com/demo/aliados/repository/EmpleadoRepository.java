package com.demo.aliados.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.aliados.domain.abstracts.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

}
