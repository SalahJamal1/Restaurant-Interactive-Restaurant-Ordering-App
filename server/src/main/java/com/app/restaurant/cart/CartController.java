package com.app.restaurant.cart;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService service;

    @GetMapping
    public List<Cart> list() {

        return service.findAll();

    }

    @GetMapping("/{id}")
    public Cart getCart(@PathVariable Integer id) {
        return service.findById(id);
    }

    @PostMapping
    public List<Cart> createCarts(@RequestBody List<Cart> entity) {
        return service.saveAll(entity);
    }

    @DeleteMapping("/{id}")
    public String deleteCart(@PathVariable Integer id) {
        Cart entity = service.findById(id);

        service.delete(entity);
        return "you are deleted the Id: " + id;
    }

}
