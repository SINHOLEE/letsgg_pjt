package com.ssafy.domain.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.ssafy.domain.User;

public interface IUserRepository extends CrudRepository<User, Long> {

	Optional<User> findByEmail(String email);

	void deleteByEmail(String email);

}
