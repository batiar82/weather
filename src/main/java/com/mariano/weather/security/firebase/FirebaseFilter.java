package com.mariano.weather.security.firebase;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.google.api.core.ApiFuture;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.mariano.weather.exception.firebase.FirebaseTokenInvalidException;

public class FirebaseFilter extends OncePerRequestFilter{
	private static String HEADER_NAME = "X-Authorization-Firebase";
	@Autowired
	private FirebaseService firebaseService;
	
	public FirebaseFilter(FirebaseService firebaseService) {
		this.firebaseService=firebaseService;
	}
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String xAuth = request.getHeader(HEADER_NAME);
		if(xAuth==null) {
			filterChain.doFilter(request, response);
		}else {
			try {
			FirebaseTokenHolder holder = firebaseService.parseToken(xAuth);
			String userName = holder.getUid();
			Authentication auth = new FirebaseAuthenticationToken(userName, holder);
			SecurityContextHolder.getContext().setAuthentication(auth);
			filterChain.doFilter(request, response);
			}
			catch( FirebaseTokenInvalidException e) {
				throw new SecurityException(e);
			}
			
		}
		
	}

}
