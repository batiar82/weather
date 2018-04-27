package com.mariano.weather.dao;

import com.mariano.weather.model.Board;
import com.mariano.weather.model.dto.BoardDTO;

public interface FirebaseDao {
	public String addBoard(BoardDTO board);
	public Board removeBoard(String id);
	public String addForecast(String forecasr);
	public String updateForecast(String forecast);
	public String deleteForecast(String forecast);
	
}
