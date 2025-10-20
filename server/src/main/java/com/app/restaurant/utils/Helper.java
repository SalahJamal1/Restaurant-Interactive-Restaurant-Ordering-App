package com.app.restaurant.utils;

import com.app.restaurant.token.Token;
import com.app.restaurant.token.TokenRepository;
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

    public void buildCookie(HttpServletResponse response, String name, String value, Integer maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(maxAge * 24 * 60 * 60);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setAttribute("SameSite", "None");
        response.addCookie(cookie);
    }

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
        var deviceId = getDeviceId(request);
        if (deviceId != null) return deviceId;
        String newDeviceId = UUID.randomUUID().toString();
        buildCookie(response, "deviceId", newDeviceId, 365);
        return newDeviceId;
    }

    public void saveUserToken(HttpServletRequest request, User user, String refreshToken, String accessToken, String deviceId) {


        var token = Token.builder()
                .accessToken(accessToken)
                .deviceId(deviceId)
                .refreshToken(refreshToken)
                .user(user)
                .build();
        tokenRepository.save(token);
    }

    public void revokeAllUserTokens(User user, String deviceId) {
        tokenRepository.UpdateAllValidTokenByUserAndDeviceId(user.getId(), deviceId);

    }

    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) return cookie.getValue();
            }

        }
        return null;

    }
}
