package com.ssafy.api.handler;

import com.ssafy.domain.exception.EmptyListException;
import com.ssafy.domain.exception.NotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(value = NotFoundException.class)
	public String handleNotFoundException(NotFoundException e) {
		return e.getMessage();
	}

	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ExceptionHandler(value = EmptyListException.class)
	public String handleEmptyListException(EmptyListException e) {
		return e.getMessage();
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler(value = Exception.class)
	public String handleException(Exception e) {
		return e.getMessage();
	}
}
