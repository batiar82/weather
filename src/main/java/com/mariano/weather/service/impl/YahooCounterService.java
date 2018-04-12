package com.mariano.weather.service.impl;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mariano.weather.dao.YahooCounterDao;
import com.mariano.weather.model.YahooCounter;

@Service
public class YahooCounterService {
	@Autowired
	YahooCounterDao dao;
	
	private boolean isToday(Calendar date) {
		Calendar today=Calendar.getInstance();
		return date.get(Calendar.YEAR)==today.get(Calendar.YEAR) && 
				date.get(Calendar.MONTH)==today.get(Calendar.MONTH) && 
				date.get(Calendar.DAY_OF_MONTH)==today.get(Calendar.DAY_OF_MONTH);
	}
	/**
	 * Chequeo si puedo seguir consultando la api de yahoo para no sobrepasar las consultas diarias
	 * @return true si se puede, false si no
	 */
	public boolean canUpdate() {
		YahooCounter counter=dao.findFirstByOrderByIdDesc();
		Calendar dbDate = Calendar.getInstance();
		dbDate.setTime(counter.getDate());
		
		if(!isToday(dbDate)) {
			YahooCounter todayCounter = new YahooCounter(Calendar.getInstance().getTime(),0);
			dao.save(todayCounter);
			return true;
		}
		if(isToday(dbDate) && counter.getCount()<YahooCounter.MAX_QUERIES)
			return true;
		return false;
	}
	/**
	 * Incremento el numero de consultas en la base para no pasarme
	 */
	public void increaseCounter() {
		YahooCounter counter=dao.findFirstByOrderByIdDesc();
		counter.setCount(counter.getCount()+1);
		dao.save(counter);
	}
	
	/**
	 * Al iniciar el backend chequear q exista un contador para este dia y sino iniciarlo
	 */
	public void initCounter() {
		YahooCounter counter=dao.findFirstByOrderByIdDesc();
		boolean shouldInit=false;
		if(counter==null) {
			shouldInit=true;
		}else {
			Calendar dbDay=Calendar.getInstance();
			dbDay.setTime(counter.getDate());
			if(!isToday(dbDay))
				shouldInit=true;
		}
		if(shouldInit)
			dao.save(new YahooCounter(new Date(),0));
		
	}
}
