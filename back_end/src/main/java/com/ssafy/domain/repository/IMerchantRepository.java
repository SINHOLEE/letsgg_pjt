package com.ssafy.domain.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.domain.Merchant;

public interface IMerchantRepository extends JpaRepository<Merchant, Long>{
	
	@EntityGraph("MerchantWithCategoryAndSigun")
	Page<Merchant> findAllByOrderByIdAsc(Pageable pageable);
	
	@EntityGraph("MerchantWithCategoryAndSigun")
	List<Merchant> findByCmpnmNmContainingAndLatitudeBetweenAndLongitudeBetweenOrderByIdAsc(String cmpnmNm, String bottomLeftLatitude, String topRightLatitude, String bottomLeftLongitude, String topRightLongitude);

	@EntityGraph("MerchantWithCategoryAndSigun")
	Page<Merchant> findByCategoryTypeAndLatitudeBetweenAndLongitudeBetweenOrderByIdAsc(String categoryType, String bottomLeftLatitude, String topRightLatitude, String bottomLeftLongitude, String topRightLongitude, Pageable pageable);

}
