package com.ssafy.domain.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.api.handler.CUserNotFoundException;
import com.ssafy.domain.exception.RepositoryException;
import com.ssafy.domain.repository.IUserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class MyUserDetailService implements UserDetailsService {

	private final IUserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) {
		
		try {
			return userRepository.findByEmail(email).orElseThrow(CUserNotFoundException::new);
		} catch (Exception e) {
			throw new RepositoryException(e, e.getMessage());
		}
	}
}
