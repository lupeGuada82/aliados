package com.demo.aliados.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest-api/hello")
public class HelloRestController {

	@GetMapping
	public String hello() {
		return "Hola desde Spring Boot";
	}
}
