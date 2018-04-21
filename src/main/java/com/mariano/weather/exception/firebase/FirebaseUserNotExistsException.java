package com.mariano.weather.exception.firebase;

import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;

public class FirebaseUserNotExistsException extends AuthenticationCredentialsNotFoundException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public FirebaseUserNotExistsException() {
		super("User Not Found");
	}

}
