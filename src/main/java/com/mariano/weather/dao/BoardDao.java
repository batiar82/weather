package com.mariano.weather.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mariano.weather.model.Board;
@Repository
public interface BoardDao extends JpaRepository<Board, Integer> {
	
	public List<Board> findByOwnerUsername(String username);
	
}
