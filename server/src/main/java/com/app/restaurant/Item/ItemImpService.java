package com.app.restaurant.Item;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemImpService implements ItemService {
    private final ItemRepository repository;

    @Override
    @Transactional
    public void delete(Item entity) {
        repository.delete(entity);
    }

    @Override
    @Transactional
    public Item save(Item entity) {
        return repository.save(entity);
    }

    @Override
    public List<Item> saveAll(List<Item> entity) {
        return repository.saveAll(entity);
    }

    @Override
    public Optional<Item> findById(Integer id) {
        return Optional.of(repository.findById(id).orElseThrow(() -> new RuntimeException("We can not found the entity")));
    }

    public List<Item> findAll() {
        try {
            return repository.findAll();
        } catch (AuthenticationException
                err) {
            throw new RuntimeException("You are not authenticated");
        }
    }
}
