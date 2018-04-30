package com.mariano.weather.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleApiService {

	@Autowired
	RestTemplate restTemplate;
	private static final String apiKey="AIzaSyARrWj4TJ_y4Za_6qOhs-GjMX0UlC069No";
	private static final String url="https://maps.googleapis.com/maps/api/place/autocomplete/json?key={key}&types={types}&input={input}";
	public ResponseEntity<String> getSuggestions(String query){	
		Map<String, String> params = new HashMap<String, String>();
	    params.put("input", query);
	    params.put("key", apiKey);
	    params.put("types", "(cities)");
	   ResponseEntity<String> re=restTemplate.getForEntity(url, String.class, params);
	    return re;
	}
}
