package com.mariano.weather.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mariano.weather.model.Location;
@Repository
public interface LocationDao extends JpaRepository<Location, Integer>  {
	public Optional<Location> findByNameAndBoardId(String name, Integer boardId);
	public boolean existsByNameAndBoardId(String name, Integer boardId);
	
}
