package com.mariano.weather.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mariano.weather.model.Location;
import com.mariano.weather.model.dto.LocationDTO;
import com.mariano.weather.service.impl.GoogleApiService;
import com.mariano.weather.service.impl.LocationService;
import com.sun.tools.javac.util.List;

import reactor.core.publisher.Flux;

@RestController
public class LocationController {

	@Autowired
	LocationService service;
	@Autowired
	GoogleApiService googleApiService;
	@RequestMapping(value="/boards/{user}/{boardId}/locations",
			method=RequestMethod.POST,
			produces=MediaType.APPLICATION_JSON_VALUE,
			consumes=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Location> addLocation(@PathVariable String user, @PathVariable Integer boardId,@RequestBody LocationDTO locationDTO) {
		if(service.checkExistingLocation(locationDTO.getCity(), boardId))
			return new ResponseEntity<Location>(new Location(),HttpStatus.CONFLICT);
			Location newLocation=service.addLocation(locationDTO.getCity(), boardId);
		if(newLocation==null)
			return new ResponseEntity<Location>(newLocation,HttpStatus.NOT_FOUND);
		return new ResponseEntity<Location>(newLocation,HttpStatus.CREATED);
	}
	@RequestMapping(value="/boards/{user}/{boardId}/locations/{location}",
			method=RequestMethod.DELETE,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> removeLocation(@PathVariable String user, @PathVariable Integer boardId,@PathVariable Integer location) {
		service.removeLocation(location);
		return ResponseEntity.ok("Location deleted");

	}
	@RequestMapping(value="/autocomplete",
			method=RequestMethod.GET,
			produces=MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> autocompleteCity(@RequestParam("query") String query) {
		return  googleApiService.getSuggestions(query);
	}
	
	@GetMapping(path= "/locations", produces=MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<Location> getLocationUpdate() {
		Location loc = new Location();
		loc.setName("LALALAL");
		return Flux.fromStream(List.of(loc).stream());
	}
}
