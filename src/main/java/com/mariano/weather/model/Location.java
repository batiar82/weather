package com.mariano.weather.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Location {
	@Id
	@GeneratedValue
	private Integer id;
	private String name;
	//TODO Cambiar par tener un historial
	@OneToOne(mappedBy="location",cascade = CascadeType.ALL, orphanRemoval = true)
	
	private Forecast forecast;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "board_id", nullable = false)
	@JsonIgnore
	private Board board;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Forecast getForecast() {
		return forecast;
	}
	public void setForecast(Forecast forecast) {
		this.forecast = forecast;
	}
	public Board getBoard() {
		return board;
	}
	public void setBoard(Board board) {
		this.board = board;
	}
	
	public void addForecast(Forecast forecast) {
        this.forecast = forecast;
        forecast.setLocation(this);
    }
 
    public void removeForecast() {
        if (forecast != null) {
        	forecast.setLocation(null);
        }
        this.forecast = null;
    }
}
