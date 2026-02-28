package com.demo.pipers.rest;

import java.awt.image.BufferedImage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.pipers.service.GeneradorQrService;
import com.demo.pipers.service.PdfService;
@RestController
@RequestMapping("/rest-api/generadorQR")
public class GeneradorQRFormRestController {

	    @Autowired
	    private  PdfService pdfService;
	    
		@Autowired
		private GeneradorQrService qrService;

		@GetMapping("/egreso-stock")
		public ResponseEntity<byte[]> descargar(@RequestParam("codigo") Long codigo) throws Exception {

		    // Generar QR y PDF
		    BufferedImage qrImage = qrService.generateQrImage(codigo, 300, 300);
		    //habria que buscar el nombre del producto
		    byte[] pdfBytes = pdfService.generatePdfWithQr(qrImage, codigo.toString(), "nombre del producto");

		    HttpHeaders headers = new HttpHeaders();
		    headers.setContentType(MediaType.APPLICATION_PDF);
		    headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"qr_" + codigo + ".pdf\"");
		    headers.add("Access-Control-Allow-Origin", "*");
		    headers.add("Access-Control-Allow-Headers", "Content-Type");

		    return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
		}

	}

