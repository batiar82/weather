package com.mariano.weather.configuration;

import static com.mariano.weather.security.SecurityConstants.SIGN_UP_URL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.mariano.weather.security.JWTAuthenticationFilter;
import com.mariano.weather.security.JWTAuthorizationFilter;
import com.mariano.weather.security.firebase.FirebaseAuthenticationProvider;
import com.mariano.weather.security.firebase.FirebaseFilter;
import com.mariano.weather.security.firebase.FirebaseService;
import com.mariano.weather.service.impl.SpringDataJpaUserDetailsService;
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private SpringDataJpaUserDetailsService userDetailsService;
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private FirebaseAuthenticationProvider firebaseProvider;
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		System.out.println("PROVIDER: "+firebaseProvider);
		auth.authenticationProvider(firebaseProvider);
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
	
	}
	@Autowired(required = false)
	private FirebaseService firebaseService;


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("SERVICE "+firebaseService);
		http.cors().and().csrf().disable().authorizeRequests()
        .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
        .anyRequest().authenticated()
        .and()
        //.addFilter(new JWTAuthenticationFilter(authenticationManager()))
        //.addFilter(new JWTAuthorizationFilter(authenticationManager()))
        
        .addFilterBefore(new FirebaseFilter(firebaseService),BasicAuthenticationFilter.class)
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
}


}
