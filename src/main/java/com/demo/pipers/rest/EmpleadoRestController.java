package com.demo.pipers.rest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.demo.pipers.domain.abstracts.Empleado;
import com.demo.pipers.domain.stock.DetalleStock;
import com.demo.pipers.domain.stock.Producto;
import com.demo.pipers.dto.DetalleStockDTO;
import com.demo.pipers.dto.EmpleadoDTO;
import com.demo.pipers.service.EmpleadoService;

import lombok.Data;

@Data
@RestController
@RequestMapping("/rest-api/empleado")
public class EmpleadoRestController {
	@Autowired
	private EmpleadoService service;

	@GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseStatus(HttpStatus.OK)
	public @ResponseBody Collection<EmpleadoDTO> getAll() {

		List<Empleado> empleados = (List<Empleado>) getService().getAll();
		List<EmpleadoDTO> emepleadosDTO = new ArrayList<EmpleadoDTO>();
		empleados.stream().forEach(p -> emepleadosDTO.add(EmpleadoDTO.builder().id(p.getId()).nombre(p.getNombre()).build()));

		return emepleadosDTO;
	}

	@PutMapping(path = "/", consumes = "application/json; charset=utf-8")
	public @ResponseBody EmpleadoDTO update(@RequestBody EmpleadoDTO dto) throws Exception {

		Empleado empleado = service.get(dto.getId());
		//empleado.setCargo(dto.getCargo());
		empleado.setNombre(dto.getNombre());
		empleado = service.validateAndSave(empleado);

		return EmpleadoDTO.builder().nombre(empleado.getNombre()).cargo(empleado.getCargo()).build();
	}

	@PostMapping(path = "/", produces = { "application/json" }, consumes = { "application/json" })
	public @ResponseBody EmpleadoDTO save(@RequestBody EmpleadoDTO dto) throws Exception {
		Empleado empleado = Empleado.builder().nombre(dto.getNombre()).build();
		Empleado empleadoNew =	service.validateAndSave(empleado);
		return EmpleadoDTO.builder().nombre(empleadoNew.getNombre()).cargo(empleadoNew.getCargo()).build(); 
	}

}
