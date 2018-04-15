package com.mariano.weather.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mariano.weather.dao.UserDao;
import com.mariano.weather.model.User;
import com.mariano.weather.model.dto.UserDTO;

@RestController
@RequestMapping("api/auth")
public class AuthController {
	
	@Autowired
	UserDao dao;
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody User user){
		return ResponseEntity.ok("");
	}
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user){
		dao.save(user);
		return ResponseEntity.ok("");
	}
}
