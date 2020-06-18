package com.map.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.map.dao.MerchantDaoI;
import com.map.dto.Merchant;

@Service
public class MerchantServiceI implements MerchantService {
	@Autowired
	private MerchantDaoI dao;
	
	@Override
	public Merchant searchMerchantDetail(int id) {
		return dao.searchVol(id);
	}
	
	@Override
	public List<Merchant> searchAll(){
		return dao.searchAll();
	}
	
	@Override
	public boolean update(Merchant merchant) {
		return dao.update(merchant);
	}
}
