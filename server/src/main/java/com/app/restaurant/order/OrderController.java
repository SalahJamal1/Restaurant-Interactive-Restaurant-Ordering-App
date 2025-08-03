package com.app.restaurant.order;


import com.app.restaurant.Item.ItemService;
import com.app.restaurant.cart.CartService;
import com.app.restaurant.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrdersService service;
    private final CartService cartService;
    private final UserRepository userRepository;
    private final ItemService itemService;

    @GetMapping
    public List<Orders> list() {
        return service.findAllOrdersAndMarkAsDelivered();
    }

    @GetMapping("/{id}")
    public Orders getOrders(@PathVariable Integer id) {
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
