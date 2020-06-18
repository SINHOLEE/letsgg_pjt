package com.map.controller;

import java.net.URL;
import java.net.URLEncoder;
import java.io.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.simple.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.map.dto.Merchant;
import com.map.service.MerchantService;

import io.swagger.annotations.ApiOperation;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

@RestController
@RequestMapping("/merchant")
@CrossOrigin(origins = "*")
public class MerchantController {
	private static final Logger logger = LoggerFactory.getLogger(MerchantController.class);

	@Autowired
	MerchantService service;

	private ResponseEntity<Map<String, Object>> response(Object data, boolean status, HttpStatus hstatus) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("status", status);
	resultMap.put("data", data);
		return new ResponseEntity<>(resultMap, hstatus);
	}

	@GetMapping("/MerchantAddress")
	@ApiOperation("가맹점 주소 정보를 반환한다.")
	public ResponseEntity<Map<String, Object>> getMerchant() {
		try {
			List<Merchant> MerchantList = service.searchAll();
			Merchant change = new Merchant();
			for (Merchant merchant : MerchantList) {
				if (merchant.getLatitude() == null || merchant.getLongitude() == null) {
					String address2 = merchant.getRefine_roadnm_addr();
					String address = URLEncoder.encode(merchant.getRefine_roadnm_addr(), "UTF-8");
					String apiURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address
							+ "&key=";
					System.out.println(address2+" "+merchant.getId());
					URL url = new URL(apiURL);
					BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(), "UTF8"));
					StringBuffer sourceCode = new StringBuffer();
					String sourceLine = "";
					while ((sourceLine = br.readLine()) != null) {
						sourceCode.append(sourceLine + "\n");
					}
					String result = sourceCode.toString();

					JsonParser parser = new JsonParser();
					JsonElement element = parser.parse(result);
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
					change = merchant;
					break;
				}else {
					System.out.println("개꿀 ");
				}
			}
			return response(change, true, HttpStatus.OK);
		} catch (Exception e) {
			logger.error("가맹점리스트조회실패", e);
			return response(e.getMessage(), false, HttpStatus.CONFLICT);
		}
	}

}
