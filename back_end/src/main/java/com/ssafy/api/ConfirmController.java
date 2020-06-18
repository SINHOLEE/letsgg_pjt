package com.ssafy.api;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.domain.Confirm;
import com.ssafy.domain.exception.EmptyListException;
import com.ssafy.domain.service.ConfirmService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ConfirmController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ConfirmController.class);

	private final ConfirmService service;

	@Autowired
	public ConfirmController(ConfirmService service) {
		this.service = service;
	}

	@GetMapping(value = "/confirm", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Confirm>> findAll() {

		LOGGER.debug("Calling confirm findAll()");

		List<Confirm> list = service.findAll();

		if(list.isEmpty())
			throw new EmptyListException("검색 결과가 없습니다.");
		
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
	
	@PostMapping(path = "confirm", consumes = "application/json", produces = "application/json")
	public ResponseEntity<Confirm> addConfirm(@RequestBody Confirm confirm){
		
		LOGGER.debug("Calling confirm addConfirm()");
		
		Confirm con = service.saveConfirm(confirm);
		
		return new ResponseEntity<>(con, HttpStatus.CREATED);
	}
}
