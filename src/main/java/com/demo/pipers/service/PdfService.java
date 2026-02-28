package com.demo.pipers.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

import javax.imageio.ImageIO;

import org.springframework.stereotype.Service;

import com.lowagie.text.Document;
import com.lowagie.text.Image;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.Element;


@Service
public class PdfService {

	public byte[] generatePdfWithQr(
	        BufferedImage qrImage,
	        String codigo,
	        String nombreProducto
	) {
	    try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

	        Document document = new Document();
	        PdfWriter.getInstance(document, baos);
	        document.open();

	        // Convertir BufferedImage a Image (lowagie)
	        ByteArrayOutputStream imgBaos = new ByteArrayOutputStream();
	        ImageIO.write(qrImage, "png", imgBaos);
	        Image qr = Image.getInstance(imgBaos.toByteArray());

	        // Centrar QR
	        qr.setAlignment(Image.ALIGN_CENTER);
	        qr.scaleToFit(200, 200);

	        document.add(qr);

	        // Espacio
	        document.add(new Paragraph("\n"));

	        // Código
	        Paragraph codigoP = new Paragraph("Código: " + codigo);
	        codigoP.setAlignment(Element.ALIGN_CENTER);
	        document.add(codigoP);

	        // Nombre del producto
	        Paragraph productoP = new Paragraph(nombreProducto);
	        productoP.setAlignment(Element.ALIGN_CENTER);
	        document.add(productoP);

	        document.close();
	        return baos.toByteArray();

	    } catch (Exception e) {
	        throw new RuntimeException("Error generando PDF con QR", e);
	    }
	}

	
}
