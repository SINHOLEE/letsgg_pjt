package com.ssafy.domain.exception;

public class RepositoryException extends RuntimeException {
	
	private static final long serialVersionUID = 5165424946378528866L;

	public RepositoryException(Throwable throwable, String msg) {
		super(msg, throwable);
	}

	public RepositoryException(String msg) {
		super(msg);
	}

	public RepositoryException(Throwable throwable) {
		super(throwable);
	}
}
