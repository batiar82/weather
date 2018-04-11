package com.mariano.weather.model.dto;

public class LocationDTO {
	private String city;

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	@Override
	public String toString() {
		return "LocationDTO [city=" + city + "]";
	}
	
}
