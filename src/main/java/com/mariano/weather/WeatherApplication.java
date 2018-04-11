package com.mariano.weather;

import java.util.HashMap;
import java.util.Map;
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
import org.springframework.web.client.RestTemplate;

import com.mariano.weather.dao.UserDao;
import com.mariano.weather.model.Forecast;
import com.mariano.weather.model.User;
import com.mariano.weather.service.impl.YahooService;

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
	public Map<String,Forecast> forecasts(){
		return new HashMap<String,Forecast>();
	}
	
	
	@Autowired
	YahooService service;
	
		
	@Autowired
	UserDao userDao;
	@Bean
	
	public CommandLineRunner run(RestTemplate restTemplate) throws Exception {
		return args -> {
			
			User mariano = new User();
			mariano.setName("Mariano");
			Example<User> ejemplo = Example.of(mariano);
			Optional<User> opt=userDao.findOne(ejemplo);
			if(!opt.isPresent())
				userDao.save(mariano);
			
			/*
			
			List<String> cities= new ArrayList<String>();
			cities.add("Buenos aires");
			cities.add("Chicago");
			for(String city : cities) {
				Forecast forecast = service.getForecastByCity("buenos aires");
				log.info(forecast.toString());
				forecasts.put(city, forecast);
			}
			*/
			
		};
	}
}
