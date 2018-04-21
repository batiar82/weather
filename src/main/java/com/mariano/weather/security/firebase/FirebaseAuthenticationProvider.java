package com.mariano.weather.security.firebase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;

import com.mariano.weather.exception.firebase.FirebaseUserNotExistsException;
import com.mariano.weather.service.impl.SpringDataJpaUserDetailsService;

public class FirebaseAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private SpringDataJpaUserDetailsService userService;
	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		FirebaseAuthenticationToken authenticationToken = (FirebaseAuthenticationToken) authentication;
		UserDetails details = userService.loadUserByUsername(authenticationToken.getName());
		if(details == null) {
			throw new FirebaseUserNotExistsException();
		}
		authenticationToken = new FirebaseAuthenticationToken(details, authentication.getCredentials(),
				details.getAuthorities());

		return authenticationToken;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return false;
	}

}
