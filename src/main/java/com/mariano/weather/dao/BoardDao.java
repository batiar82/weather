package com.mariano.weather.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mariano.weather.model.Board;
@Repository
public interface BoardDao extends JpaRepository<Board, Integer> {

	
}
