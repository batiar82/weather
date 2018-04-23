package com.mariano.weather.dao;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mariano.weather.model.Forecast;
@Repository
public interface ForecastDao extends JpaRepository<Forecast, Integer> {
	public Forecast findFirstByOrderByDate();
	Forecast findFirstByLocationBoardOwnerUsernameIsInOrderByDateAsc(List<String> username);
}
