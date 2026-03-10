package com.demo.pipers.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.pipers.service.PdfService;

@RestController
@RequestMapping("/rest-api/generadorQR")
public class GeneradorQRFormRestController {

	@Autowired
	private PdfService pdfService;



		@PostMapping(path = "/egreso-stock", produces = { "application/json" }, consumes = { "application/json" })
		public ResponseEntity<byte[]> generarQR(@RequestBody List<Long> codigos)  throws Exception{			
			byte[] pdfBytes = pdfService.generateSelectedQRPdf(codigos);
		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_PDF);
		    headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"qr_codigos.pdf\"");
		    headers.add("Access-Control-Allow-Origin", "*");
		    headers.add("Access-Control-Allow-Headers", "Content-Type");

		    return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
		}

}
