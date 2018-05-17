package com.mariano.weather.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mariano.weather.model.Forecast;
@Repository
public interface ForecastDao extends JpaRepository<Forecast, Integer> {
	public Forecast findFirstByOrderByDate();
	Forecast findFirstByLocationBoardOwnerUsernameIsInOrderByDateAsc(List<String> username);
}
