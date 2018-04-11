package com.mariano.weather.helpers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.mariano.weather.service.impl.LocationService;
import com.mariano.weather.service.impl.YahooService;

@Component
public class UpdateForecast implements ApplicationListener<ApplicationReadyEvent> {

  @Autowired
  YahooService service;
  
  @Autowired
  LocationService locationService;
	
	
  @Override
  public void onApplicationEvent(final ApplicationReadyEvent event) {
	  locationService.updateAll();
  }
}