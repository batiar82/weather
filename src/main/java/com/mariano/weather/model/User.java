package com.mariano.weather.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class User {
	public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();
	@Id
	@GeneratedValue
	private Integer id;
	private String name;
	private String username;
	@JsonIgnore
	private String password;
	@JsonIgnore
	@OneToMany(mappedBy="owner",cascade = CascadeType.ALL,orphanRemoval = true )
	private List<Board> boards;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Board> getBoards() {
		return boards;
	}
	public void setBoards(List<Board> boards) {
		this.boards = boards;
	}
	public void addBoard(Board board) {
		if(this.boards==null) {
			this.boards= new ArrayList<Board>();
		}
		this.boards.add(board);
		}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = PASSWORD_ENCODER.encode(password);
	}
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public User(String name) {
		super();
		this.name = name;
	}
	
}
