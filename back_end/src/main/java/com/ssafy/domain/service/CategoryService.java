package com.ssafy.domain.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.domain.Category;
import com.ssafy.domain.exception.EmptyListException;
import com.ssafy.domain.repository.ICategoryRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class CategoryService {
	
	private final ICategoryRepository repository;
	
	public List<Category> findAll() {

		List<Category> list = new ArrayList<>();
		Iterable<Category> categories = repository.findAll();

		categories.forEach(list::add);

		if(list.isEmpty()) 
			throw new EmptyListException("카테고리 리스트가 없습니다.");
		
		return list;
	}
}
