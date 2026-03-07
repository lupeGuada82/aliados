package com.demo.pipers.handler;

public class ServiceException extends RuntimeException {
	private static final long serialVersionUID = -842628698815811018L;

	public ServiceException(String msg) {
		super(msg);
	}

	public ServiceException(String msg, Throwable cause) {
		super(msg, cause);
	}


}
