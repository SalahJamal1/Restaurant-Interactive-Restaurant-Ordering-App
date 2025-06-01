package com.app.restaurant.cart;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartImpService implements CartService {
    private final CartRepository repository;

    @Override
    @Transactional
    public void delete(Cart entity) {
        repository.delete(entity);
    }

    @Override
    @Transactional
    public Cart save(Cart entity) {
        System.out.println(entity);
        return repository.save(entity);
    }

    @Override
    public Cart findById(Integer id) {
        Optional<Cart> optional = repository.findById(id);
        return optional.get();
    }

    public List<Cart> findAll() {
        try {

            return repository.findAll();
        } catch (AuthenticationException
                err) {
            throw new RuntimeException("You are not authenticated");
        }
    }

    @Override
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
