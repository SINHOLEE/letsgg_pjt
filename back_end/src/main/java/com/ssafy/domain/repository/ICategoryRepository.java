package com.ssafy.domain.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.ssafy.domain.Category;

public interface ICategoryRepository extends CrudRepository<Category, Long>{

	List<Category> findByMapper(String mapper);

}
