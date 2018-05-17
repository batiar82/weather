package com.mariano.weather;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mariano.weather.dao.LocationDao;
import com.mariano.weather.service.impl.LocationService;
@RunWith(SpringRunner.class)
@SpringBootTest
public class LocationServiceTest {

	@Autowired
	LocationService service;
	@Autowired
	LocationDao dao;
	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void testPollInterval() {
		assertEquals(new Integer(2),service.getPollInterval());
	}
	@Test
	public void findByBoardAndName() {
		assertEquals(true, dao.existsByNameAndBoardId("Misiones", 10));

}
}