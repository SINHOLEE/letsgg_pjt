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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.domain.Category;
import com.ssafy.domain.exception.EmptyListException;
import com.ssafy.domain.service.CategoryService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CategoryController {

	private static final Logger LOGGER = LoggerFactory.getLogger(CategoryController.class);

	private final CategoryService service;

	@Autowired
	public CategoryController(CategoryService service) {
		this.service = service;
	}

	@GetMapping(value = "/categories", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Category>> findAll() {

		LOGGER.debug("Calling category findAll()");

		List<Category> list = service.findAll();

		if(list.isEmpty())
			throw new EmptyListException("검색 결과가 없습니다.");
		
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
}
