package com.app.restaurant.burger;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BurgerImpService implements BurgerService {
    private final BurgerRepository repository;

    @Override
    @Transactional
    public void delete(Burger entity) {
        repository.delete(entity);
    }

    @Override
    @Transactional
    public Burger save(Burger entity) {
        return repository.save(entity);
    }

    @Override
    public Optional<Burger> findById(Integer id) {
        return Optional.of(repository.findById(id).orElseThrow(() -> new RuntimeException("We can not found the entity")));
    }

    public List<Burger> findAll() {
        try {
            return repository.findAll();
        } catch (AuthenticationException
                err) {
            throw new RuntimeException("You are not authenticated");
        }
    }
}
