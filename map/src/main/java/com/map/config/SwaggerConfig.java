package com.map.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	@Bean
	public Docket postApi() {
		return new Docket(DocumentationType.SWAGGER_2).groupName("public-api").select().build().apiInfo(apiInfo());
	}

	private ApiInfo apiInfo() {

		return new ApiInfoBuilder().title("geocoding api").description("geocoding api refrence for dev")
				.termsOfServiceUrl("https://lets.com").license("pjh").licenseUrl(".").version("3.135").build();

	}
	
	
}
