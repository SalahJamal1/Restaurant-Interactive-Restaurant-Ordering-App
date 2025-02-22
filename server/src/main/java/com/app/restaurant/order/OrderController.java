package com.app.restaurant.order;


import com.app.restaurant.cart.CartService;
import com.app.restaurant.user.User;
import com.app.restaurant.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrdersService service;
    private final CartService cartService;
    private final UserRepository userRepository;

    @GetMapping
    public List<Orders> list() {

        return service.findAll();

    }

    @GetMapping("/{id}")
    public Orders getOrders(@PathVariable Integer id) {
        return service.findById(id);
    }


    @PostMapping
    @Transactional
    public Orders createOrders(@AuthenticationPrincipal User user, @RequestBody Orders orders) {
        if (user != null) {
            orders.setBeforeSave(user);
            cartService.saveAll(orders.getCart());
            user.getOrders().add(orders);
            userRepository.save(user);
            return orders;
        }
        return null;

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrders(@PathVariable Integer id) {
        try {

            Orders entity = service.findById(id);

            service.delete(entity);
            return ResponseEntity.status(HttpStatus.OK).body("you are deleted the Id: " + id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


}
