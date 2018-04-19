package com.mariano.weather.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mariano.weather.model.Forecast;
@Service
public class YahooService {
	@Autowired
	RestTemplate restTemplate;
	@Autowired
	YahooCounterService yahooCounterService;
	
	/**
	 * A partir de una locacion, traigo el pronostico desde yahoo
	 * @param location
	 * @return
	 */
	public Forecast getForecastForLCity(String city){
		String url="https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='{city}')&format=json";
		Map<String, String> params = new HashMap<String, String>();
	    params.put("city", city);
	    if(yahooCounterService.canUpdate()) {
	    	try {
	    		yahooCounterService.increaseCounter();
	    		return restTemplate.getForObject(url, Forecast.class,params);
	    	}catch(Exception e) {
	    		return null;
	    	}
	    }else
	    	return null;
}
}
