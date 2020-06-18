package com.ssafy.api;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.domain.Merchant;
import com.ssafy.domain.exception.EmptyListException;
import com.ssafy.domain.exception.NotFoundException;
import com.ssafy.domain.service.MerchantService;
import com.ssafy.dto.PageDto;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@Validated
public class MerchantController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MerchantController.class);

	private static final String CATEGORIES = "음식점, 편의점, 주유소, 학원, 병원, 기타의료기관, 레저업소, 보건위생";

	private final MerchantService service;

	@Autowired
	public MerchantController(MerchantService service) {
		this.service = service;
	}

	@ApiOperation(value = "특정 가맹점 조회")
	@GetMapping(value = "/merchant/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Merchant> findOne(@PathVariable Long id) {

		LOGGER.debug("Calling merchant findById()");

		Merchant merchant = service.findOne(id);

		if(merchant == null)
			throw new NotFoundException("검색 결과가 없습니다.");
		
		return new ResponseEntity<>(merchant, HttpStatus.OK);
	}

	@ApiOperation(value = "모든 가맹점 조회")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "page", value = "페이지 번호", defaultValue = "0"),
			@ApiImplicitParam(name = "size", value = "한 페이지 크기", defaultValue = "100")
	})
	@GetMapping(value = "/merchants/{page}/{size}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Page<Merchant>> findAll(@PathVariable Integer page, @PathVariable Integer size) {

		LOGGER.debug("Calling merchant findAll()");

		Page<Merchant> merchants = service.findAll(page, size);

		if(merchants.isEmpty())
			throw new EmptyListException("검색 결과가 없습니다.");
		
		return new ResponseEntity<>(merchants, HttpStatus.OK);
	}

	@ApiOperation(value = "가맹점 이름으로 조회")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "cmpnmNm", value = "가맹점 이름", defaultValue = "다이소"),
			@ApiImplicitParam(name = "latitude", value = "현재 위도", defaultValue = "37.818301"),
			@ApiImplicitParam(name = "longitude", value = "현재 경도", defaultValue = "127.513194"),
			@ApiImplicitParam(name = "bottomLeftLatitude", value = "좌측 아래 위도", defaultValue = "37.501"),
			@ApiImplicitParam(name = "topRightLatitude", value = "우측 위 위도", defaultValue = "37.99"),
			@ApiImplicitParam(name = "bottomLeftLongitude", value = "좌측 아래 경도", defaultValue = "127.305"),
			@ApiImplicitParam(name = "topRightLongitude", value = "우측 위 경도", defaultValue = "127.99"),
			@ApiImplicitParam(name = "page", value = "페이지 번호", defaultValue = "0"),
			@ApiImplicitParam(name = "size", value = "한 페이지 크기", defaultValue = "20")
	})
	@GetMapping(value = "/merchants-by-name/{cmpnmNm}/{latitude}/{longitude}/{bottomLeftLatitude}/{topRightLatitude}/{bottomLeftLongitude}/{topRightLongitude}/{page}/{size}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PageDto> findByCmpnmName(@PathVariable String cmpnmNm,
			@PathVariable String latitude, @PathVariable String longitude, 
			@PathVariable @Max(value = 39, message = "범위를 벗어남") String bottomLeftLatitude,
			@PathVariable @Min(value = 36, message = "범위를 벗어남") String topRightLatitude,
			@PathVariable @Max(value = 129, message = "범위를 벗어남") String bottomLeftLongitude,
			@PathVariable @Min(value = 126, message = "범위를 벗어남") String topRightLongitude,
			@PathVariable @PositiveOrZero Integer page,
			@PathVariable @Positive Integer size) {

		LOGGER.debug("Calling merchant findByCmpnmName()");

		PageDto pageDtos = service.findByCmpnmName(cmpnmNm, latitude, longitude, bottomLeftLatitude, topRightLatitude,
				bottomLeftLongitude, topRightLongitude, page, size);

		if(pageDtos == null) 
			throw new EmptyListException("검색 결과가 없습니다.");
		
		return new ResponseEntity<>(pageDtos, HttpStatus.OK);
	}

	@ApiOperation(value = "카테고리별 가맹점 조회")
	@ApiImplicitParams({ @ApiImplicitParam(name = "categoryType", value = CATEGORIES, defaultValue = "음식점"),
			@ApiImplicitParam(name = "latitude", value = "현재 위도", defaultValue = "36.5"),
			@ApiImplicitParam(name = "longitude", value = "현재 경도", defaultValue = "126.5"),
			@ApiImplicitParam(name = "bottomLeftLatitude", value = "좌측 아래 위도", defaultValue = "35"),
			@ApiImplicitParam(name = "topRightLatitude", value = "우측 위 위도", defaultValue = "39"),
			@ApiImplicitParam(name = "bottomLeftLongitude", value = "좌측 아래 경도", defaultValue = "125"),
			@ApiImplicitParam(name = "topRightLongitude", value = "우측 위 경도", defaultValue = "129"),
			@ApiImplicitParam(name = "page", value = "페이지 번호", defaultValue = "0"),
			@ApiImplicitParam(name = "size", value = "한 페이지 크기", defaultValue = "20")
	})
	@GetMapping(value = "/merchants-by-category/{categoryType}/{latitude}/{longitude}/{bottomLeftLatitude}/{topRightLatitude}/{bottomLeftLongitude}/{topRightLongitude}/{page}/{size}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PageDto> findMerchantsByCategoryType(@Valid @PathVariable String categoryType,
			@PathVariable String latitude, @PathVariable String longitude,
			@PathVariable @Max(value = 39, message = "범위를 벗어남") String bottomLeftLatitude,
			@PathVariable @Min(value = 36, message = "범위를 벗어남") String topRightLatitude,
			@PathVariable @Max(value = 129, message = "범위를 벗어남") String bottomLeftLongitude,
			@PathVariable @Min(value = 126, message = "범위를 벗어남") String topRightLongitude,
			@PathVariable @PositiveOrZero Integer page,
			@PathVariable @Positive Integer size) {

		LOGGER.debug("Calling merchant findMerchantsByCategoryType()");

		PageDto pageDtos = service.findMerchantsByCategoryType(categoryType, latitude, longitude, bottomLeftLatitude,
				topRightLatitude, bottomLeftLongitude, topRightLongitude, page, size);

		if(pageDtos == null) 
			throw new EmptyListException("검색 결과가 없습니다.");
		
		return new ResponseEntity<>(pageDtos, HttpStatus.OK);
	}
}
