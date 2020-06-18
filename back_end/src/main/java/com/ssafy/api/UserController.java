package com.ssafy.api;

import java.util.List;

import com.ssafy.domain.User;
import com.ssafy.domain.exception.EmptyListException;
import com.ssafy.domain.exception.NotFoundException;
import com.ssafy.domain.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	private final UserService service;
	
	@Autowired
	public UserController(UserService service) {
		this.service = service;
	}
	
	@PostMapping(value = "/")
	public ResponseEntity<Void> postUser(@Valid @RequestBody User user) {

		LOGGER.debug("Calling user postUser()");

		service.postUser(user);
		
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping(value = "/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<User> findByEmail(@PathVariable String email) {

		LOGGER.debug("Calling user findByEmail()");

		User user = service.findByEmail(email);

		if (user == null) 
			throw new NotFoundException(email + " 회원 정보를 찾을 수 없습니다.");

		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping(value = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<User>> findAll() {

		LOGGER.debug("Calling user findAll()");

		List<User> list = service.findAll();
		
		if(list.isEmpty()) 
			throw new EmptyListException("등록된 유저가 없습니다.");

		return new ResponseEntity<>(list, HttpStatus.OK);
	}

	@DeleteMapping(value = "/{email}")
	public ResponseEntity<Void> deleteUser(@PathVariable String email) {

		LOGGER.debug("Calling user deleteUser()");

		service.deleteUser(email);

		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
