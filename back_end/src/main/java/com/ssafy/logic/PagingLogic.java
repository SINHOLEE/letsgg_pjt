package com.ssafy.logic;

import java.util.Collections;
import java.util.List;

import com.ssafy.dto.MerchantDto;
import com.ssafy.dto.PageDto;
import com.ssafy.dto.PageableDto;

public class PagingLogic {
	
	public static final int PAGE_SIZE = 20;
	
	public Integer getTotalElements(List<MerchantDto> merchantDtos) {
		
		return merchantDtos.size();
	}
	
	public Integer getTotalPage(List<MerchantDto> merchantDtos, Integer size) {
		
		return size == 0 ? 1 : (int) Math.ceil((double) merchantDtos.size() / (double) size);
	}
	
	public boolean isFirstPage(Integer page) {
		
		return page == 0;
	}
	
	public boolean isLastPage(Integer totalPage, Integer page) {
		
		return page >= totalPage - 1;
	}
	
	public List<MerchantDto> getCurrentMerchantDto(List<MerchantDto> merchantDtos, Integer page, Integer size){
		
		if(merchantDtos.isEmpty()) {
			return Collections.emptyList();
		}
		
		if(page >= getTotalPage(merchantDtos, size)) {
			page = getTotalPage(merchantDtos, size) - 1;
		}
		
		int startIndex = page * size;
		int lastIndex = (page + 1) * size < getTotalElements(merchantDtos) ? (page + 1) * size : getTotalElements(merchantDtos);
		
		return merchantDtos.subList(startIndex, lastIndex);
	}
	
	public PageableDto getPageableDto (List<MerchantDto> merchantDtoss, Integer size, Integer page) {
		
		return new PageableDto(merchantDtoss.size(), getTotalPage(merchantDtoss, size), 
				isFirstPage(page), isLastPage(getTotalPage(merchantDtoss, size), page));
	}
	
	public PageDto getPageDto(List<MerchantDto> merchantDtos, Integer page, Integer size) {
		
		return new PageDto(getCurrentMerchantDto(merchantDtos, page, size), getPageableDto(merchantDtos, size, page));
	}
}
