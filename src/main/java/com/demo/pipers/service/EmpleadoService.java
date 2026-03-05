package com.demo.pipers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.pipers.domain.abstracts.Empleado;
import com.demo.pipers.repository.EmpleadoRepository;

import lombok.Data;

@Data
@Service
public class EmpleadoService {
	
private EmpleadoRepository repository;
	
	@Autowired
    public EmpleadoService(EmpleadoRepository repository) {
        this.repository = repository;
    }

	public Empleado validateAndSave(Empleado empleado) {
		return getRepository().saveAndFlush(empleado);
	}

}
