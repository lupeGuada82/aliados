package com.demo.aliados.service;

import java.awt.image.BufferedImage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

@Service
public class GeneradorQrService {
	
	@Value("${frontend.base-url}")
	private String frontendBaseUrl;

//podriamos hacer una clase y hacer stativ este metodo
	public BufferedImage generateQrImage(Long codigo, int width, int height) throws WriterException {

        String url = frontendBaseUrl + "?codigo=" + codigo;

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(
                url,
                BarcodeFormat.QR_CODE,
                width,
                height
        );
		return MatrixToImageWriter.toBufferedImage(bitMatrix);
	}
}
