package com.mariano.weather.helpers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class LocationEventsProcessor implements ApplicationListener<LocationEvent> {
	@Autowired
	private SimpMessagingTemplate websocket;
	@Override
	public void onApplicationEvent(LocationEvent event) {
		LocationEvent locationEvent = (LocationEvent) event;
		//System.out.println("Location "+locationEvent.getLocation()+"  "+locationEvent.getEventType());
		//TODO Disparar el update del websocket de ese location;
		this.websocket.convertAndSend(
				"/updateLocation", locationEvent.getLocation());
	}

}
