package com.app.restaurant.auth;

import com.app.restaurant.user.User;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody AuthRegister register, HttpServletResponse response) {
        return ResponseEntity.ok(authService.register(register, response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> Login(@RequestBody AuthLogin login, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(login, response));
    }

    @GetMapping("/logout")
    public String Logout(HttpServletResponse response) {
        authService.logout(response);
        return "success";
    }

    @GetMapping("/current")
    public User getCurrentUser(HttpServletResponse response) {
        var user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user instanceof UserDetails) {
            return (User) user;
        } else {
            throw new UsernameNotFoundException("You are not authenticated");
        }

    }
}
