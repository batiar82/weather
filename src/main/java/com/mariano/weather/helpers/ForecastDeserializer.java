package com.mariano.weather.helpers;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.mariano.weather.model.Forecast;

public class ForecastDeserializer extends StdDeserializer<Forecast> {
		 
	    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

		public ForecastDeserializer() {
	        this(null);
	    }
	 
	    public ForecastDeserializer(Class<?> vc) {
	        super(vc);
	    }
	 
	    @Override
	    public Forecast deserialize(JsonParser jp, DeserializationContext ctxt) 
	      throws IOException, JsonProcessingException {
	  
	        JsonNode forecastNode = jp.getCodec().readTree(jp);
	        Forecast forecast = new Forecast();
	        JsonNode datos=forecastNode.get("query").get("results").get("channel");
	        forecast.setCity(datos.get("location").get("city").textValue());
	        forecast.setCountry(datos.get("location").get("country").textValue());
	        JsonNode condition =datos.get("item").get("condition");
	        forecast.setTemp(Forecast.toCelcius(condition.get("temp").asInt()));
	        forecast.setText(condition.get("text").textValue());
	        DateFormat df= new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");
	        
	        try {
				forecast.setDate(df.parse(forecastNode.get("query").get("created").textValue()));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	        return forecast;
	    }
	}