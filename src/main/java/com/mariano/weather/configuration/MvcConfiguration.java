package com.mariano.weather.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedMethods("PUT","DELETE","OPTIONS","POST")
		.allowedOrigins("http://127.0.0.1:3000");
		WebMvcConfigurer.super.addCorsMappings(registry);
	}
	
}
