package com.ssafy.domain.exception;

public class ApplicationException extends RuntimeException {
	
	private static final long serialVersionUID = 3008056053741573535L;

	public ApplicationException(Throwable throwable, String msg) {
		super(msg, throwable);
	}

	public ApplicationException(String msg) {
		super(msg);
	}

	public ApplicationException(Throwable throwable) {
		super(throwable);
	}
}
