package com.demo.pipers.data;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.demo.pipers.domain.abstracts.Empleado;
import com.demo.pipers.domain.stock.DetalleStock;
import com.demo.pipers.domain.stock.IngresoStock;
import com.demo.pipers.domain.stock.Producto;
import com.demo.pipers.service.DetalleStockService;
import com.demo.pipers.service.EmpleadoService;

import jakarta.annotation.PostConstruct;

@Component
@Generated
@Profile( {"memdb","memdb-liquibase"} )
public class DataLoader {

	private DetalleStockService service;
	private EmpleadoService empleadoService;
	
	@Autowired
    public DataLoader(DetalleStockService service,EmpleadoService emplService) {
        this.service = service;
        this.empleadoService = emplService;
    }

	@PostConstruct
	public void loadInitialData() {
		
		Empleado empl1 = Empleado.builder().nombre("Teresa Gutierrez").build();
		Empleado empl2 = Empleado.builder().nombre("Gaspar Torres").build();
		Empleado empl3 = Empleado.builder().nombre("Marcela Alvarez").build();
		Empleado empl4 = Empleado.builder().nombre("Tomas Hernandez").build();
		
		empl1 = empleadoService.validateAndSave(empl1);
		empl2 = empleadoService.validateAndSave(empl2);
		empl3 = empleadoService.validateAndSave(empl3);
		empl4 = empleadoService.validateAndSave(empl4);
		
		
		DetalleStock detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(125).minimo(5).maximo(50).nombre("CERRADURA KALLAY 4002").build()).build();
		detalleStock.addIngreso(IngresoStock.builder().cantidad(48L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock);
		
		DetalleStock detalleStock1 = DetalleStock.builder().producto(Producto.builder().codigo(551).minimo(1).maximo(10).nombre("BOTAS S/ CORDON TALLE 38").build()).build();
		detalleStock1.addIngreso(IngresoStock.builder().cantidad(8L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock1);
		
		DetalleStock detalleStock2 = DetalleStock.builder().producto(Producto.builder().codigo(554).minimo(1).maximo(5).nombre("BOTAS S/ CORDON TALLE 42").build()).build();
		detalleStock2.addIngreso(IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock2);
		
		DetalleStock detalleStock3 = DetalleStock.builder().producto(Producto.builder().codigo(568).minimo(1).maximo(5).nombre("CAMISA JEAN TALLE 40").build()).build();
		detalleStock3.addIngreso(IngresoStock.builder().cantidad(3L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock3);
		
		DetalleStock detalleStock4 = DetalleStock.builder().producto(Producto.builder().codigo(569).minimo(1).maximo(5).nombre("CAMISA JEAN TALLE 42").build()).build();
		detalleStock4.addIngreso(IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock4);
		
		DetalleStock detalleStock5 = DetalleStock.builder().producto(Producto.builder().codigo(596).minimo(2).maximo(10).nombre("CH. INOX ESM 3MM 1250x3000").build()).build();
		detalleStock5.addIngreso(IngresoStock.builder().cantidad(3L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock5);
		
		DetalleStock detalleStock6 = DetalleStock.builder().producto(Producto.builder().codigo(597).minimo(2).maximo(10).nombre("CH. INOX ESM 2MM 1000x2000").build()).build();
		detalleStock6.addIngreso(IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock6);
		
		DetalleStock detalleStock7 = DetalleStock.builder().producto(Producto.builder().codigo(598).minimo(2).maximo(10).nombre("CH. INOX ESM 1MM 1000x2000").build()).build();
		detalleStock7.addIngreso(IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock7);
		
		DetalleStock detalleStock8 = DetalleStock.builder().producto(Producto.builder().codigo(599).minimo(1).maximo(10).nombre("MASCARA PARA SOLDAR").build()).build();
		detalleStock8.addIngreso(IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock8);
		
		DetalleStock detalleStock9 = DetalleStock.builder().producto(Producto.builder().codigo(600).minimo(1).maximo(10).nombre("MASCARA PARA SOLDAR n3").build()).build();
		detalleStock9.addIngreso(IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
		service.validateAndSave(detalleStock9);

	}

}
