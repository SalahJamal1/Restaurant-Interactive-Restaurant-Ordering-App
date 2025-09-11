package com.app.restaurant.auth;

import com.app.restaurant.order.OrdersService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final OrdersService ordersService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody AuthRegister register, HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authService.register(register, request, response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> Login(@RequestBody AuthLogin login, HttpServletRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(login, request, response));
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(HttpServletRequest request, HttpServletResponse response) {

        return ResponseEntity.ok(authService.refreshToken(request, response));

    }
}
