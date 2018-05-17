package com.mariano.weather;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.mariano.weather.dao.BoardDao;
import com.mariano.weather.service.impl.BoardService;
@RunWith(SpringRunner.class)
@SpringBootTest
public class BoardDaoTest {

	@Autowired
	BoardDao dao;
	@Autowired
	BoardService service;
	
	
	@Before
	public void setUp() throws Exception {
	}

	@Test
	@Transactional
	public void testBoardsByUsername() {
		/*List<String> locations=service.getByOwner("mariano").stream().map(board-> {
			
		board.getLocations().stream().map(location -> {location.getName();})
	});*/
		//List<Location> locations=service.getByOwner("mariano").stream().flatMap(board-> board.getLocations()).
		
				assertEquals(service.getByOwner("mariano"),dao.findByOwnerUsername("mariano"));
		System.out.println("BOARDS "+service.getByOwner("mariano"));
		System.out.println("BOARDS "+dao.findByOwnerUsername("mariano"));
	}

}
