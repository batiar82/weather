package com.mariano.weather.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.mariano.weather.dao.BoardDao;
import com.mariano.weather.dao.UserDao;
import com.mariano.weather.model.Board;
import com.mariano.weather.model.User;
import com.mariano.weather.model.dto.BoardDTO;

@Service
public class BoardService {
	@Autowired
	BoardDao dao;
	
	@Autowired
	UserDao userDao;
	
	
	public Board addBoard(BoardDTO boardDTO) {
		Board newBoard = new Board();
		newBoard.setName(boardDTO.getName());
		Optional<User> opt=userDao.findOne(Example.of(new User(boardDTO.getUser())));
		if(opt.isPresent()) {
			newBoard.setOwner(opt.get());
			return dao.save(newBoard);
		}
		return null;
	}


	public List<Board> getByOwner(String user) {
		Optional<User> opt=userDao.findOne(Example.of(new User(user)));
		if(opt.isPresent()) {
			Board example = new Board();
			example.setOwner(opt.get());
			return dao.findAll(Example.of(example));
		}
		return null;
	}


	public void removeLocation(Integer boardId) {
		dao.deleteById(boardId);
		
	}
}
