package com.app.restaurant.auth;


import com.app.restaurant.config.JwtService;
import com.app.restaurant.user.Role;
import com.app.restaurant.user.User;
import com.app.restaurant.user.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthResponse register(AuthRegister register, HttpServletResponse response) {
        var user = User.builder().role(Role.ROLE_USER)
                .password(passwordEncoder
                        .encode(register.getPassword()))
                .email(register.getEmail())
                .firstName(register.getFirstName())
                .lastName(register.getLastName()).build();
        userRepository.save(user);
        String jwt = jwtService.generateToken(user);
        setCookie(jwt, response);
        return AuthResponse.builder().token(jwt).user(user).build();

    }

    public AuthResponse login(AuthLogin authLogin, HttpServletResponse response) {
        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authLogin.getEmail(),
                            authLogin.getPassword()
                    )
            );
            var user = userRepository.findUserByEmail(authLogin.getEmail()).orElseThrow();
            String jwt = jwtService.generateToken(user);
            System.out.println(jwt);
            setCookie(jwt, response);
            return AuthResponse.builder().token(jwt).user(user).build();

        } catch (AuthenticationException err) {
            new RuntimeException("user or password is wrong");
        }
        return null;
    }

    public void logout(HttpServletResponse response) {
        SecurityContextHolder.clearContext();
        Cookie cookie = new Cookie("jwt", null);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "None");
        cookie.setMaxAge(0);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }


    private void setCookie(String jwt, HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", jwt);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "None");
        cookie.setMaxAge(7 * 24 * 60 * 60);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);

    }
}
