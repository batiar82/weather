package com.mariano.weather.dao.impl;

import org.springframework.stereotype.Repository;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.mariano.weather.dao.FirebaseDao;
import com.mariano.weather.model.Board;
import com.mariano.weather.model.dto.BoardDTO;
@Repository
public class FirebaseDaoImpl implements FirebaseDao {
	private DatabaseReference boardRef = FirebaseDatabase.getInstance().getReference("Boards");
	private DatabaseReference forecastRef = FirebaseDatabase.getInstance().getReference("Forecasts");
	
	@Override
	public String addBoard(BoardDTO board) {
		boardRef.push().setValueAsync(board);
		return boardRef.getKey();
	}

	@Override
	public Board removeBoard(String id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String addForecast(String forecast) {
		forecastRef.push().setValueAsync(forecast);
		return forecastRef.getKey();
	}

	@Override
	public String updateForecast(String forecast) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteForecast(String forecast) {
		// TODO Auto-generated method stub
		return null;
	}

}
