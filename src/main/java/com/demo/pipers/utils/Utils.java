package com.demo.pipers.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/***
 * Clase utilizada para implementar cosas de utilidad y que podrían ser usadas en varios lugares
 */
public class Utils {


	    /**	Formato solo hora**/
	    public static final DateTimeFormatter HORA_FORMATTER = DateTimeFormatter.ofPattern("HH:mm:ss");

	   /**Fecha completa**/
	    public static final DateTimeFormatter FECHA_HORA_FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");



	    public static String formatHora(LocalDateTime fechaHora) {
	        if (fechaHora == null) return null;
	        return fechaHora.format(HORA_FORMATTER);
	    }

	    public static String formatFechaHora(LocalDateTime fechaHora) {
	        if (fechaHora == null) return null;
	        return fechaHora.format(FECHA_HORA_FORMATTER);
	    }
	}

