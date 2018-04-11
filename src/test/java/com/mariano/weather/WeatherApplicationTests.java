package com.mariano.weather;

import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.RestTemplate;

import com.mariano.weather.dao.ForecastDao;
import com.mariano.weather.model.Forecast;
import com.mariano.weather.service.impl.LocationService;
@RunWith(SpringRunner.class)
@SpringBootTest
public class WeatherApplicationTests {
	
	@Autowired
	RestTemplate template;
	@Autowired
	LocationService service;
	@Autowired
	ForecastDao dao;
	/*
	@Test
	public void contextLoads() {
		//RestTemplate restTemplate = new RestTemplate();
	    template.setMessageConverters(getMessageConverters());
	    System.out.println("MEssage converters: ");
	    System.out.println(template.getMessageConverters());
	}*/
	/*
	@Test
	public void givenConsumingJson_whenReadingTheFoo_thenCorrect() {
	    String URI = "https://query.yahooapis.com/v1/public/yql?q=select wind from weather.forecast where woeid in (select woeid from geo.places(1) where text='{city}')&format=json&callback=callbackFunction";
	    String URL = "http://gturnquist-quoters.cfapps.io/api/random";
	    RestTemplate restTemplate = new RestTemplate();
	    restTemplate.setMessageConverters(getMessageConverters());
	    System.out.println(restTemplate.getMessageConverters());
	    HttpHeaders headers = new HttpHeaders();
	    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON_UTF8));
	    HttpEntity<String> entity = new HttpEntity<String>(headers);
	 
	    ResponseEntity<Forecast> response = 
	      restTemplate.exchange(URL, HttpMethod.GET, entity, Forecast.class, "chicago");
	    Forecast resource = response.getBody();
	 
	    assertThat(resource, notNullValue());
	}
	*/
	private List<HttpMessageConverter<?>> getMessageConverters() {
	    List<HttpMessageConverter<?>> converters = 
	      new ArrayList<HttpMessageConverter<?>>();
	    MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
        System.out.println("Media types:L ");
        System.out.println(jsonConverter.getSupportedMediaTypes());
	    jsonConverter.getSupportedMediaTypes().add(MediaType.APPLICATION_JSON_UTF8);
	    System.out.println(jsonConverter.getSupportedMediaTypes());
	    converters.add(jsonConverter);
	    return converters;
	}
	@Test public void calcInterval() {
		
		System.out.println(service.getPollInterval());
	}
	
	@Test public void testDateSerialization() {
		//DateFormat df= new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
		DateFormat df= new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
		String ejemplo="Tue, 10 Apr 2018 12:00 AM CEST";
		String ejemplo2="2018-04-10T15:31:19Z";
		String string1 = "2001-07-04T12:08:56.235-0700";
		try {
			System.out.println(df.parse(ejemplo2));
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		/*List<Forecast> forecasts=dao.findAll();
		for(Forecast fore:forecasts) {
			
			try {
				System.out.println(df.parse(fore.getDate()));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}*/
	}
}
