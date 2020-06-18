package com.ssafy.dto;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MerchantDto {
	
	@NotEmpty
	private Long id;
	
	@NotEmpty
	private String cmpnmNm;
	
	@NotEmpty
	private String refineRoadnmAddr;
	
	@NotEmpty
	private String refineLotnoAddr;
	
	@NotEmpty
	private String telno;
	
	@NotEmpty
	private String regionMnyNm;
	
	@NotEmpty
	private String brnhstrmMnyUsePosblYn;
	
	@NotEmpty
	private String cardMnyUsePosblYn;
	
	@NotEmpty
	private String mobileMnyUsePosblYn;
	
	@NotEmpty
	private String refineZipCd;
	
	@NotEmpty
	private String latitude;
	
	@NotEmpty
	private String longitude;
	
	@NotEmpty
	private Long categoryId;
	
	@NotEmpty
	private Long sigunId;
	
	@NotEmpty
	private String categoryType;
	
	@NotEmpty
	private String distance;
}
