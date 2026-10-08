//package com.demo.aliados.data;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Profile;
//import org.springframework.stereotype.Component;
//
//import com.demo.aliados.domain.abstracts.Empleado;
//import com.demo.aliados.domain.stock.DetalleStock;
//import com.demo.aliados.domain.stock.IngresoStock;
//import com.demo.aliados.domain.stock.Producto;
//import com.demo.aliados.service.DetalleStockService;
//import com.demo.aliados.service.EmpleadoService;
//
//import jakarta.annotation.PostConstruct;
//
//@Component
//@Generated
//@Profile({ "mem", "memdb", "memdb-liquibase" })
//public class DataLoader {
//
//	private DetalleStockService service;
//	private EmpleadoService empleadoService;
//
//	@Autowired
//	public DataLoader(DetalleStockService service, EmpleadoService emplService) {
//		this.service = service;
//		this.empleadoService = emplService;
//	}
//
//	@PostConstruct
//	public void loadInitialData() {
//
//		Empleado empl1 = Empleado.builder().nombre("Teresa Gutierrez").build();
//		Empleado empl2 = Empleado.builder().nombre("Gaspar Torres").build();
//		Empleado empl3 = Empleado.builder().nombre("Marcela Alvarez").build();
//		Empleado empl4 = Empleado.builder().nombre("Tomas Hernandez").build();
//
//		empl1 = empleadoService.validateAndSave(empl1);
//		empl2 = empleadoService.validateAndSave(empl2);
//		empl3 = empleadoService.validateAndSave(empl3);
//		empl4 = empleadoService.validateAndSave(empl4);
//
////		DetalleStock detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(125).minimo(5).maximo(50).nombre("CERRADURA KALLAY 4002").build()).build();
////		detalleStock.addIngreso(IngresoStock.builder().cantidad(48L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock);
////		
////		DetalleStock detalleStock1 = DetalleStock.builder().producto(Producto.builder().codigo(551).minimo(1).maximo(10).nombre("BOTAS S/ CORDON TALLE 38").build()).build();
////		detalleStock1.addIngreso(IngresoStock.builder().cantidad(8L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock1);
////		
////		DetalleStock detalleStock2 = DetalleStock.builder().producto(Producto.builder().codigo(554).minimo(1).maximo(5).nombre("BOTAS S/ CORDON TALLE 42").build()).build();
////		detalleStock2.addIngreso(IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock2);
////		
////		DetalleStock detalleStock3 = DetalleStock.builder().producto(Producto.builder().codigo(568).minimo(1).maximo(5).nombre("CAMISA JEAN TALLE 40").build()).build();
////		detalleStock3.addIngreso(IngresoStock.builder().cantidad(3L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock3);
////		
////		DetalleStock detalleStock4 = DetalleStock.builder().producto(Producto.builder().codigo(569).minimo(1).maximo(5).nombre("CAMISA JEAN TALLE 42").build()).build();
////		detalleStock4.addIngreso(IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock4);
////		
////		DetalleStock detalleStock5 = DetalleStock.builder().producto(Producto.builder().codigo(596).minimo(2).maximo(10).nombre("CH. INOX ESM 3MM 1250x3000").build()).build();
////		detalleStock5.addIngreso(IngresoStock.builder().cantidad(3L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock5);
////		
////		DetalleStock detalleStock6 = DetalleStock.builder().producto(Producto.builder().codigo(597).minimo(2).maximo(10).nombre("CH. INOX ESM 2MM 1000x2000").build()).build();
////		detalleStock6.addIngreso(IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock6);
////		
////		DetalleStock detalleStock7 = DetalleStock.builder().producto(Producto.builder().codigo(598).minimo(2).maximo(10).nombre("CH. INOX ESM 1MM 1000x2000").build()).build();
////		detalleStock7.addIngreso(IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock7);
////		
////		DetalleStock detalleStock8 = DetalleStock.builder().producto(Producto.builder().codigo(599).minimo(1).maximo(10).nombre("MASCARA PARA SOLDAR").build()).build();
////		detalleStock8.addIngreso(IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock8);
////		
////		DetalleStock detalleStock9 = DetalleStock.builder().producto(Producto.builder().codigo(600).minimo(1).maximo(10).nombre("MASCARA PARA SOLDAR n3").build()).build();
////		detalleStock9.addIngreso(IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
////		service.validateAndSave(detalleStock9);
//
//		DetalleStock detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(125).minimo(5).maximo(50).nombre("CERRADURA KALLAY 4002").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(98L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(551).minimo(1).maximo(5).nombre("BOTAS S/ CORDON TALLE 38").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(10L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(554).minimo(1).maximo(5).nombre("BOTAS S/ CORDON TALLE 42").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(568).minimo(1).maximo(5).nombre("CAMISA JEAN TALLE 40").build())
//				.build();
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(569).minimo(1).maximo(5).nombre("CAMISA JEAN TALLE 42").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(596).minimo(2).maximo(10).nombre("CH. INOX ESM 3MM 1250x3000").build())
//				.build();
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(597).minimo(2).maximo(10).nombre("CH. INOX ESM 2MM 1000x2000").build())
//				.build();
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(598).minimo(2).maximo(10).nombre("CH. INOX ESM 1MM 1000x2000").build())
//				.build();
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(599).minimo(1).maximo(10).nombre("MASCARA PARA SOLDAR").build())
//				.build();
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(600).minimo(2).maximo(10).nombre("BARBIJO PARA PINTURA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(6L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(601).minimo(1).maximo(4).nombre("NIVEL DE 450MM").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(602).minimo(1).maximo(4).nombre("NIVEL DE 900MM").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(603).minimo(1).maximo(5).nombre("ESCUADRA REGULABLE").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(604).minimo(1).maximo(5).nombre("REGLA").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(605).minimo(1).maximo(10).nombre("FALSA ESCUADRA").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(606).minimo(1).maximo(10).nombre("PINZA PERRO").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(607).minimo(1).maximo(10).nombre("PINZA PICO DE LORO").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(608).minimo(1).maximo(10).nombre("ESLINGA 5000KG").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(609).minimo(1).maximo(5).nombre("ESLINGA PLANA DE 2000KG").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(610).minimo(1).maximo(5).nombre("AMARRE DE TRINQUETE").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(611).minimo(1).maximo(5).nombre("CANDADO CON LLAVE").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(3L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(612).minimo(1).maximo(10).nombre("PINZA CON ALICATE").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(613).minimo(1).maximo(10).nombre("MARTILLO DE BOLA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(614).minimo(1).maximo(10).nombre("MARTILLO DE GOMA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(615).minimo(1).maximo(10).nombre("LAPIZ PARA METAL").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(
//						Producto.builder().codigo(616).minimo(1).maximo(10).nombre("DESTORNILLADOR DE PALETA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(617).minimo(1).maximo(10).nombre("DESTORNILLADOR PHILIPS").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(618).minimo(1).maximo(10).nombre("ESCUADRA ANGULAR 7\"").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(619).minimo(1).maximo(5).nombre("CUTTER MULTIUSO").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(620).minimo(1).maximo(5).nombre("TIJERA PARA CHAPAS IZQUIERDA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(
//						Producto.builder().codigo(621).minimo(1).maximo(5).nombre("TIJERA PARA CHAPAS DERECHA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(622).minimo(1).maximo(5).nombre("TIJERA PARA CHAPAS RECTA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(623).minimo(1).maximo(5).nombre("SET ATORNILLADORES DE 31 PIEZAS").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(624).minimo(1).maximo(5).nombre("DESTORNILLAR PALETA DE 10x203MM").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(625).minimo(1).maximo(5).nombre("DESTORNILLADOR PHILIPS DE 152MM").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(626).minimo(2).maximo(10).nombre("ENDURECEDOR DE MASILLA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(627).minimo(1).maximo(5).nombre("CINTA DELIMITADORA DE 50x33M").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(628).minimo(1).maximo(5).nombre("ADHESIVO CHAUCHO").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(629).minimo(1).maximo(5).nombre("CINTA ANTIRESBALANTE").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(630).minimo(10).maximo(100)
//				.nombre("SELLADOR DE POLIURETANO SALCHICHA 600ML").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(631).minimo(20).maximo(300).nombre("CERRADURA KALLAY 4000").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(141L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(632).minimo(6).maximo(60)
//				.nombre("RUEDA CON BASE GIRATORIA CON FRENO").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(633).minimo(6).maximo(60)
//				.nombre("RUEDA CON BASE GIRATORIA SIN FRENO").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(634).minimo(2).maximo(20)
//				.nombre("RODILLO PARA PULIR INOX DE 100x100 VERDE").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(635).minimo(2).maximo(20)
//				.nombre("CEPILLO CIRCULAR 75MM ALAMBRE DE LATON").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(4L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(636).minimo(2).maximo(20)
//				.nombre("CEPILLO CIRCULAR 75MM ALAMBRE DE ACERO").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(637).minimo(2).maximo(20)
//				.nombre("CEPILLO COPA CON ALAMBRE DE LATON 75MM").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(638).minimo(2).maximo(20)
//				.nombre("CEPILLO TIPO PINCEL ALAMBRE DE LATON").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(639).minimo(2).maximo(20)
//				.nombre("CEPILLO TIPO PINCEL ALAMBRE DE ACERO 25MM").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(640).minimo(2).maximo(20)
//				.nombre("CEPILLO TIPO CIRCULAR ALAMBRE DE ACERO").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(641).minimo(1).maximo(20)
//				.nombre("ESPOJA DE LIJA MULTIUSO 100x70x25 G80").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(4L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(642).minimo(1).maximo(20).nombre("CEPILLO DE LAMINA 30x20MM G60").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(643).minimo(2).maximo(20).nombre("CEPILLO DE LAMINA 30x20MM G80").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(644).minimo(1).maximo(10)
//				.nombre("ESCALERA DE ALUMINIO EXTENDIBLE DE 2MTS").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(
//						Producto.builder().codigo(645).minimo(4).maximo(50).nombre("RUEDA PARA PORTON C/S V50").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(4L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(
//						Producto.builder().codigo(646).minimo(4).maximo(50).nombre("RUEDA PARA PORTON S/S V70").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(10L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(647).minimo(2).maximo(50).nombre("CIERRE MEDIA VUELTA TIPO MONEDA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(8L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(648).minimo(2).maximo(50).nombre("RETEN DOBLE BALA DE 50").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(8L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(649).minimo(4).maximo(50)
//				.nombre("RUEDA DE VENTANA CORREDIZA CANAL U 20MM").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(4L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(650).minimo(4).maximo(50)
//				.nombre("RUEDA VENTANA CORREDIZA C/S TEFLON 30MM").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(4L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(651).minimo(4).maximo(50).nombre("RUEDA VENTANA CORREDIZA METALICA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(652).minimo(4).maximo(30).nombre("RUEDA CANAL U METALICA S/S 100").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(4L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(653).minimo(4).maximo(50).nombre("RUEDA CANAL U METALICA S/S 120").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(654).minimo(4).maximo(50).nombre("RUEDA CANAL V METALICA S/S 150").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(4L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(655).minimo(2).maximo(30).nombre("PATA REGULABLE").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(9L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(656).minimo(20).maximo(500).nombre("BISAGRA POMELA DE 80").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(180L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(657).minimo(20).maximo(500).nombre("BISAGRA POMELA DE 60").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(400L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(658).minimo(5).maximo(50)
//				.nombre("ESTABILIZAR DOBLE PARA PORTON CORREDIZO").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(11L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(659).minimo(6).maximo(60).nombre("PRENSACABLE GRANDE").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(23L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(660).minimo(4).maximo(40).nombre("TENSOR DE CABLE CHICOS").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(3L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(661).minimo(25).maximo(500).nombre("DISCO FLAP G60 x 155mm x7\"").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(20L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(662).minimo(25).maximo(500).nombre("DISCO DE CORTE DE 400x4,5x24").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(10L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(663).minimo(25).maximo(500).nombre("DISCO DE AMOLAR DE 178,4x8x22,2").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(140L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(664).minimo(25).maximo(500).nombre("DISCO DE AMOLAR 178x7x22,2").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(73L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(665).minimo(25).maximo(500).nombre("DISCO DE DESBASTE 115x4,8X4,2").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(170L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(666).minimo(25).maximo(500).nombre("DISCO CORTE DE 115x1x22,2").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(50L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(667).minimo(25).maximo(2000).nombre("TARUGO COMUN Nro 12").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(410L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(668).minimo(25).maximo(2000)
//				.nombre("TORNILLO AUTOPERFORANTE 3/8 PH CABEZA FRESADA").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1922L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(669).minimo(25).maximo(2000)
//				.nombre("TORNILLO CABEZA HEXAGONAL 5/16 x 55").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(900L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(670).minimo(25).maximo(2000)
//				.nombre("TONILLO DE CABEZA HEXAGONAL DE 3/8x50").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(54L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(671).minimo(2).maximo(50)
//				.nombre("ALAMBRE FLUX MIG S/ GAS 5KG DE 0,9MM").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(3L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(672).minimo(2).maximo(50)
//				.nombre("ALAMBRE MIG C/ GAS DE 15KG DE 0,8MM").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(47L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(673).minimo(2).maximo(40).nombre("ALAMBRE DE ALUMINIO DE 0,8").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(674).minimo(1).maximo(10).nombre("CEPILLO DE ACERO").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(675).minimo(1).maximo(10000).nombre("ELECTRODO 7018").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(676).minimo(1).maximo(5).nombre("PISTOLA NEUMATICA PARA SELLADOR").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(677).minimo(1).maximo(5).nombre("PISTOLA DE SOPLETE CON JARRO").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(678).minimo(1).maximo(20).nombre("AMOLADORA DE 4 PULGADAS").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(7L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(679).minimo(1).maximo(100).nombre("ESTAÑO").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(8L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(
//						Producto.builder().codigo(680).minimo(1).maximo(10).nombre("SOLDADORA INVERTE DE 150A").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(2L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(
//						Producto.builder().codigo(681).minimo(1).maximo(10).nombre("SOLDADORA INVERTE DE 120A").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(1L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(682).minimo(1).maximo(2000)
//				.nombre("TORNILLO CABEZA HEXAGONAL 5/16x50 PUNTA MECHA").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(157L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(683).minimo(2).maximo(50).nombre("BUSA TORCHA PLASMA CNC").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(3L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(684).minimo(2).maximo(50).nombre("TOBERA TORCHA MANUAL PLASMA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(6L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(685).minimo(2).maximo(50).nombre("ELECTRO MANUAL PARA PLASMA").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(7L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(686).minimo(2).maximo(50).nombre("TOBERA TORCHA CNC 65A").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(24L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(687).minimo(20).maximo(2000)
//				.nombre("TORNILLO CABEZA HEZAGONAL 5/16x25 PUNTA MECHA").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(51L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(688).minimo(20).maximo(2000)
//				.nombre("TORNILLA CABEZA HEXAGONAL 5/16x35 PUNTA MECHA ARANDELA DE GOMA").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(34L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(Producto.builder().codigo(689).minimo(20).maximo(2000)
//				.nombre("TORNILLA CABEZA HEXAGONAL 5/16x50 PUNTA MECHA ARANDELA DE ESTAÑO").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder().producto(
//				Producto.builder().codigo(690).minimo(2).maximo(50).nombre("ELECTRODO DE TUNGSTENO 2,4MMx175").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(691).minimo(2).maximo(50).nombre("RUEDA C/S CANAL V70").build())
//				.build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(5L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//
//		detalleStock = DetalleStock.builder()
//				.producto(Producto.builder().codigo(692).minimo(50).maximo(2000).nombre("TORNILLO T3").build()).build();
//		detalleStock.addIngreso(
//				IngresoStock.builder().cantidad(250L).observacion("Carga inicial").responsable(empl4).build());
//		service.validateAndSave(detalleStock);
//	}
//
//}
