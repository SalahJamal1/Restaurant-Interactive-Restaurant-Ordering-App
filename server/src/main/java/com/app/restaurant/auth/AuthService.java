package com.app.restaurant.auth;


import com.app.restaurant.config.JwtService;
import com.app.restaurant.config.MapperConfig;
import com.app.restaurant.user.Role;
import com.app.restaurant.user.User;
import com.app.restaurant.user.UserRepository;
import com.app.restaurant.utils.Helper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final MapperConfig mapperConfig;
    private final Helper helper;


    public AuthResponse register(AuthRegister register, HttpServletRequest request, HttpServletResponse response) {
        var existUser = userRepository.findUserByEmail(register.getEmail());

        if (existUser.isPresent()) {
            throw new UsernameNotFoundException("Email already in use");
        }
        register.setPassword(passwordEncoder.encode(register.getPassword()));
        register.setRole(Role.ROLE_USER);

        var user = mapperConfig.toUser(register);
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

            var user = userRepository.findUserByEmail(authLogin.getEmail()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
            return getAuthResponse(request, response, user);

        } catch (AuthenticationException err) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid email or password");
        }
    }

    public AuthResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String jwt = helper.getJwtFromCookies(request);

        if (jwt != null) {
            String username = jwtService.extractUsername(jwt);
            if (username != null) {
                var user = userRepository.findUserByEmail(username).orElseThrow();
                if (jwtService.isTokenValid(jwt, user)) {
                    return getAuthResponse(request, response, user);
                }

            }

        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You aren't logged in");
    }

    private AuthResponse getAuthResponse(HttpServletRequest request, HttpServletResponse response, User user) {
        String deviceId = helper.getOrCreateDeviceId(request, response);
        helper.revokeAllUserTokens(user, deviceId);

        String access_token = jwtService.generateAccessToken(user);
        String refresh_token = jwtService.generateRefreshToken(user);

        helper.saveUserToken(request, user, refresh_token, access_token, deviceId);

        setCookie(refresh_token, response);
        var userDto = mapperConfig.toUserDto(user);

        return AuthResponse.builder().access_token(access_token)
                .refresh_token(refresh_token)
                .user(userDto).build();
    }


    private void setCookie(String jwt, HttpServletResponse response) {

        helper.buildCookie(response, "jwt", jwt, 7);


    }
}
