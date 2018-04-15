package com.mariano.weather.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mariano.weather.model.User;
@Repository
public interface UserDao extends JpaRepository<User, Integer> {
	User findByUsername(String username);
}
