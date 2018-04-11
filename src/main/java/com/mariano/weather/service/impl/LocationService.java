package com.mariano.weather.service.impl;

import java.text.MessageFormat;
import java.util.Iterator;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.mariano.weather.dao.BoardDao;
import com.mariano.weather.dao.ForecastDao;
import com.mariano.weather.dao.LocationDao;
import com.mariano.weather.helpers.LocationEvent;
import com.mariano.weather.model.Forecast;
import com.mariano.weather.model.Location;
import com.mariano.weather.model.YahooCounter;

@Service
public class LocationService implements ApplicationEventPublisherAware {
	
	private static final Logger log = LoggerFactory.getLogger(LocationService.class);
	private ApplicationEventPublisher publisher;
	@Autowired
	LocationDao dao;
	@Autowired
	BoardDao boardDao;
	@Autowired
	ForecastDao forecastDao;
	
	@Autowired
	YahooService yahooService;
	
	@Autowired
	SimpMessagingTemplate websocket;
	
	@Transactional
	public Location addLocation(String city,Integer boardId) {
		log.info("Add location "+city);
		Location newLocation= new Location();
		newLocation.setName(city);
		newLocation.setBoard(boardDao.findById(boardId).get());
		Forecast yahooForecast = yahooService.getForecastForLocation(newLocation);
		if(yahooForecast==null)
			return null;
		else{
			newLocation.addForecast(yahooService.getForecastForLocation(newLocation));
			newLocation=dao.save(newLocation);
			publisher.publishEvent(new LocationEvent(this,"ADD", newLocation));
			return newLocation;
		}
	}
	
	public void removeLocation(Integer locationId) {
		dao.deleteById(locationId);
	}
	
	public void updateForecast(Location location, Forecast forecast) {
			Location updatedLocation = dao.findById(location.getId()).get();
			updatedLocation.setForecast(forecast);
			dao.save(updatedLocation);
			publisher.publishEvent(new LocationEvent(this,LocationEvent.UPDATE_FORECAST,updatedLocation));
	}
	/**
	 * Devuelve la cantidad de minutos entre consultas para no sobrepasar el limite de consultas diarias de yahoo
	 * @return Intervalo en minutos
	 */
	public Integer getPollInterval() {
		Long total=dao.count();
		System.out.println("Total "+total);
		Integer minuteInterval=Long.valueOf(total*24*60/YahooCounter.MAX_QUERIES).intValue();
		return (Forecast.MIN_POLL_DELAY> minuteInterval ? Forecast.MIN_POLL_DELAY : minuteInterval);
	}

	@Override
	public void setApplicationEventPublisher(ApplicationEventPublisher publisher) {
		this.publisher=publisher;
		
	}
	/**
	 * Busca la proxima location a actualizar y la actualiza. ademas publica el evento de la actualizacion
	 */
	@Transactional
	public void updateForecast() {
		log.info("Updating oldest Forecast...");
		Forecast forecast=forecastDao.findFirstByOrderById();
		if(forecast!=null) {
			Location location=forecast.getLocation();
			forecastDao.delete(forecast);
			location.addForecast(yahooService.getForecastForLocation(location));
			System.out.println(location.getForecast());
			location=dao.save(location);
		
		
			//TODO Mover a un listener de eventos
			String username= location.getBoard().getOwner().getName();
		
			String url=MessageFormat.format("/topic/{0}/boards",username);
			this.websocket.convertAndSend(
					url, location);
		}
		
	}
	@Async
	public void updateAll() {
		log.info("Updating allLocations for initial setup...");
		Iterator<Location> locations=dao.findAll().iterator();
		while(locations.hasNext()) {
			Location location=locations.next();
			forecastDao.delete(location.getForecast());
			location.addForecast(yahooService.getForecastForLocation(location));
			dao.save(location);
		}
	}
}
