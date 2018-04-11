package com.mariano.weather.helpers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

import com.mariano.weather.model.Board;

@Component
@RepositoryEventHandler(Board.class)
public class EventHandler {
	static final String MESSAGE_PREFIX = "/topic";
	
	private final SimpMessagingTemplate websocket;

	private final EntityLinks entityLinks;

	@Autowired
	public EventHandler(SimpMessagingTemplate websocket, EntityLinks entityLinks) {
		this.websocket = websocket;
		this.entityLinks = entityLinks;
	}
/*
	@HandleAfterCreate
	public void newBoard(Board board) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/newBoard", getPath(Board));
	}

	@HandleAfterDelete
	public void deleteBoard(Board board) {
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/deleteBoard", getPath(Board));
	}
*/
	@HandleAfterSave
	public void updateForecast(Board board) {
		
		this.websocket.convertAndSend(
				MESSAGE_PREFIX + "/updateBoard", getPath(board));
	}

	/**
	 * Take an {@link Board} and get the URI using Spring Data REST's {@link EntityLinks}.
	 *
	 * @param Board
	 */
	private String getPath(Board board) {
		return this.entityLinks.linkForSingleResource(board.getClass(),
				board.getId()).toUri().getPath();
	}

}