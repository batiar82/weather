package com.mariano.weather.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class YahooCounter {
	public static final Integer MAX_QUERIES=2000;
	@Id
	private Integer id;
	private Date date;
	private Integer count;
	public YahooCounter(Date date, Integer count) {
		this.date=date;
		this.count=count;
	}
	
	public YahooCounter() {
		// TODO Auto-generated constructor stub
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	
}
