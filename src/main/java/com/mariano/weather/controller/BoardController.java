package com.mariano.weather.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mariano.weather.model.Board;
import com.mariano.weather.model.dto.BoardDTO;
import com.mariano.weather.service.impl.BoardService;

@Controller
@CrossOrigin(origins = "http://localhost:3001")
public class BoardController {
	
	private static final Logger log = LoggerFactory.getLogger(BoardController.class);
	
	@Autowired
	BoardService service;
	
	
	
	@RequestMapping(
			value="/boards/{user}",
			method=RequestMethod.GET,
			produces= MediaType.APPLICATION_JSON_VALUE)
		public ResponseEntity<List<Board>> getBoards(@PathVariable String user){
			
		List<Board> boards= service.getByOwner(user);	
		if (boards==null)
			return new ResponseEntity<List<Board>>(boards,HttpStatus.NOT_FOUND);
		else
			return new ResponseEntity<List<Board>>(boards,HttpStatus.OK);
	}
	
	
	@RequestMapping(value="/boards/{user}",
			method=RequestMethod.POST,
			produces=MediaType.APPLICATION_JSON_VALUE,
			consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Board> addBoard(@PathVariable String user, @RequestBody BoardDTO boardDTO) {
		log.info("Entering to add a board");
		boardDTO.setUser(user);
		Board board =service.addBoard(boardDTO);
		if(board==null)
			return new ResponseEntity<Board>(board,HttpStatus.NOT_FOUND);
		return new ResponseEntity<Board>(board,HttpStatus.CREATED);
	}
	@RequestMapping(value="/boards/{user}/{boardId}",
			method=RequestMethod.DELETE,
			produces=MediaType.APPLICATION_JSON_VALUE,
			consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> deleteBoard(@PathVariable String user, @PathVariable Integer boardId) {
		service.removeLocation(boardId);
		return ResponseEntity.ok("Board deleted");
	}
	@MessageMapping("/")
	@SendTo("/boards/{user}")
	public List<Board> boards(@PathVariable String user) throws Exception {
		return service.getByOwner(user);	
	}
	
}
