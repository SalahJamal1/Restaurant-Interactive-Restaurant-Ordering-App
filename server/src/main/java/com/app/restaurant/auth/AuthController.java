package com.app.restaurant.auth;

import com.app.restaurant.order.Orders;
import com.app.restaurant.order.OrdersService;
import com.app.restaurant.user.User;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final OrdersService ordersService;

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
    public User getCurrentUser(@AuthenticationPrincipal User user) {

        if (user != null) {
            List<Orders> orders = user.getOrders();
            for (Orders orders1 : orders) {
                if (orders1.getActualDelivery() == null && Instant.now().isAfter(orders1.getEstimatedDelivery().toInstant())) {
                    orders1.markAsDelivered();
                    ordersService.save(orders1);
                }
            }
            return user;
        } else {
            throw new UsernameNotFoundException("You are not authenticated");
        }

    }
}
