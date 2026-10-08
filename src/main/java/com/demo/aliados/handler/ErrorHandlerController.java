package com.demo.aliados.handler;


import org.hibernate.HibernateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class ErrorHandlerController {



	private Logger logger = LoggerFactory.getLogger(getClass());

	@ExceptionHandler(ServiceException.class)
	public ResponseEntity<ErrorDTO> handleServiceException(ServiceException rse) {
		logger.error(rse.getMessage(), rse.getCause());
		var dto = new ErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR, rse.getMessage());
		return ResponseEntity.status(dto.getStatus()).contentType(MediaType.APPLICATION_JSON).body(dto);
	}

	@ExceptionHandler(DataAccessException.class)
	public ResponseEntity<ErrorDTO> handleDataAccessException(DataAccessException dae) {
		logger.error(dae.getMessage(), dae);
		var dto = new ErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR, "Error en el acceso a los datos.");
		return ResponseEntity.status(dto.getStatus()).contentType(MediaType.APPLICATION_JSON).body(dto);
	}

	@ExceptionHandler(HibernateException.class)
	public ResponseEntity<ErrorDTO> handleHibernateException(HibernateException he) {
		logger.error(he.getMessage(), he);
		var dto = new ErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR,"Error en el acceso a los datos.");
		return ResponseEntity.status(dto.getStatus()).contentType(MediaType.APPLICATION_JSON).body(dto);
	}


	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ErrorDTO> handleThrowable(RuntimeException ex) {
//		ex instanceof AccessDeniedException ||
	    if (  ex instanceof ForbiddenException) {
	        throw new RuntimeException(ex); // envuelve la excepción
	    }

	    logger.error(ex.getMessage(), ex);
	    var dto = new ErrorDTO(HttpStatus.INTERNAL_SERVER_ERROR,
	            "Ha ocurrido un error inesperado. Por favor vuelva a ingresar a la aplicación. En caso que persista, por favor comunicarse con el Administrador");

	    return ResponseEntity.status(dto.getStatus())
	                         .contentType(MediaType.APPLICATION_JSON)
	                         .body(dto);
	}

}
