package com.demo.pipers.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.pipers.domain.abstracts.Empleado;

public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

}
