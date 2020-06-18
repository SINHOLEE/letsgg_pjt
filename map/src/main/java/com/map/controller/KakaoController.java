package com.map.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.map.api.KakaoRestAPI;
import com.map.api.KakaoRestAPIExecutor;
import com.map.dto.Location;
import com.map.dto.Merchant;
import com.map.service.MerchantService;
import com.map.type.KakaoRestAPIType;
import com.map.util.HttpConnectUtil;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("/kakao")
@CrossOrigin(origins = "*")
public class KakaoController {
	private static final Logger logger = LoggerFactory.getLogger(MerchantController.class);

	@Autowired
	MerchantService service;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hstatus) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
		resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hstatus);
	}

	private Location kakaoMap(String regions) {
		String regionName = HttpConnectUtil.encodeString(regions);
		String query = "query=" + regionName;
		Gson gson = new Gson();
		KakaoRestAPI api = KakaoRestAPI.builder("")
				.setRestAPIType(KakaoRestAPIType.SearchAddress).setParameter(query).build();
		KakaoRestAPIExecutor executor = new KakaoRestAPIExecutor(api);
		if (executor.execute() == null) {
			return null;
		}
		JsonParser parser = new JsonParser();
		JsonElement rootObject = parser.parse(executor.execute()).getAsJsonObject().get("documents");
		String jsonString = rootObject.toString();
		Location[] array = gson.fromJson(jsonString, Location[].class);
		List<Location> list = Arrays.asList(array);
		Location dst = new Location();
		boolean check2 = false;
		if (list.size() != 0) {
			dst = list.get(0);
			check2 = true;
		}
		if (check2)
			return dst;
		else
			return null;
	}


	@GetMapping("/FindMerchantAddress")
	@ApiOperation("주소 정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getVol_detailnow() {
		try {
			List<Merchant> MerchantList = service.searchAll();
			List<Location> result = new ArrayList<Location>();
			int time = 0;
			int time_google=0;
			System.out.println(MerchantList.size());
			for (Merchant merchant : MerchantList) {
				if(merchant.getId()<390014) continue;
				if (merchant.getLatitude() == null || merchant.getLongitude() == null) {
					Location location = kakaoMap(merchant.getRefine_roadnm_addr());
					if (location != null) {
						System.out.println("New!!!  "+time_google+" " + merchant.getId() + "   " + location.getY() + " " + location.getX());
						merchant.setLatitude(location.getY());
						merchant.setLongitude(location.getX());
						service.update(merchant);
						
						time++;
						result.add(location);
					} else {
						int idx = 0;
						for (int i = merchant.getRefine_roadnm_addr().length() - 1; i >= 0; --i) {
							if (merchant.getRefine_roadnm_addr().charAt(i) == ' ') {
								idx = i;
								break;
							}
						}
						System.out.println(merchant.getId() + " " + merchant.getRefine_roadnm_addr()+" ");
						location = kakaoMap(merchant.getRefine_roadnm_addr().substring(0, idx));
						if(location !=null) {
							merchant.setLatitude(location.getY());
							merchant.setLongitude(location.getX());
							service.update(merchant);

							time++;
							result.add(location);
						}else {
							String address = URLEncoder.encode(merchant.getRefine_roadnm_addr().substring(0, idx), "UTF-8");
							String apiURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address
									+ "&key=";
							URL url = new URL(apiURL);
							BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(), "UTF8"));
							StringBuffer sourceCode = new StringBuffer();
							String sourceLine = "";
							while ((sourceLine = br.readLine()) != null) {
								sourceCode.append(sourceLine + "\n");
							}
							String result1 = sourceCode.toString();

							JsonParser parser = new JsonParser();
							JsonElement element = parser.parse(result1);
							JsonElement element2 = element.getAsJsonObject().get("results");
							JsonElement element3 = element2.getAsJsonArray().get(0);
							JsonElement element4 = element3.getAsJsonObject().get("geometry");
							JsonElement element5 = element4.getAsJsonObject().get("location");
							String address_lat = element5.getAsJsonObject().get("lat").toString();
							String address_lng = element5.getAsJsonObject().get("lng").toString();
							System.out.println(address_lat + " " + address_lng);
							merchant.setLatitude(address_lat);
							merchant.setLongitude(address_lng);
							service.update(merchant);
							System.out.println(time_google);
							time_google ++;
						}
					}
				}
				if (time > 150000)
					break;
			}
			return response(result, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("주소리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}
}
