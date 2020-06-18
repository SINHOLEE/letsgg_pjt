package com.map.dao;

import java.util.List;

import com.map.dto.Merchant;

public interface MerchantDao {
	public Merchant searchVol(int id);
	public List<Merchant> searchAll();
	public boolean update(Merchant merchant);
}
