package com.demo.pipers.handler;

import org.springframework.http.HttpStatus;

public class ErrorDTO {
	
	private HttpStatus status;

	  private String error;

	  public ErrorDTO(HttpStatus status, String error) {
	    this.setError(error);
	    this.status = status;
	  }

	  @Override
	  public String toString() {
	    return status.value() + " - " + status.getReasonPhrase() + ": " + error;
	  }

	  public HttpStatus getStatus() {
	    return status;
	  }

	  public String getError() {
	    return error;
	  }

	  public void setError(String error) {
	    this.error = error;
	  }


}
