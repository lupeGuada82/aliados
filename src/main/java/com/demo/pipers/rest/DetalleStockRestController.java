package com.demo.pipers.rest;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.demo.pipers.domain.stock.DetalleStock;
import com.demo.pipers.domain.stock.Producto;
import com.demo.pipers.dto.DetalleStockDTO;
import com.demo.pipers.service.DetalleStockService;

import lombok.Data;

@Data
@RestController
@RequestMapping("/rest-api/detalleStock")
public class DetalleStockRestController {
	
private DetalleStockService service;
	
	@Autowired
    public DetalleStockRestController(DetalleStockService service) {
        this.service = service;
    }	
	
	@PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody DetalleStockDTO save(@RequestBody DetalleStockDTO dto) {
		
		Producto p = Producto.builder()
				.codigo(dto.getCodigo())
				.maximo(dto.getStockMaximo())
				.minimo(dto.getStockMinimo())
				.nombre(dto.getNombre())
				.build();
		
		DetalleStock ds= DetalleStock.builder()
		.producto(p)
		.build();
		
		getService().validateAndSave(ds);
		//aca para mi hay que ir a buscar el objeto de nuevo, ya que tiene datos distintos
		return dto; 
	}
	
	@PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody DetalleStockDTO update(@RequestBody DetalleStockDTO dto) {
		
		DetalleStock ds = service.getByProducto_Codigo(dto.getCodigo());
		
		ds.getProducto().setMaximo(dto.getStockMaximo());
		ds.getProducto().setMinimo(dto.getStockMinimo());
		ds.getProducto().setNombre(dto.getNombre());
		
		ds = service.validateAndSave(ds);
		
		return DetalleStockDTO.builder()
				.codigo(ds.getProducto().getCodigo())
				.nombre(ds.getProducto().getNombre())
				.stockActual(ds.getCantidadActual())
				.stockMaximo(ds.getProducto().getMaximo())
				.stockMinimo(ds.getProducto().getMinimo())
				.build();
		
	}
	
	@GetMapping(value = "/{codigo}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public DetalleStockDTO getByCodigo(@PathVariable("codigo") Long codigo) {
		DetalleStock ds = getService().getByProducto_Codigo(codigo);
		return DetalleStockDTO.builder()
				.codigo(ds.getProducto().getCodigo())
				.nombre(ds.getProducto().getNombre())
				.stockActual(ds.getCantidadActual())
				.stockMaximo(ds.getProducto().getMaximo())
				.stockMinimo(ds.getProducto().getMinimo())
				.build();
	}
	
	@GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody Collection<DetalleStockDTO> getAll() {
		
		Collection<DetalleStock> detallesStock=getService().getAll();
		Collection<DetalleStockDTO> detallesStockDTO = new ArrayList<DetalleStockDTO>();
		for (DetalleStock ds : detallesStock) {
			
			DetalleStockDTO dsDTO = DetalleStockDTO.builder()
					.codigo(ds.getProducto().getCodigo())
					.nombre(ds.getProducto().getNombre())
					.stockActual(ds.getCantidadActual())
					.stockMaximo(ds.getProducto().getMaximo())
					.stockMinimo(ds.getProducto().getMinimo())
					.build(); 
			detallesStockDTO.add(dsDTO);
			
		}
		
		return detallesStockDTO;
	}


}
