package com.demo.pipers.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.pipers.domain.stock.DetalleStock;
import com.demo.pipers.repository.DetalleStockRepository;

import lombok.Data;

@Data
@Service
public class DetalleStockService {
	
	private DetalleStockRepository repository;
	
	@Autowired
    public DetalleStockService(DetalleStockRepository repository) {
        this.repository = repository;
    }

	public DetalleStock validateAndSave(DetalleStock detalleStock) {
		
		return getRepository().saveAndFlush(detalleStock);
	}

	public DetalleStock getByProducto_Codigo(Long codigo) {
		return getRepository().findByProducto_Codigo(codigo).get();
	}

	public Collection<DetalleStock> getAll() {
		return getRepository().findAll();
	}

}
