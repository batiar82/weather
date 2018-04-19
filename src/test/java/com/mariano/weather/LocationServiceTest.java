package com.mariano.weather;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.mariano.weather.service.impl.LocationService;
@RunWith(SpringRunner.class)
@SpringBootTest
public class LocationServiceTest {

	@Autowired
	LocationService service;
	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void testPollInterval() {
		System.out.println("Poll Interval "+service.getPollInterval());
		assertEquals(new Integer(2),service.getPollInterval());
	}

}
