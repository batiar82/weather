package com.mariano.weather.helpers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

@Component
public class StompEvents {
	Logger log = LoggerFactory.getLogger(StompEvents.class);
	@Autowired
	List<String> subscribers;
	
	@EventListener
	public void subscribeEvent(SessionSubscribeEvent event) {
		log.info("Subscription event for user "+event.getUser().getName());
		if(!subscribers.contains(event.getUser().getName())) 
			subscribers.add(event.getUser().getName());
	}
	@EventListener
	public void disconnectEvent(SessionDisconnectEvent event) {
		log.info("Socket disconnected "+event.getUser().getName());
		subscribers.remove(event.getUser().getName());
	}
}
