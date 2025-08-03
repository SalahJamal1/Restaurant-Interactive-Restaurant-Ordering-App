package com.app.restaurant.cart;

import com.app.restaurant.contracts.GenericServices;
import org.springframework.stereotype.Service;

@Service
public class CartService extends GenericServices<Cart, Integer> {
    public CartService(CartRepository repository) {
        super(repository);
    }
}
