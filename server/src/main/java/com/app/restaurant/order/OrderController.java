package com.app.restaurant.order;



import com.app.restaurant.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrdersService service;
    


    @GetMapping
    public List<Orders> getOrders(@AuthenticationPrincipal User user) {
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "you are not logged in");
        }
        return service.findOrdersByUserId(user.getId());
    }

    @GetMapping("/{id}")
    public Orders getOrder(@PathVariable Integer id) {
        return service.findByIdAndMarkAsDelivered(id);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrders(@PathVariable Integer id) {
        try {
            service.delete(id);
            return ResponseEntity.status(HttpStatus.OK).body("you are deleted the Id: " + id);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


}
