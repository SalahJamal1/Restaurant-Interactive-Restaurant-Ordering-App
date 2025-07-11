package com.app.restaurant.menu;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService  {
    private final MenuRepository repository;


    public List<Menu> findAll() {
        try {
            return repository.findAll();
        } catch (AuthenticationException
                err) {
            throw new RuntimeException("You are not authenticated");
        }
    }


    public Menu findByCategory(String category) {
        return repository.findByCategory(category);
    }
}
