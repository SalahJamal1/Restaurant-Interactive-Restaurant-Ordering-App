package com.app.restaurant.Item;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService  {
    private final ItemRepository repository;


    @Transactional
    public void delete(Item entity) {
        repository.delete(entity);
    }


    @Transactional
    public Item save(Item entity) {
        return repository.save(entity);
    }


    public List<Item> saveAll(List<Item> entity) {
        return repository.saveAll(entity);
    }


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
