package com.mariano.weather.helpers;

import org.springframework.context.ApplicationEvent;

import com.mariano.weather.model.Location;

public class LocationEvent extends ApplicationEvent{
	public static final String UPDATE_FORECAST = "UPDATE FORECAST";
	private static final long serialVersionUID = 1L;
    
    private String eventType;
    private Location location;
    public LocationEvent(Object source, String eventType,Location location) {
		super(source);
		this.eventType=eventType;
		this.location=location;
	}
	public String getEventType() {
		return eventType;
	}
	public Location getLocation() {
		return location;
	}
    
}
