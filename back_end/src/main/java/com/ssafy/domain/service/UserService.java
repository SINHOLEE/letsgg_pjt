package com.ssafy.domain.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.handler.CUserNotFoundException;
import com.ssafy.domain.User;
import com.ssafy.domain.exception.RepositoryException;
import com.ssafy.domain.repository.IUserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class UserService {

	private final IUserRepository repository;
	
	public void postUser(User user) {
		
		try{
			repository.save(user);
		} catch (Exception e) {
			throw new RepositoryException(e, e.getMessage());
		}
	}
	
	public List<User> findAll() {

		List<User> list = new ArrayList<>();
		Iterable<User> users = repository.findAll();

		users.forEach(list::add);
		
		if(list.isEmpty()) 
			throw new RepositoryException("등록된 유저가 없습니다.");
		
		return list;
	}
	
	public User findByEmail(String email) {
		
		try {
			return repository.findByEmail(email).orElseThrow(CUserNotFoundException::new);
		} catch (Exception e) {
			throw new RepositoryException(e, e.getMessage());
		}
	}
	
	public void deleteUser(String email) {
		
		try {
			repository.deleteByEmail(email);
		} catch (Exception e) {
			throw new RepositoryException(e, e.getMessage());
		}
	}
}
