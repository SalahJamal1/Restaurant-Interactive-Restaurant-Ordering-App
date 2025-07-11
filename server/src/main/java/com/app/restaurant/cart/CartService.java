package com.app.restaurant.cart;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService  {
    private final CartRepository repository;


    @Transactional
    public void delete(Cart entity) {
        repository.delete(entity);
    }


    @Transactional
    public Cart save(Cart entity) {
        System.out.println(entity);
        return repository.save(entity);
    }


    public Cart findById(Integer id) {
      return    repository.findById(id).orElseThrow(()-> new RuntimeException("Cart not found with id " + id));

    }

    public List<Cart> findAll() {
        try {

            return repository.findAll();
        } catch (AuthenticationException
                err) {
            throw new RuntimeException("You are not authenticated");
        }
    }

    @Transactional
    public List<Cart> saveAll(List<Cart> carts) {
        try {

            return repository.saveAll(carts);
        } catch (AuthenticationException
                err) {
            throw new RuntimeException("You are not authenticated");
        }
    }


}
