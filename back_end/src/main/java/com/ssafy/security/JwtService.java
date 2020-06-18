package com.ssafy.security;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtService {

	@Value("spring.jwt.secret")
	private String secretKey;

	private long tokenValidMilisecond = 1000L * 60 * 60;
	private final UserDetailsService userDetailsService;

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	public String createToken(String userPk, List<String> roles) {
		Claims claims = Jwts.claims().setSubject(userPk);
		claims.put("roles", roles);
		
		Date now = new Date();
		
		return Jwts.builder().setClaims(claims)
				.setIssuedAt(now)
				.setExpiration(new Date(now.getTime() + tokenValidMilisecond))
				.signWith(SignatureAlgorithm.HS256, secretKey)
				.compact();
	}

	public Authentication getAuthentication(String token) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
		
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	public String getUserPk(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
	}

	public String resolveToken(HttpServletRequest req) {
		return req.getHeader("TOKEN");
	}

	public boolean validateToken(String jwtToken) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (Exception e) {
			return false;
		}
	}
}
