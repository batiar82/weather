package com.mariano.weather.security;

import static com.mariano.weather.security.SecurityConstants.HEADER_STRING;
import static com.mariano.weather.security.SecurityConstants.SECRET;
import static com.mariano.weather.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import io.jsonwebtoken.Jwts;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

	public JWTAuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
		// TODO Auto-generated constructor stub
	}

	 @Override
	    protected void doFilterInternal(HttpServletRequest req,
	                                    HttpServletResponse res,
	                                    FilterChain chain) throws IOException, ServletException {
	        String header = req.getHeader(HEADER_STRING);
	        String token = req.getParameter(HEADER_STRING.toLowerCase());
	        if(header ==null)
	        	header=token;
	        
	        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
	            chain.doFilter(req, res);
	            return;
	        }

	        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);

	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        chain.doFilter(req, res);
	    }

	    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
	        String token = request.getHeader(HEADER_STRING);
	        if(token==null)
	        	token=request.getParameter(HEADER_STRING.toLowerCase());
	        if (token != null) {
	            // parse the token.
	            String user = Jwts.parser()
	                    .setSigningKey(SECRET.getBytes())
	                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
	                    .getBody()
	                    .getSubject();

	            if (user != null) {
	                return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
	            }
	            return null;
	        }
	        return null;
	    }
	}