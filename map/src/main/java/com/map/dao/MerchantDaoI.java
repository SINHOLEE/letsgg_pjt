package com.map.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.map.dto.Merchant;;

@Repository
public class MerchantDaoI implements MerchantDao {

	private final static String ns = "com.map.model.merchantmapper.";

	@Autowired
	SqlSession session;

	@Override
	public Merchant searchVol(int id) {
		String statement = ns + "selectOne";
		
		return session.selectOne(statement, id);
	}

	@Override
	public List<Merchant> searchAll() {
		String statement = ns +"select";
		return session.selectList(statement);
	}
	
	@Override
	public boolean update(Merchant merchant) {
		String statement = ns+"update";
		return session.update(statement, merchant)>0;
	}
}
