package com.mariano.weather.security.firebase;

import java.util.concurrent.ExecutionException;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
@Service
public class FirebaseService {

	@SuppressWarnings("finally")
	public FirebaseTokenHolder parseToken(String idToken)  {
		
		ApiFuture<FirebaseToken> authTask = FirebaseAuth.getInstance().verifyIdTokenAsync(idToken);

		while(!authTask.isDone());
		
		try {
			return new FirebaseTokenHolder(authTask.get());
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
			
		}
		return null;
	};
		

}
