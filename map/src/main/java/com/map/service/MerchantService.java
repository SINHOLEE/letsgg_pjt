package com.map.service;

import java.util.List;

import com.map.dto.Merchant;

public interface MerchantService {
	public Merchant searchMerchantDetail(int id);
	
	public List<Merchant> searchAll();
	
	public boolean update(Merchant merchant);
}
