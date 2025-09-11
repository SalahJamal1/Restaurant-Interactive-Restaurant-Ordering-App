package com.app.restaurant.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Service

public class JwtService {
    @Value("${jwt.secretKey}")
    private  String secretKey;
    @Value("${jwt.expire}")
    private  long expire;
    @Value("${jwt.refresh_expire}")
    private  long refreshExpire;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        var username = extractUsername(token);
        return username.equals(userDetails.getUsername())
                && extractClaim(token, Claims::getExpiration).after(new Date());
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction) {
        Claims claims = extractClaims(token);
        return claimsTFunction.apply(claims);
    }

    public Claims extractClaims(String token) {
        try {

        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build().parseClaimsJws
                        (token).getBody();
        }catch (Exception e){
            throw new RuntimeException("Invalid token");
        }
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return buildToken(claims, userDetails,expire);
    }
    public String generateRefreshToken( UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails,refreshExpire);
    }

    private String buildToken(Map<String, Object> claims, UserDetails userDetails,long Expiration) {
        claims.put("jti", UUID.randomUUID().toString());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setExpiration(new Date(System.currentTimeMillis() + Expiration))
                .setIssuedAt(new Date())
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Key getSecretKey() {
        byte[] key = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(key);
    }
}
