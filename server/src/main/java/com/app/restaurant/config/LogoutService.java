package com.app.restaurant.config;

import com.app.restaurant.user.UserRepository;
import com.app.restaurant.utils.Helper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final Helper helper;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String token = helper.getJwtFromRequest(request);
        String deviceId = helper.getDeviceId(request);

        if (token != null && deviceId != null) {
            String username = jwtService.extractUsername(token);
            if (username != null) {
                var user = userRepository.findUserByEmail(username).orElseThrow();
                helper.revokeAllUserTokens(user, deviceId);

                Cookie cookie = new Cookie("jwt", null);
                cookie.setMaxAge(0);
                cookie.setPath("/");
                cookie.setHttpOnly(true);
                cookie.setSecure(true);
                cookie.setAttribute("SameSite", "None");
                response.addCookie(cookie);
            }
        }


    }
}
