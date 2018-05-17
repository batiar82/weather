package com.mariano.weather;

import static org.junit.Assert.assertEquals;

import java.util.Arrays;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mariano.weather.dao.ForecastDao;
@RunWith(SpringRunner.class)
@SpringBootTest
public class ForecastDaoTest {
	@Autowired
	ForecastDao dao;
	@Before
	public void setUp() throws Exception {
	}

	
	@Test
	public void testNewQueryForOwner() {
		assertEquals(dao.findById(6).get().getId(),dao.findFirstByLocationBoardOwnerUsernameIsInOrderByDateAsc(Arrays.asList("Mariano", "Pepe")).getId());
		
	}

}
