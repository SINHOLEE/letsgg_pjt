package com.ssafy.domain.service;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.domain.Merchant;
import com.ssafy.domain.exception.EmptyListException;
import com.ssafy.domain.exception.NotFoundException;
import com.ssafy.domain.repository.IMerchantRepository;
import com.ssafy.dto.MerchantDto;
import com.ssafy.dto.PageDto;
import com.ssafy.logic.PagingLogic;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class MerchantService extends PagingLogic{

	private static final int KILLOMETER = 6371;
	
	private final IMerchantRepository repository;
	
	@PersistenceContext
	private EntityManager em;
	
	private String createQueryByNearByMerchants(String condition) {
		
		return new StringBuilder()
						.append("SELECT *, :unit * 2 * ASIN(SQRT(POWER(SIN((:latitude - makedb_merchant.latitude) * pi()/180 / 2), 2) ")
						.append("+ COS(:latitude * pi()/180) * COS(makedb_merchant.latitude * pi()/180) ")
						.append("* POWER(SIN((:longitude - makedb_merchant.longitude) * pi()/180 / 2), 2))) AS distance ")
						.append("FROM makedb_merchant WHERE (latitude BETWEEN :bottomLeftLatitude AND :topRightLatitude")
						.append(") AND (longitude BETWEEN :bottomLeftLongitude AND :topRightLongitude ) AND ")
						.append(condition)
						.append(":parameter")
						.append(" ORDER BY distance").toString();
	}
	
	public Merchant findOne(Long id) {
		
		Optional<Merchant> optional = repository.findById(id);
		
		if(!optional.isPresent()) 
			throw new NotFoundException(id + " 가맹점을 찾을 수 없습니다.");
			
		return optional.get();
	}
	
	public Page<Merchant> findAll(Integer page, Integer size) {
		
		Page<Merchant> merchants = repository.findAllByOrderByIdAsc(PageRequest.of(page, size));
		
		if(merchants.isEmpty()) 
			throw new EmptyListException("가맹점 리스트를 찾을 수 없습니다.");
		
		return merchants;
	}
	
	@SuppressWarnings("unchecked")
	public PageDto findByCmpnmName(String cmpnmNm, String latitude, String longitude, String bottomLeftLatitude, String topRightLatitude, String bottomLeftLongitude, String topRightLongitude, Integer page, Integer size) {

		String sql = createQueryByNearByMerchants("cmpnm_nm LIKE ");
		
		List<MerchantDto> merchantDtos = em.createNativeQuery(sql, "merchantDtoMapper")
				.setParameter("unit", KILLOMETER)
				.setParameter("latitude", latitude)
				.setParameter("longitude", longitude)
				.setParameter("bottomLeftLatitude", bottomLeftLatitude)
				.setParameter("topRightLatitude", topRightLatitude)
				.setParameter("bottomLeftLongitude", bottomLeftLongitude)
				.setParameter("topRightLongitude", topRightLongitude)
				.setParameter("parameter", "%" + cmpnmNm + "%")
				.getResultList();
		
		return getPageDto(merchantDtos, page, size);
	}
	
	@SuppressWarnings("unchecked")
	public PageDto findMerchantsByCategoryType(String categoryType, String latitude, String longitude, String bottomLeftLatitude, String topRightLatitude, String bottomLeftLongitude, String topRightLongitude, Integer page, Integer size) {
		
		String sql = createQueryByNearByMerchants("category_type = ");

		List<MerchantDto> merchantDtos = em.createNativeQuery(sql, "merchantDtoMapper")
				.setParameter("unit", KILLOMETER)
				.setParameter("latitude", latitude)
				.setParameter("longitude", longitude)
				.setParameter("bottomLeftLatitude", bottomLeftLatitude)
				.setParameter("topRightLatitude", topRightLatitude)
				.setParameter("bottomLeftLongitude", bottomLeftLongitude)
				.setParameter("topRightLongitude", topRightLongitude)
				.setParameter("parameter", categoryType)
				.getResultList();
		
		return getPageDto(merchantDtos, page, size);
	}
}
