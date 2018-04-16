package com.mariano.weather.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.mariano.weather.dao.UserDao;
@Service
public class SpringDataJpaUserDetailsService implements UserDetailsService {
	@Autowired
	UserDao userDao;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		com.mariano.weather.model.User user=userDao.findByUsername(username);
		System.out.println("Usuario de la db "+user);
		return new User(user.getUsername(),user.getPassword(),AuthorityUtils.createAuthorityList("USER"));
	}

}
