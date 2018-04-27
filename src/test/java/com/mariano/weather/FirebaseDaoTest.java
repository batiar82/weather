package com.mariano.weather;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mariano.weather.dao.FirebaseDao;
import com.mariano.weather.model.Board;
@RunWith(SpringRunner.class)
@SpringBootTest

public class FirebaseDaoTest {

	@Autowired
	FirebaseDao dao;
	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() {
		//assertEquals("OK",dao.addBoard(board));
	}

}
