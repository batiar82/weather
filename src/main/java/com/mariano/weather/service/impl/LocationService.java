package com.mariano.weather.service.impl;

import java.util.Iterator;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.mariano.weather.dao.BoardDao;
import com.mariano.weather.dao.ForecastDao;
import com.mariano.weather.dao.LocationDao;
import com.mariano.weather.helpers.LocationEvent;
import com.mariano.weather.model.Board;
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
	List<String> subscribers;

	@Autowired
	YahooService yahooService;

	@Autowired
	SimpMessagingTemplate websocket;

	/**
	 * Agrego una ciudad con su pronostico
	 * 
	 * @param city
	 *            Una ciudad para buscar el pronostico
	 * @param boardId
	 *            El id del board que tiene esa ciudad
	 * @return
	 */
	@Transactional
	public Location addLocation(String city, Integer boardId) {
		log.info("Add location " + city);
		Location newLocation = new Location();
		newLocation.setName(city);
		Board board=boardDao.findById(boardId).get();
		
		newLocation.setBoard(boardDao.findById(boardId).get());
		Forecast yahooForecast = yahooService.getForecastForLCity(city);
		if (yahooForecast == null)
			return null;
		else {
			newLocation.addForecast(yahooService.getForecastForLCity(city));
			newLocation = dao.save(newLocation);
			publisher.publishEvent(new LocationEvent(this, "ADD", newLocation));
			return newLocation;
		}
	}
	public boolean checkExistingLocation(String city, Integer boardId) {
		return dao.existsByNameAndBoardId(city, boardId);
	}
	public void removeLocation(Integer locationId) {
		dao.deleteById(locationId);
	}

	/**
	 * Devuelve la cantidad de minutos entre consultas para no sobrepasar el limite
	 * de consultas diarias de yahoo
	 * 
	 * @return Intervalo en minutos
	 */
	public Integer getPollInterval() {
		Long total = dao.count();
		Integer minuteInterval = Long.valueOf(total * 24 * 60 / YahooCounter.MAX_QUERIES).intValue();
		//Devuelvo el minimo porque con la estrategia de actualizar el ultimo no hace falta el calculo, eso es para cuando actualizo todos juntos.
		//Mas adelante hay que implementar que actualice solo los que estan subscriptos.
		//return (Forecast.MIN_POLL_DELAY > minuteInterval ? Forecast.MIN_POLL_DELAY : minuteInterval);
		return Forecast.MIN_POLL_DELAY;
	}

	@Override
	public void setApplicationEventPublisher(ApplicationEventPublisher publisher) {
		this.publisher = publisher;

	}

	/**
	 * Busca la proxima location a actualizar y la actualiza. ademas publica el
	 * evento de la actualizacion
	 */
	@Transactional
	public void updateOldestForecastForSubscribers() {
		Forecast forecast= forecastDao.findFirstByLocationBoardOwnerUsernameIsInOrderByDateAsc(subscribers);
		log.info("Updating forecast: "+forecast);
		if(forecast !=null) {
			Forecast newForecast=yahooService.getForecastForLCity(forecast.getCity());
			forecast.copyPropertiesFrom(newForecast);
			forecastDao.save(forecast);
			log.info("Updated forecast: "+forecast);
			publisher.publishEvent(new LocationEvent(this, LocationEvent.UPDATE_FORECAST, forecast.getLocation()));
		}
	}
	
	
	/**
	 * Busca la proxima location a actualizar y la actualiza. ademas publica el
	 * evento de la actualizacion
	 */
	@Transactional
	public void updateOldestForecast() {
		Forecast forecast= forecastDao.findFirstByOrderByDate();
		log.info("Updating forecast: "+forecast);
		if(forecast !=null) {
			Forecast newForecast=yahooService.getForecastForLCity(forecast.getCity());
			forecast.copyPropertiesFrom(newForecast);
			forecastDao.save(forecast);
			log.info("Updated forecast: "+forecast);
			publisher.publishEvent(new LocationEvent(this, LocationEvent.UPDATE_FORECAST, forecast.getLocation()));
		}
	}
	/**
	 * Actualiza todos los pronosticos al iniciar la aplicacion.
	 */
	@Async
	public void updateAll() {
		Iterator<Forecast> forecasts =forecastDao.findAll().iterator();
		while(forecasts.hasNext()) {
			Forecast forecast=forecasts.next();
			Forecast newForecast=yahooService.getForecastForLCity(forecast.getCity());
			forecast.copyPropertiesFrom(newForecast);
			forecastDao.save(forecast);
			
		}
	}
}
