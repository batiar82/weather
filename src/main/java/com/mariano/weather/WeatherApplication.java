package com.mariano.weather;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Example;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.mariano.weather.dao.UserDao;
import com.mariano.weather.model.User;
import com.mariano.weather.service.impl.YahooCounterService;

@SpringBootApplication
public class WeatherApplication {

	private static final Logger log = LoggerFactory.getLogger(WeatherApplication.class);
	
	public static void main(String[] args) {
		SpringApplication.run(WeatherApplication.class, args);
	}
	
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}
	
	@Bean
	public List<String> subscriberBuilder(){
		return new ArrayList<String>();
	}
	
	@Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
    }
	@Bean
	public CorsFilter corsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addExposedHeader("Authorization");
		config.addAllowedMethod("OPTIONS");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("DELETE");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}
		
	@Autowired
	UserDao userDao;
	@Autowired
	YahooCounterService yahooCounterService;
	@Bean
	/**
	 * Creo un usuario si no lo hay para usar antes de implementar seguridad y crud de usuarios
	 * @param restTemplate
	 * @return
	 * @throws Exception
	 */
	public CommandLineRunner run(RestTemplate restTemplate) throws Exception {
		return args -> {
			
			User mariano = new User();
			mariano.setUsername("mariano");
			
			Example<User> ejemplo = Example.of(mariano);
			Optional<User> opt=userDao.findOne(ejemplo);
			if(!opt.isPresent()) {
				mariano.setName("Mariano");
				mariano.setPassword(bCryptPasswordEncoder().encode("123"));
				userDao.save(mariano);
				log.info("Inserting dummy user to db...");
			}
			yahooCounterService.initCounter();
			
		};
	}
}
