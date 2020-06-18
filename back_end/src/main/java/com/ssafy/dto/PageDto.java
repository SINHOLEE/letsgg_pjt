package com.ssafy.dto;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageDto {
	
	@NotEmpty
	private List<MerchantDto> content;
	
	@NotEmpty
	private PageableDto pageable;
}
