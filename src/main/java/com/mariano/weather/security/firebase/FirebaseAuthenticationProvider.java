package com.mariano.weather.security.firebase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.mariano.weather.dao.UserDao;
import com.mariano.weather.exception.firebase.FirebaseUserNotExistsException;
import com.mariano.weather.model.User;
import com.mariano.weather.service.impl.SpringDataJpaUserDetailsService;
@Component
public class FirebaseAuthenticationProvider implements AuthenticationProvider {
	@Autowired
	UserDao dao;
	@Autowired
	private SpringDataJpaUserDetailsService userService;
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		FirebaseAuthenticationToken authenticationToken = (FirebaseAuthenticationToken) authentication;
		UserDetails details = userService.loadUserByUsername(authenticationToken.getName());
		if(details == null) {
			//Si no esta el usuario, lo agrego a la db
			FirebaseTokenHolder holder = (FirebaseTokenHolder)authenticationToken.getCredentials();
			dao.save(new User(holder.getName(),holder.getUid(),null));
			//throw new FirebaseUserNotExistsException();
			System.out.println("Holder "+holder);
			details = userService.loadUserByUsername(authenticationToken.getName());
		}
		authenticationToken = new FirebaseAuthenticationToken(details, authentication.getCredentials(),
				details.getAuthorities());

		return authenticationToken;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return (FirebaseAuthenticationToken.class.isAssignableFrom(authentication));
	}

}
