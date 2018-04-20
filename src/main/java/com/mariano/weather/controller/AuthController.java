package com.mariano.weather.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
	public ResponseEntity<User> registerUser(@Valid @RequestBody UserDTO user){
		user.setUsername(user.getUsername().toLowerCase());
		User exists = dao.findByUsername(user.getUsername());
		if(exists==null) {
			System.out.println("Password "+user.getPassword());
			user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
			User newUser=dao.save(new User(user.getName(),user.getUsername(),user.getPassword()));
			return new ResponseEntity<User>(newUser,HttpStatus.CREATED);
	}else
			return new ResponseEntity<User>(new User(user.getName(),user.getUsername(),user.getPassword()), HttpStatus.CONFLICT);
}
}
