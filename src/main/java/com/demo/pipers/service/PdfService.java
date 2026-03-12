package com.demo.pipers.service;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.pipers.domain.stock.Producto;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

@Service
public class PdfService {

	@Autowired
	private GeneradorQrService qrService;

	@Autowired
	private ProductoService productoService;

	public byte[] generateSelectedQRPdf(List<Long> codigos) throws Exception {

	    ByteArrayOutputStream baos = new ByteArrayOutputStream();

	    Document document = new Document(PageSize.A4, 10, 10, 10, 10);
	    PdfWriter.getInstance(document, baos);
	    document.open();

	    PdfPTable table = new PdfPTable(3); // 3 columnas
	    table.setWidthPercentage(100);
	    table.setSpacingBefore(10);

		List<Producto> productos = productoService.findByCodigoIn(codigos);

		Font nombreFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
		Font codigoFont = FontFactory.getFont(FontFactory.HELVETICA, 9);

		// transformo cada producto en una celda PDF donde tiene nombre qr y Codigo
		List<PdfPCell> celdas = productos.stream().map(producto -> {
			try {
				BufferedImage qrImage = qrService.generateQrImage(producto.getCodigo(), 250, 250);
				ByteArrayOutputStream imgBytes = new ByteArrayOutputStream();
				ImageIO.write(qrImage, "png", imgBytes);
				Image qr = Image.getInstance(imgBytes.toByteArray());
				qr.scaleToFit(150, 150);
				qr.setAlignment(Element.ALIGN_CENTER);

				PdfPCell cell = new PdfPCell();
				cell.setFixedHeight(260);
				cell.setHorizontalAlignment(Element.ALIGN_CENTER);
				cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
				cell.setPadding(10);
				cell.setBorder(Rectangle.BOX);

				Paragraph nombre = new Paragraph(producto.getNombre(), nombreFont);
				nombre.setAlignment(Element.ALIGN_CENTER);

				Paragraph codigoText = new Paragraph(String.valueOf(producto.getCodigo()), codigoFont);
				codigoText.setAlignment(Element.ALIGN_CENTER);

				Paragraph spacer = new Paragraph(" ");
				spacer.setSpacingBefore(15);

				cell.addElement(nombre);
				cell.addElement(spacer);
				cell.addElement(qr);
				cell.addElement(codigoText);

				return cell;
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		}).collect(Collectors.toList());
        //Los for simples los dejo ya que se necesita dinamicamente ir agregando cosas, despues ver IntStream
		// Agregar celdas a la tabla con paginación cada 9
		for (int i = 0; i < celdas.size(); i++) {
			table.addCell(celdas.get(i));
			if ((i + 1) % 9 == 0) {
				document.add(table);
				document.newPage();
				table = new PdfPTable(3);
				table.setWidthPercentage(100);
			}
		}

		// Completar última fila si faltan celdas
		int remainingColumns = celdas.size() % 3;
		if (remainingColumns != 0) {
			for (int i = remainingColumns; i < 3; i++) {
				PdfPCell emptyCell = new PdfPCell(new Phrase(""));
				emptyCell.setBorder(Rectangle.NO_BORDER);
				table.addCell(emptyCell);
			}
		}

		if (celdas.size() % 9 != 0) {
			document.add(table);
		}

		document.close();
		return baos.toByteArray();
	}
}
