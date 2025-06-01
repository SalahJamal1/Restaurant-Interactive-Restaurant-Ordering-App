package com.app.restaurant.cart;


import java.util.List;

public interface CartService {

    void delete(Cart entity);

    Cart save(Cart entity);

    Cart findById(Integer id);

    List<Cart> findAll();

    List<Cart> saveAll(List<Cart> carts);

}
