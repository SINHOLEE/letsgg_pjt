package com.ssafy.config;

import java.util.ArrayList;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Bean
	public Docket api() {
		String title = "경기도 지역 화폐 API";

		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.ssafy.api")).paths(PathSelectors.any()).build()
				.apiInfo(apiInfo(title));
	}

	private ApiInfo apiInfo(String title) {
		return new ApiInfo(title, "Swagger로 생성한 API Docs", "", "", new Contact("", "", "skydevilk@gmail.com"), "", "",
				new ArrayList<>());
	}
}
