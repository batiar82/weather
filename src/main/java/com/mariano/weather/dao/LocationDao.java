package com.mariano.weather.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.mariano.weather.model.Location;
@Repository
public interface LocationDao extends JpaRepository<Location, Integer>  {

	
}
