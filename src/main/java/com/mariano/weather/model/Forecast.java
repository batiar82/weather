package com.mariano.weather.model;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.mariano.weather.helpers.ForecastDeserializer;

@JsonIgnoreProperties(ignoreUnknown=true)
@JsonDeserialize(using = ForecastDeserializer.class)
@Entity
public class Forecast {
	public static final Integer MIN_POLL_DELAY=1;
	
	@Id
	@GeneratedValue
	private Integer id;
	private String city;
	private String country;
	private Integer temp;
	private String text;
	@OneToOne
	//@MapsId
	@JsonIgnore
	private Location location;
	private Date date;
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public Integer getTemp() {
		return temp;
	}
	public void setTemp(Integer temp) {
		this.temp = temp;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public static Integer toCelcius(Integer temp) {
		Double celcius=(temp.doubleValue()-32)*5/9;
		return celcius.intValue();
	}
	@Override
	public String toString() {
		return "Forecast [city=" + city + ", country=" + country + ", temp=" + temp+ ", tempC=" + Forecast.toCelcius(temp) + ", text=" + text + ", date="
				+ date + "]";
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	
	
}
