package com.demo.pipers.rest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.demo.pipers.domain.stock.Producto;
import com.demo.pipers.dto.ProductoDTO;
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


	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public Producto getById(@PathVariable("id") Long id) {
		return getService().get(id);
		// return null;//mapper().toDTO(service().get(id));
	}

	@GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody Collection<ProductoDTO> getAll() {

		List<Producto> productos = (List<Producto>) getService().getAll();
		List<ProductoDTO> productosDTO = new ArrayList<ProductoDTO>();
		productos.stream().forEach(p -> productosDTO.add(ProductoDTO.builder().codigo(p.getCodigo())
				.nombre(p.getNombre()).stockMaximo(p.getMaximo()).stockMinimo(p.getMinimo()).build()));

		return productosDTO;
	}

	@GetMapping(value = "/codigo/{codigo}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public ProductoDTO getByCodigo(@PathVariable("codigo") Long codigo) {
		Producto producto = this.getService().getByCodigo(codigo);
		ProductoDTO productoDTO = ProductoDTO.builder().codigo(producto.getCodigo()).nombre(producto.getNombre())
				.stockMaximo(producto.getMaximo()).stockMinimo(producto.getMinimo()).build();
		return productoDTO;

	}
}
