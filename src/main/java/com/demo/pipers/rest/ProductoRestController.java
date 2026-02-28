package com.demo.pipers.rest;

import org.springframework.http.MediaType;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.demo.pipers.domain.stock.Producto;
import com.demo.pipers.service.ProductoService;

import lombok.Data;

@Data
@RestController
@RequestMapping("/rest-api/producto")
public class ProductoRestController {
	
	private ProductoService service;
	
	@Autowired
    public ProductoRestController(ProductoService service) {
        this.service = service;
    }	

	@PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody Producto save(@RequestBody Producto producto) {
		return getService().validateAndSave(producto);
	}
	
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public Producto getById(@PathVariable("id") Long id) {
		return getService().get(id);
		//return null;//mapper().toDTO(service().get(id));
	}
	
	@GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody Collection<Producto> getAll() {
		return getService().getAll();
		//return new ArrayList<Producto>();//mapper().entitiesToDTOs(service().getAll());
	}
}
