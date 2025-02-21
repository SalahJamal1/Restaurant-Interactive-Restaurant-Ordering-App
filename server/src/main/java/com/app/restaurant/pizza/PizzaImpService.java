package com.app.restaurant.pizza;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PizzaImpService implements PizzaService {
    private final PizzaRepository repository;

    @Override
    @Transactional
    public void delete(Pizza entity) {
        repository.delete(entity);
    }

    @Override
    @Transactional
    public Pizza save(Pizza entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Pizza> findById(Integer id) {
        return Optional.of(repository.findById(id).orElseThrow(() -> new RuntimeException("We can not found the entity")));
    }

    public List<Pizza> findAll() {
        try {
            return repository.findAll();
        } catch (AuthenticationException
                err) {
            throw new RuntimeException("You are not authenticated");
        }
    }
}
