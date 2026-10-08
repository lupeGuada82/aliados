package com.demo.aliados.utils;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class TextoUtils {

    // Saca tildes, pasa a mayúsculas, colapsa espacios
    public static String normalizar(String s) {
        if (s == null) return "";
        String sinTildes = Normalizer.normalize(s, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "");
        return sinTildes.toUpperCase()
                .replaceAll("[^A-Z0-9 ]", " ") // saca puntuación rara
                .replaceAll("\\s+", " ")
                .trim();
    }

    // Extrae tokens que parecen códigos: números o alfanuméricos con dígitos
    public static List<String> extraerCodigos(String texto) {
        Matcher m = Pattern.compile("[A-Z0-9]*\\d+[A-Z0-9]*")
                .matcher(normalizar(texto));
        List<String> codigos = new ArrayList<>();
        while (m.find()) {
            String tok = m.group();
            if (tok.length() >= 2) codigos.add(tok); // filtra ruido de 1 char
        }
        return codigos;
    }

    // Palabras "significativas" (sin códigos, sin palabras muy cortas/ruido)
    public static Set<String> extraerPalabrasClave(String texto, Set<String> stopwords) {
        return Arrays.stream(normalizar(texto).split(" "))
                .filter(w -> w.length() >= 3)
                .filter(w -> !stopwords.contains(w))
                .filter(w -> !w.matches("\\d+")) // los números ya se tratan como código
                .collect(Collectors.toSet());
    }
}