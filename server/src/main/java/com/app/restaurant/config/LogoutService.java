package com.app.restaurant.config;

import com.app.restaurant.token.TokenRepository;
import com.app.restaurant.utils.Helper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final Helper helper;

    private final TokenRepository tokenRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String token = helper.getJwtFromCookies(request);
        String deviceId = helper.getDeviceId(request);

        if (token != null && deviceId != null) {

            var jwt = tokenRepository.findByRefreshToken(token).orElse(null);
            if (jwt != null) {
                var user = jwt.getUser();
                helper.revokeAllUserTokens(user, deviceId);
                helper.buildCookie(response, "jwt", null, 0);
            }
            return;
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "you are not logged in");
    }
}
