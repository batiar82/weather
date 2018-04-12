package com.mariano.weather.helpers;

import java.text.MessageFormat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.mariano.weather.model.Location;
import com.mariano.weather.service.impl.LocationService;

@Component
public class LocationEventsProcessor implements ApplicationListener<LocationEvent> {
	private static final Logger log = LoggerFactory.getLogger(LocationService.class);
	
	
	@Autowired
	private SimpMessagingTemplate websocket;
	@Override
	public void onApplicationEvent(LocationEvent event) {
		LocationEvent locationEvent = (LocationEvent) event;
		//System.out.println("Location "+locationEvent.getLocation()+"  "+locationEvent.getEventType());
		//TODO Disparar el update del websocket de ese location;
		if(locationEvent.getEventType().equals(LocationEvent.UPDATE_FORECAST)) {
			Location location=locationEvent.getLocation();
			String username= location.getBoard().getOwner().getName();
			String url=MessageFormat.format("/topic/{0}/boards",username);
			log.info("Sending updated location to: "+url);
			this.websocket.convertAndSend(
					url, location);
		}
	}

}
