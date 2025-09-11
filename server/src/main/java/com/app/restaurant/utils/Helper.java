package com.app.restaurant.utils;

import com.app.restaurant.token.Token;
import com.app.restaurant.token.TokenRepository;
import com.app.restaurant.token.TokenType;
import com.app.restaurant.user.User;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class Helper {
    private final TokenRepository tokenRepository;

    public String getDeviceId(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("deviceId".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public String getOrCreateDeviceId(HttpServletRequest request, HttpServletResponse response) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("deviceId".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        String newDeviceId = UUID.randomUUID().toString();
        Cookie cookie = new Cookie("deviceId", newDeviceId);
        cookie.setMaxAge(3600);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setAttribute("SameSite", "None");
        response.addCookie(cookie);
        return newDeviceId;
    }

    public void saveUserToken(HttpServletRequest request, HttpServletResponse response, User user, String jwt, String deviceId, boolean isRefreshToken) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        String deviceName = request.getHeader("User-Agent");

        if (ipAddress == null) {
            ipAddress = request.getRemoteAddr();
        }

        var token = Token.builder()
                .accessToken(!isRefreshToken ? jwt : null)
                .deviceId(deviceId)
                .tokenType(isRefreshToken ? TokenType.REFRESH : TokenType.ACCESS)
                .refreshToken(isRefreshToken ? jwt : null)
                .ipAddress(ipAddress)
                .deviceName(deviceName)
                .expired(false)
                .revoked(false)
                .user(user)
                .build();
        tokenRepository.save(token);
    }

    public void revokeAllUserTokens(User user, String deviceId) {
        var tokens = tokenRepository.findAllValidTokenByUserAndDeviceId(user.getId(), deviceId);
        if (tokens.isEmpty()) return;
        tokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenRepository.saveAll(tokens);

    }

    public String getJwtFromRequest(HttpServletRequest request) {
        String auth = request.getHeader("Authorization");
        if (auth != null && auth.startsWith("Bearer")) {
            return auth.substring(7);
        }
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) return cookie.getValue();
            }

        }
        return null;

    }
}
