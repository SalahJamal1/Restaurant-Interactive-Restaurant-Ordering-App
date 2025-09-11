package com.app.restaurant.auth;


import com.app.restaurant.config.JwtService;
import com.app.restaurant.config.MapperConfig;
import com.app.restaurant.user.Role;
import com.app.restaurant.user.User;
import com.app.restaurant.user.UserRepository;
import com.app.restaurant.utils.Helper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MapperConfig mapperConfig;
    private final Helper helper;
    @Value("${jwt.refresh_expire}")
    private Duration refreshExpire;


    public AuthResponse register(AuthRegister register, HttpServletRequest request, HttpServletResponse response) {
        var existUser = userRepository.findUserByEmail(register.getEmail());

        if (existUser.isPresent()) {
            throw new UsernameNotFoundException("Email already in use");
        }

        var user = User.builder().role(Role.ROLE_USER)
                .password(passwordEncoder
                        .encode(register.getPassword()))
                .email(register.getEmail())
                .firstName(register.getFirstName())
                .lastName(register.getLastName()).address(register.getAddress())
                .phone(register.getPhone()).build();

        userRepository.save(user);

        return getAuthResponse(request, response, user);

    }


    public AuthResponse login(AuthLogin authLogin, HttpServletRequest request, HttpServletResponse response) {
        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authLogin.getEmail(),
                            authLogin.getPassword()
                    )
            );

            var user = userRepository.findUserByEmail(authLogin.getEmail()).orElseThrow();
            return getAuthResponse(request, response, user);

        } catch (AuthenticationException err) {
            throw new RuntimeException("user or password is wrong");
        }
    }

    public AuthResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String jwt = helper.getJwtFromRequest(request);
        try {

            if (jwt != null) {
                String username = jwtService.extractUsername(jwt);
                if (username != null) {
                    var user = userRepository.findUserByEmail(username).orElseThrow();
                    if (jwtService.isTokenValid(jwt, user)) {
                        return getAuthResponse(request, response, user);
                    }

                }

            }
        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }
        throw new RuntimeException("You need to login");
    }

    private AuthResponse getAuthResponse(HttpServletRequest request, HttpServletResponse response, User user) {
        String deviceId = helper.getOrCreateDeviceId(request, response);
        helper.revokeAllUserTokens(user, deviceId);

        String access_token = jwtService.generateToken(user);
        String refresh_token = jwtService.generateToken(user);

        helper.saveUserToken(request, response, user, access_token, deviceId, false);
        helper.saveUserToken(request, response, user, refresh_token, deviceId, true);

        setCookie(refresh_token, response);
        var userDto = mapperConfig.toUserDto(user);

        return AuthResponse.builder().access_token(access_token)
                .refresh_token(refresh_token)
                .user(userDto).build();
    }


    private void setCookie(String jwt, HttpServletResponse response) {

        Cookie cookie = new Cookie("jwt", jwt);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "None");
        cookie.setMaxAge((int) refreshExpire.toSeconds());
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

    }
}
