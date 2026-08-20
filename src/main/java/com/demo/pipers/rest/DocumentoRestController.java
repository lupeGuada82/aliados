package com.demo.pipers.rest;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.pipers.service.ClaudeService;

@RestController
@RequestMapping("/rest-api/documentos")
public class DocumentoRestController {
	@Autowired
	private ClaudeService claudeService;

	@PostMapping("/procesar")
	public ResponseEntity<String> procesar(@RequestParam("file") MultipartFile file) throws IOException {

		String resultado = claudeService.procesarArchivo(file);

		return ResponseEntity.ok(resultado);

	}
}
