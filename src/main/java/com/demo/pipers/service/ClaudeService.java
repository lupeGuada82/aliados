package com.demo.pipers.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import com.demo.pipers.dto.ItemProcesadoDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

@Service
public class ClaudeService {

	private final RestClient restClient;
	private final ObjectMapper objectMapper;

	@Value("${anthropic.api-key}")
	private String apiKey;

	@Value("${anthropic.model}")
	private String model;

	private static final Set<String> TIPOS_PERMITIDOS = Set.of("application/pdf", "image/jpeg", "image/png",
			"image/webp", "image/gif");

	public ClaudeService(RestClient.Builder builder) {
		this.restClient = builder.baseUrl("https://api.anthropic.com").build();
		this.objectMapper = new ObjectMapper();
	}

	public List<ItemProcesadoDTO> procesarArchivo(MultipartFile file) throws IOException {

		validarArchivo(file);
		String base64 = Base64.getEncoder().encodeToString(file.getBytes());
		Map<String, Object> archivo;
		if (esPdf(file)) {
			archivo = crearDocumentoPdf(base64);
		} else {
			archivo = crearImagen(base64, file.getContentType());
		}

		Map<String, Object> prompt = crearPrompt();

		Map<String, Object> request = Map.of("model", model, "max_tokens", 4096, "messages",
				List.of(Map.of("role", "user", "content", List.of(archivo, prompt))));

		String respuesta = restClient.post().uri("/v1/messages").header("x-api-key", apiKey)
				.header("anthropic-version", "2023-06-01").contentType(MediaType.APPLICATION_JSON).body(request)
				.retrieve().body(String.class);

		return extraerItems(respuesta);

	}

	private List<ItemProcesadoDTO> extraerItems(String respuesta) throws IOException {

		JsonNode root = objectMapper.readTree(respuesta);

		String texto = root.path("content").findValue("text").asText();

		texto = texto.trim();

		// Por si Claude devuelve ```json ... ```
		if (texto.startsWith("```json")) {
			texto = texto.substring(7);
		} else if (texto.startsWith("```")) {
			texto = texto.substring(3);
		}

		if (texto.endsWith("```")) {
			texto = texto.substring(0, texto.length() - 3);
		}

		texto = texto.trim();

		return objectMapper.readValue(texto, new TypeReference<List<ItemProcesadoDTO>>() {
		});
	}

//	private String extraerJson(String respuesta) throws IOException {
//
//		ObjectMapper mapper = new ObjectMapper();
//
//		JsonNode root = mapper.readTree(respuesta);
//
//		String texto = root.path("content").findValue("text").asText();
//
//		texto = texto.trim();
//
//		if (texto.startsWith("```json")) {
//			texto = texto.substring(7);
//		}
//
//		if (texto.endsWith("```")) {
//			texto = texto.substring(0, texto.length() - 3);
//		}
//
//		return texto.trim();
//	}

	private void validarArchivo(MultipartFile file) {

		if (file == null || file.isEmpty()) {
			throw new IllegalArgumentException("Debe seleccionar un archivo");
		}

		String contentType = file.getContentType();

		if (contentType == null) {
			throw new IllegalArgumentException("No se pudo determinar el tipo de archivo");
		}

		if (!TIPOS_PERMITIDOS.contains(contentType)) {
			throw new IllegalArgumentException("Solo se permiten archivos PDF o imágenes JPG, PNG y WEBP");
		}

	}

	private boolean esPdf(MultipartFile file) {
		return "application/pdf".equals(file.getContentType());
	}

	private Map<String, Object> crearDocumentoPdf(String base64) {

		return Map.of("type", "document", "source",
				Map.of("type", "base64", "media_type", "application/pdf", "data", base64));
	}

	private Map<String, Object> crearImagen(String base64, String mediaType) {

		return Map.of("type", "image", "source", Map.of("type", "base64", "media_type", mediaType, "data", base64));
	}

	private Map<String, Object> crearPrompt() {

		return Map.of("type", "text", "text", """
				Analiza el archivo adjunto y extrae todos los ítems que aparecen.

				Para cada ítem devuelve:

				- descripcion
				- cantidad
				- unidad

				Devuelve exclusivamente un JSON válido con este formato:

				[
				  {
				    "descripcion": "string",
				    "cantidad": 0,
				    "unidad": "string"
				  }
				]

				No agregues explicaciones.
				No inventes información.
				""");
	}
}