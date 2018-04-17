package com.mariano.weather.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO user){
		System.out.println("Password "+user.getPassword());
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		dao.save(new User(user.getName(),user.getUsername(),user.getPassword()));
		return ResponseEntity.ok("");
	}
}
