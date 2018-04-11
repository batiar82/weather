package com.mariano.weather.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mariano.weather.model.YahooCounter;

public interface YahooCounterDao extends JpaRepository<YahooCounter, Integer> {
	public YahooCounter findFirstByOrderByIdDesc();
}
