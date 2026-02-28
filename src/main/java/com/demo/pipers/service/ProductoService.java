package com.demo.pipers.service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.pipers.domain.stock.Producto;
import com.demo.pipers.repository.ProductoRepository;

import lombok.Data;

@Data
@Service
public class ProductoService {

	private ProductoRepository repository;
	
	@Autowired
    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

	public Producto validateAndSave(Producto producto) {
		return getRepository().saveAndFlush(producto);
	}

	public Producto get(Long id) {
		return getRepository().findById(id).get();
	}

	public Collection<Producto> getAll() {
		return getRepository().findAll();
	}
	
	
	
}
