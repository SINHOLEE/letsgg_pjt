package com.ssafy.dto;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PageableDto{

	@NotEmpty
	private int totalElements;
	
	@NotEmpty
	private int totalPages;
	
	@NotEmpty
	private boolean first;
	
	@NotEmpty
	private boolean last;
}
