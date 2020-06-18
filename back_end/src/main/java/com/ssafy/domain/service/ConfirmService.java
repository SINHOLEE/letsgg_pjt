package com.ssafy.domain.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.domain.Confirm;
import com.ssafy.domain.exception.EmptyListException;
import com.ssafy.domain.exception.RepositoryException;
import com.ssafy.domain.repository.IConfirmRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class ConfirmService {
	private final IConfirmRepository repository;

	public List<Confirm> findAll() {

		List<Confirm> list = new ArrayList<>();
		Iterable<Confirm> confirms = repository.findAll();

		confirms.forEach(list::add);

		if (list.isEmpty())
			throw new EmptyListException("가맹 리스트가 없습니다.");

		return list;
	}

	public Confirm saveConfirm(Confirm confirm) {
		
		try{
			return repository.save(confirm);
		} catch (Exception e) {
			throw new RepositoryException(e, e.getMessage());
		}
	}
}
