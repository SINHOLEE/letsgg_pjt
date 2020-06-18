package com.ssafy.api.handler;

public class CUserNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = -4261799180973836787L;

	public CUserNotFoundException(String msg, Throwable t) {
		super(msg, t);
	}

	public CUserNotFoundException(String msg) {
		super(msg);
	}

	public CUserNotFoundException() {
		super();
	}
}
