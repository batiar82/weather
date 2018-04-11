package com.mariano.weather.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mariano.weather.model.User;

public interface UserDao extends JpaRepository<User, Integer> {

}
