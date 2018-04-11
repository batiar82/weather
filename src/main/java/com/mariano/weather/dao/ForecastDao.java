package com.mariano.weather.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mariano.weather.model.Forecast;
@Repository
public interface ForecastDao extends JpaRepository<Forecast, Integer> {
	public Forecast findFirstByOrderById();
}
