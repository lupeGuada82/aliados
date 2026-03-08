package com.demo.pipers.rest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;

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

import com.demo.pipers.domain.abstracts.Empleado;
import com.demo.pipers.domain.stock.DetalleStock;
import com.demo.pipers.domain.stock.EgresoStock;
import com.demo.pipers.domain.stock.IngresoStock;
import com.demo.pipers.domain.stock.Producto;
import com.demo.pipers.dto.DetalleStockDTO;
import com.demo.pipers.dto.IngresoStockDTO;
import com.demo.pipers.service.DetalleStockService;
import com.demo.pipers.service.EmpleadoService;

import lombok.Data;

@Data
@RestController
@RequestMapping("/rest-api/detalleStock")
public class DetalleStockRestController {
	
private DetalleStockService service;
private EmpleadoService empleadoService;
	
	@Autowired
    public DetalleStockRestController(DetalleStockService service,EmpleadoService eService) {
        this.service = service;
        this.empleadoService = eService;
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
		
		//TODO tiene que ser el usuario autenticado en el sistema
		 Empleado responsable = empleadoService.getAll().stream().findFirst().get();
		
		IngresoStock is = IngresoStock.builder()
				.cantidad(dto.getStockActual())
				.observacion("Carga inicial")
				.responsable(responsable)
				.build();
		
		ds.addIngreso(is);
		
		ds = getService().validateAndSave(ds);
		
		return DetalleStockDTO.builder()
				.codigo(ds.getProducto().getCodigo())
				.nombre(ds.getProducto().getNombre())
				.stockActual(ds.getCantidadActual())
				.stockMaximo(ds.getProducto().getMaximo())
				.stockMinimo(ds.getProducto().getMinimo())
				.build(); 
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
	
	@GetMapping(value = "/{codigo}/ingresos", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody Collection<IngresoStockDTO> getIngresos(@PathVariable("codigo") Long codigo) {
		
		DetalleStock ds = getService().getByProducto_Codigo(codigo);
		Collection<IngresoStockDTO> ingresos = new ArrayList<IngresoStockDTO>();
		for (IngresoStock i : ds.getIngresos()) {
			
			IngresoStockDTO iDTO = IngresoStockDTO.builder()
					.cantidad(i.cantidad())
					.fecha(i.getFechaCreacion().toString())
					.observacion(i.observacion())
					.usuario(i.responsable().getNombre())
					.build(); 
			ingresos.add(iDTO);
			
		}
		
		
		return ingresos;
		
		
	}
	
	@PutMapping(value = "/{codigo}/ingreso", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody IngresoStockDTO nuevoIngreso(@PathVariable("codigo") Long codigo, @RequestBody IngresoStockDTO dto) {
		
		DetalleStock ds = getService().getByProducto_Codigo(codigo);
		
		//TODO tiene que ser el usuario autenticado en el sistema
		 Empleado responsable = empleadoService.getAll().stream().findFirst().get();
		
		IngresoStock is = IngresoStock.builder()
				.cantidad(dto.getCantidad())
				.observacion(dto.getObservacion())
				.responsable(responsable)
				.build();
		
		ds.addIngreso(is);
		
		ds = getService().validateAndSave(ds);
		
		// Use a lambda expression for the Comparator
        Comparator<IngresoStock> idComparator = (p1, p2) -> Long.compare(p1.getId(), p2.getId());

        // Find the maximum element using the custom comparator
        IngresoStock newIs = Collections.max(ds.getIngresos(), idComparator);
		
		
		IngresoStockDTO iDTO = IngresoStockDTO.builder()
					.cantidad(newIs.cantidad())
					.fecha(newIs.getFechaCreacion().toString())
					.observacion(newIs.observacion())
					.usuario(newIs.responsable().getNombre())
					.build(); 
			
		return iDTO;
		
		
	}
	
	@GetMapping(value = "/{codigo}/egresos", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody Collection<EgresoStockDTO> getEgresos(@PathVariable("codigo") Long codigo) {
		
		//DetalleStock ds = getService().getByProducto_Codigo(codigo);
		Collection<EgresoStockDTO> egresos = new ArrayList<EgresoStockDTO>();
//		for (IngresoStock i : ds.getIngresos()) {
//			
//			IngresoStockDTO iDTO = IngresoStockDTO.builder()
//					.cantidad(i.cantidad())
//					.fecha(i.getFechaCreacion().toString())
//					.observacion(i.observacion())
//					.build(); 
//			ingresos.add(iDTO);
//			
//		}
		
		
		return egresos;
		
		
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
